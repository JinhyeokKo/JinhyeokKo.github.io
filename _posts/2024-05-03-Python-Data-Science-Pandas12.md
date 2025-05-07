---
title: Performance_Eval_And_Query
date: 2024-05-03
categories: [ Python Data Science ]
tags: [ Pandas ]
layout: post
---

# High-Performance Pandas: eval() and query()

## Motivating query() and eval(): Compound Expressions

```python
import numpy as np

rng = np.random.RandomState(42)
x = rng.rand(1000000)
y = rng.rand(1000000)
%timeit
x + y
```

    1.65 ms ± 24.4 µs per loop (mean ± std. dev. of 7 runs, 1,000 loops each)

```python
# 파이썬 루프나 컴프리헨션으로 더하는 것보다 빠름
%timeit
np.fromiter((xi + yi for xi, yi in zip(x, y)), dtype=x.dtype, count=len(x))
```

    122 ms ± 1.38 ms per loop (mean ± std. dev. of 7 runs, 10 loops each)

```python
# 복합 표현식에선 효율이 떨어짐
mask = (x > 0.5) & (y < 0.5)
# 모든 중간 단계가 명시적으로 메모리에 할당
# x, y 규모가 크면 메모리와 계산능력에 오버헤드 발생
tmp1 = (x > 0.5)
tmp2 = (y < 0.5)
mask = tmp1 & tmp2
```

```python
import numexpr

# 전체 크기의 임시 배열을 사용하지 않고 표현식을 평가
mask_numexpr = numexpr.evaluate('(x > 0.5) & (y < 0.5)')
np.allclose(mask, mask_numexpr)
```

    True

## pandas.eval() for Efficient Operations

```python
import pandas as pd

nrows, ncols = 100000, 100
rng = np.random.RandomState(42)
df1, df2, df3, df4 = (pd.DataFrame(rng.rand(nrows, ncols))
                      for i in range(4))
```

```python
# 전형적인 Pandas 접근 방식
%timeit
df1 + df2 + df3 + df4
```

    36.8 ms ± 1.46 ms per loop (mean ± std. dev. of 7 runs, 10 loops each)

```python
# 표현식을 문자열로 구성
%timeit
pd.eval('df1 + df2 + df3 + df4')
```

    16.4 ms ± 666 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)

```python
# 같은 결과를 주며 더 빠르고 적은 메모리 사용
np.allclose(df1 + df2 + df3 + df4,
            pd.eval('df1 + df2 + df3 + df4'))
```

    True

### Operations supported by pd.eval()

```python
df1, df2, df3, df4, df5 = (pd.DataFrame(rng.randint(0, 1000, (100, 3)))
                           for i in range(5))
```

#### Arithmetic operators

```python
# pd.eval()은 모든 산술 연산자를 지원
result1 = -df1 * df2 / (df3 + df4) - df5
result2 = pd.eval('-df1 * df2 / (df3 + df4) - df5')
np.allclose(result1, result2)
```

    True

#### Comparison operators

```python
# 연쇄 표현식을 포함한 모든 비교 연산자 지원
result1 = (df1 < df2) & (df2 <= df3) & (df3 != df4)
result2 = pd.eval('df1 < df2 <= df3 != df4')
np.allclose(result1, result2)
```

    True

#### Bitwise operators

```python
# & 와 | 비트 단위 연산자 지원
result1 = (df1 < 0.5) & (df2 < 0.5) | (df3 < df4)
result2 = pd.eval('(df1 < 0.5) & (df2 < 0.5) | (df3 < df4)')
np.allclose(result1, result2)
```

    True

#### Boolean expressions

```python
# 리터널 and와 or 사용을 지원
result3 = pd.eval('(df1 < 0.5) and (df2 < 0.5) or (df3 < df4)')
np.allclose(result1, result3)
```

    True

#### Object attributes and indices

```python
# obj.attr 구문을 통해 객체 속성에 접근하는 것을 지원
# obj[index] 구문을 통해 인덱스에 접근하는 것을 지원
result1 = df2.T[0] + df3.iloc[1]
result2 = pd.eval('df2.T[0] + df3.iloc[1]')
np.allclose(result1, result2)
```

    True

## 열 단위의 연산을 위한 DataFrame.eval() for Column-Wise Operations

```python
df = pd.DataFrame(rng.rand(1000, 3), columns=['A', 'B', 'C'])
df.head()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.375506</td>
      <td>0.406939</td>
      <td>0.069938</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.069087</td>
      <td>0.235615</td>
      <td>0.154374</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.677945</td>
      <td>0.433839</td>
      <td>0.652324</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.264038</td>
      <td>0.808055</td>
      <td>0.347197</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.589161</td>
      <td>0.252418</td>
      <td>0.557789</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 세 개의 열이 있는 표현식 계산
result1 = (df['A'] + df['B']) / (df['C'] - 1)
result2 = pd.eval("(df.A + df.B) / (df.C - 1)")
np.allclose(result1, result2)
```

    True

```python
# 열을 사용하는 표현식을 훨씬 간결하게 평가
result3 = df.eval('(A + B) / (C - 1)')
np.allclose(result1, result3)
```

    True

### Assignment in DataFrame.eval()

```python
df.head()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.375506</td>
      <td>0.406939</td>
      <td>0.069938</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.069087</td>
      <td>0.235615</td>
      <td>0.154374</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.677945</td>
      <td>0.433839</td>
      <td>0.652324</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.264038</td>
      <td>0.808055</td>
      <td>0.347197</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.589161</td>
      <td>0.252418</td>
      <td>0.557789</td>
    </tr>
  </tbody>
</table>
</div>

```python
# D 열 생성 후 다른 열로부터 계산된 값을 할당
df.eval('D = (A + B) / C', inplace=True)
df.head()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.375506</td>
      <td>0.406939</td>
      <td>0.069938</td>
      <td>11.187620</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.069087</td>
      <td>0.235615</td>
      <td>0.154374</td>
      <td>1.973796</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.677945</td>
      <td>0.433839</td>
      <td>0.652324</td>
      <td>1.704344</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.264038</td>
      <td>0.808055</td>
      <td>0.347197</td>
      <td>3.087857</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.589161</td>
      <td>0.252418</td>
      <td>0.557789</td>
      <td>1.508776</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 같은 방식의 수정
df.eval('D = (A - B) / C', inplace=True)
df.head()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.375506</td>
      <td>0.406939</td>
      <td>0.069938</td>
      <td>-0.449425</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.069087</td>
      <td>0.235615</td>
      <td>0.154374</td>
      <td>-1.078728</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.677945</td>
      <td>0.433839</td>
      <td>0.652324</td>
      <td>0.374209</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.264038</td>
      <td>0.808055</td>
      <td>0.347197</td>
      <td>-1.566886</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.589161</td>
      <td>0.252418</td>
      <td>0.557789</td>
      <td>0.603708</td>
    </tr>
  </tbody>
</table>
</div>

### Local variables in DataFrame.eval()

```python
# @기호는 열 이름이 아닌 변수 이름을 표시
# 열의 네임스페이스와 파이썬 객체의 네임스페이스를 포함하는 표현식 평가
column_mean = df.mean(1)
result1 = df['A'] + column_mean
result2 = df.eval('A + @column_mean')
np.allclose(result1, result2)
```

    True

## DataFrame.query() Method

```python
result1 = df[(df.A < 0.5) & (df.B < 0.5)]
result2 = pd.eval('df[(df.A < 0.5) & (df.B < 0.5)]')
np.allclose(result1, result2)
```

    True

```python
# 열을 포함하는 표현식에선 DataFrame.eval() 대신 query() 로 필터링 연산
result2 = df.query('A < 0.5 and B < 0.5')
np.allclose(result1, result2)
```

    True

```python
# 지역 변수를 표시하기 위해 @플래그를 받음
Cmean = df['C'].mean()
result1 = df[(df.A < Cmean) & (df.B < Cmean)]
result2 = df.query('A < @Cmean and B < @Cmean')
np.allclose(result1, result2)
```

    True

## Performance: When to Use These Functions

```python
# NumPy 배열이나 Pandas DataFrame 을 포함하는 모든 복합 표현식은 임시 배열을 생성
x = df[(df.A < 0.5) & (df.B < 0.5)]

tmp1 = df.A < 0.5
tmp2 = df.B < 0.5
tmp3 = tmp1 & tmp2
x = df[tmp3]
# 임시 DataFrame의 크기가 사용 가능한 메모리에 비해 상당히 크다면 eval()이나 query() 표현식 사용
df.values.nbytes
```

    32000


