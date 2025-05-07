---
title: Missing_Values
date: 2024-04-25
categories: [ Python Data Science ]
tags: [ Pandas ]
layout: post
---

# Missing_Values

## 누락된 데이터 처리 방식의 트레이드오프 Trade-Offs in Missing Data Conventions

### 센티널 방식 The sentinel approach

센티널 값은 누락된 정수값을 -999나 보기 드문 비트 패턴으로 표시하는 등 데이터에 특화된 표시법일 수도 있고 누락된 부동 소수점 값을 IEEE 부동 소수점 표준을 따르는 특수 값인 NaN으로 표시하는 것과 같은
일반적인 표시법

### 마스킹 방식 The masking approach

마스크는 완전히 별개의 부울 배열일 수도 있고 지역적으로 값의 널 상태를 가리키기 위해 데이터 표현에서 1비트를 전용으로 사용

### 장단점

별도의 마스크 배열을 사용하면 추가적인 부울 배열 할당이 필요한데, 이는 스토리지와 연산에 있어 오버헤드를 일으킨다.  
센티널 값은 표시할 수 있는 유횻값의 범위를 줄이고 CPU와 GPU 산술 연산에 별도의(대체로 최적화되지 않은) 로직이 필요할 수 있다.  
NaN과 같은 보편적인 특수 값은 모든 데이터 타입에서 사용할 수 있는 것은 아니다.

### 시스템에 따른 다른 규칙

R 언어: 누락된 데이터를 가리키는 센티널 값으로 각 데이터 타입에 예약된 비트 패턴을 사용  
SciDB 시스템: NA 상태를 나타내기 위해 모든 셀에 추가 바이트를 더해 사용

## Pandas에서 누락된 데이터 Missing Data in Pandas

널 값을 저장하고 조작하는 모드  
기본 모드: 센티널 기반 누락 데이터 체계를 사용, 데이터 타입에 따라 센티널 값이 NaN 또는 None으로 설정  
기타 모드: Pandas에서 제공하는 널 값이 들어갈 수 있는 dtypes을 사용하는 것, 마스크 배열이 함께 생성되어 누락된 항목을 추적  
--> 누락된 항목은 특수한 pd.NA 값으로 사용자에게 표시

```python
import numpy as np
import pandas as pd
```

### None: Pythonic missing data

일부 dtypes의 경우, Pandas는 None을 센티널 값으로 사용  
None은 Python 객체이며, None을 포함하는 모든 배열이 dtype=object를 가지고 있어야 한다(Python 객체의 시퀀스여야 한다)

```python
vals1 = np.array([1, None, 3, 4])
vals1
```

    array([1, None, 3, 4], dtype=object)

```python
# 데이터에 대한 연산이 파이썬 수준에서 수행되어 네이티브 타입 배열보다 훨씬 더 많은 오버헤드 발생
for dtype in ['object', 'int']:
    print("dtype =", dtype)
    %timeit
    np.arange(1E6, dtype=dtype).sum()
    print()
```

    dtype = object
    47.9 ms ± 941 µs per loop (mean ± std. dev. of 7 runs, 10 loops each)
    
    dtype = int
    1.26 ms ± 23.2 µs per loop (mean ± std. dev. of 7 runs, 1,000 loops each)

```python
# 파이썬은 None을 사용한 산술 연산을 지원하지 않아 집계에 오류 발생 --> Pandas는 숫자 배열에 None을 센티널로 사용 안함
vals1.sum()
```

    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    Cell In[4], line 2
          1 # 파이썬은 None을 사용한 산술 연산을 지원하지 않아 집계에 오류 발생 --> Pandas는 숫자 배열에 None을 센티널로 사용 안함
    ----> 2 vals1.sum()
    

    File ~\AppData\Roaming\Python\Python312\site-packages\numpy\core\_methods.py:49, in _sum(a, axis, dtype, out, keepdims, initial, where)
         47 def _sum(a, axis=None, dtype=None, out=None, keepdims=False,
         48          initial=_NoValue, where=True):
    ---> 49     return umr_sum(a, axis, dtype, out, keepdims, initial, where)
    

    TypeError: unsupported operand type(s) for +: 'int' and 'NoneType'

### NaN: Missing numerical data

NaN은 표준 IEEE 부동 소수점 표기를 사용하는 모든 시스템이 인식하는 특수 부동 소수점 값  
none과 달리 컴파일된 코드에 삽입된 빠른 연산을 지원

```python
vals2 = np.array([1, np.nan, 3, 4])
vals2.dtype
```

    dtype('float64')

```python
# 어떤 연산이든 상관없이 NaN이 포함된 산술 연산의 결과는 또 다른 NaN이 된다
1 + np.nan, vals2.sum(), vals2.min(), vals2.max()
```

    (nan, nan, nan, nan)

```python
# 누락된 값을 무시하는 집게 연산 사용
np.nansum(vals2), np.nanmin(vals2), np.nanmax(vals2)
```

    (8.0, 1.0, 4.0)

### NaN and None in Pandas

```python
# 사용할 수 있는 센티널 값이 없는 타입의 경우, NA 값이 있으면 Pandas가 자동으로 타입을 변환
pd.Series([1, np.nan, 2, None])
```

    0    1.0
    1    NaN
    2    2.0
    3    NaN
    dtype: float64

```python
x = pd.Series(range(2), dtype=int)
print(x)
# None을 자동으로 NaN값으로 변환
x[0] = None
x
```

    0    0
    1    1
    dtype: int32
    




    0    NaN
    1    1.0
    dtype: float64

### Pandas의 타입별 NA값 처리 방식

| Typeclass    | Conversion When Storing NAs | NA Sentinel Value      |
|--------------|-----------------------------|------------------------|
| ``floating`` | No change                   | ``np.nan``             |
| ``object``   | No change                   | ``None`` or ``np.nan`` |
| ``integer``  | Cast to ``float64``         | ``np.nan``             |
| ``boolean``  | Cast to ``object``          | ``None`` or ``np.nan`` |

Pandas에서 문자열 데이터는 항상 object dtype으로 저장

## Pandas의 Nullable 데이터 타입

암시적 타입 캐스팅 시 누락된 데이터가 있는 실수 배열을 표현할 방법이 없어 이를 해결하기 위해 Nullable 타입을 사용  
이름의 대소문자로 일반 데이터 타입과 Nullable 타입을 구별(np.int32 대신 pd.Int32 사용)

```python
pd.Series([1, np.nan, 2, None, pd.NA], dtype='Int32')
```

    0       1
    1    <NA>
    2       2
    3    <NA>
    4    <NA>
    dtype: Int32

## Operating on Null Values

| Method        | Description               |
|---------------|---------------------------|
| ``isnull()``  | 누락 값을 가리키는 부울 마스크 생성      |
| ``notnull()`` | isnull()의 역               |
| ``dropna()``  | 데이터에 필터를 적용한 버전을 반환       |
| ``fillna()``  | 누락 값을 채우거나 전가된 데이터 사본을 반환 |

### 널 값 탐지 Detecting null values

```python
# 데이터에 부울 마스크를 반환
data = pd.Series([1, np.nan, 'hello', None])
data.isnull()
```

    0    False
    1     True
    2    False
    3     True
    dtype: bool

```python
# Series나 DataFrame 인덱스로 직접 사용 가능
data[data.notnull()]
```

    0        1
    2    hello
    dtype: object

### 널 값 제거 Dropping null values

```python
# Series
data.dropna()
```

    0        1
    2    hello
    dtype: object

```python
# DataFrame
df = pd.DataFrame([[1, np.nan, 2],
                   [2, 3, 5],
                   [np.nan, 4, 6]])
df
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
      <th>0</th>
      <th>1</th>
      <th>2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.0</td>
      <td>NaN</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2.0</td>
      <td>3.0</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2</th>
      <td>NaN</td>
      <td>4.0</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 널 값이 있는 모든 행 삭제
df.dropna()
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
      <th>0</th>
      <th>1</th>
      <th>2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>2.0</td>
      <td>3.0</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 축에 따라 NA 값 삭제
df.dropna(axis='columns')
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
      <th>2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>5</td>
    </tr>
    <tr>
      <th>2</th>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 조건에 따른 삭제
df[3] = np.nan
print(df)
df.dropna(axis='columns', how='all')
```

         0    1  2   3
    0  1.0  NaN  2 NaN
    1  2.0  3.0  5 NaN
    2  NaN  4.0  6 NaN

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
      <th>0</th>
      <th>1</th>
      <th>2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.0</td>
      <td>NaN</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2.0</td>
      <td>3.0</td>
      <td>5</td>
    </tr>
    <tr>
      <th>2</th>
      <td>NaN</td>
      <td>4.0</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>

```python
# thresh로 null이 아닌 값 개수 지정
df.dropna(axis='rows', thresh=3)
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
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>2.0</td>
      <td>3.0</td>
      <td>5</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>

### 널 값 채우기 Filling null values

```python
data = pd.Series([1, np.nan, 2, None, 3], index=list('abcde'))
data
```

    a    1.0
    b    NaN
    c    2.0
    d    NaN
    e    3.0
    dtype: float64

```python
# 0과 같은 단일 값으로 채우기
data.fillna(0)
```

    a    1.0
    b    0.0
    c    2.0
    d    0.0
    e    3.0
    dtype: float64

```python
# 이전 값으로 채우기 forward=fill
data.ffill()
```

    a    1.0
    b    1.0
    c    2.0
    d    2.0
    e    3.0
    dtype: float64

```python
# 다음 값으로 채우기 back-fill
data.bfill()
```

    a    1.0
    b    2.0
    c    2.0
    d    3.0
    e    3.0
    dtype: float64

```python
# DataFrame의 값을 어느 축에 따라 채울 것인지 axis를 이용해 지정
print(df)
df.ffill(axis=1)  # 이전 값을 사용할 수 없다면 NA값은 그대로 남음
```

         0    1  2   3
    0  1.0  NaN  2 NaN
    1  2.0  3.0  5 NaN
    2  NaN  4.0  6 NaN

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
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2.0</td>
      <td>3.0</td>
      <td>5.0</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>NaN</td>
      <td>4.0</td>
      <td>6.0</td>
      <td>6.0</td>
    </tr>
  </tbody>
</table>
</div>


