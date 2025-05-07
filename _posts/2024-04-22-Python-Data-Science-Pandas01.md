---
title: Pandas_Objects
date: 2024-04-22
categories: [ Python Data Science ]
tags: [ Pandas ]
layout: post
---

# Pandas_Objects

```python
import numpy as np
import pandas as pd
```

## The Pandas Series Object

```python
# Pandas Series는 인덱싱된 데이터의 1차원 배열
data = pd.Series([0.25, 0.5, 0.75, 1.0])
print("data:\n", data)
# Series는 values와 index 속성으로 접근 가능
# values는 Numpy 배열
print("\ndata.values:", data.values)
# index는 pd.Index 타입의 배열과 비슷한 객체
print("\ndata.index:", data.index)
print("\ndata[1:3]:\n", data[1:3])
```

    data:
     0    0.25
    1    0.50
    2    0.75
    3    1.00
    dtype: float64
    
    data.values: [0.25 0.5  0.75 1.  ]
    
    data.index: RangeIndex(start=0, stop=4, step=1)
    
    data[1:3]:
     1    0.50
    2    0.75
    dtype: float64

### 일반화된 NumPy 배열 generalized NumPy array

NumPy 배열에는 값에 접근하는 데 사용되는 암묵적으로 정의된 정수형 인덱스 존재  
Series에는 값에 연결된 명시적으로 정의되 인덱스 존재

```python
# index를 문자열로 사용
data = pd.Series([0.25, 0.5, 0.75, 1.0], index=['a', 'b', 'c', 'd'])
print("data:\n", data)
print("\ndata['b']:", data['b'])
```

    data:
     a    0.25
    b    0.50
    c    0.75
    d    1.00
    dtype: float64
    
    data['b']: 0.5

```python
# index를 불연속적으로 사용
data = pd.Series([0.25, 0.5, 0.75, 1.0], index=[2, 5, 3, 7])
print("\ndata:\n", data)
print("\ndata[3]:", data[3])
```

    data:
     2    0.25
    5    0.50
    3    0.75
    7    1.00
    dtype: float64
    
    data[3]: 0.75

### 특수한 딕셔너리 specialized dictionary

```python
# 파이썬 딕셔너리에서 직접 Series Objects 구성
population_dict = {'California': 38332521,
                   'Texas': 26448193,
                   'New York': 19651127,
                   'Florida': 19552860,
                   'Illinois': 12882135}
population = pd.Series(population_dict)
population
```

    California    38332521
    Texas         26448193
    New York      19651127
    Florida       19552860
    Illinois      12882135
    dtype: int64

```python
# Series는 인덱스가 정렬된 키에서 추출되는 경우 생성
population['California']
```

    38332521

```python
# Series는 슬라이싱과 같이 배열 스타일의 연산 지원
population['California':'Illinois']
```

    California    38332521
    Texas         26448193
    New York      19651127
    Florida       19552860
    Illinois      12882135
    dtype: int64

### Series 객체 구성하기 Constructing Series objects

pd.Series(data, index=index)  
index는 선택인수, data는 요소 중 하나

```python
# data: list 또는 NumPy 배열, index: 정수(기본)
pd.Series([2, 4, 6])
```

    0    2
    1    4
    2    6
    dtype: int64

```python
# data: 지정된 인덱스를 채우기 위해 반복되는 스칼라값
pd.Series(5, index=[100, 200, 300])
```

    100    5
    200    5
    300    5
    dtype: int64

```python
# data: 딕셔너리, index: 딕셔너리 키
pd.Series({2: 'a', 1: 'b', 3: 'c'})
```

    2    a
    1    b
    3    c
    dtype: object

```python
# index: 명시적으로 설정 --> Series를 명시적으로 정의된 키로만 채울 수 있음
pd.Series({2: 'a', 1: 'b', 3: 'c'}, index=[3, 2])
```

    3    c
    2    a
    dtype: object

## The Pandas DataFrane Object

DataFrame은 정렬된(인덱스를 공유하는) Series 객체의 연속  
행과 열 모두 데이터 접근을 위한 일반화된 인덱스를 가지고 있는 2차원 NumPy배열의 일반화된 버전

### 일반화된 NumPy 배열 generalized NumPy array

```python
area_dict = {'California': 423967, 'Texas': 695662, 'New York': 141297,
             'Florida': 170312, 'Illinois': 149995}
area = pd.Series(area_dict)
# 2차원 객체를 구성
states = pd.DataFrame({'population': population, 'area': area})
states
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
      <th>population</th>
      <th>area</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>California</th>
      <td>38332521</td>
      <td>423967</td>
    </tr>
    <tr>
      <th>Texas</th>
      <td>26448193</td>
      <td>695662</td>
    </tr>
    <tr>
      <th>New York</th>
      <td>19651127</td>
      <td>141297</td>
    </tr>
    <tr>
      <th>Florida</th>
      <td>19552860</td>
      <td>170312</td>
    </tr>
    <tr>
      <th>Illinois</th>
      <td>12882135</td>
      <td>149995</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 인덱스 레이블에 접근할 수 있는 index 속성
print("states.index:", states.index)

# 열 레이블을 가지고 있는 index 객체인 column 속성
print("states.columns:", states.columns)
```

    states.index: Index(['California', 'Texas', 'New York', 'Florida', 'Illinois'], dtype='object')
    states.columns: Index(['population', 'area'], dtype='object')

### 특수한 딕셔너리 specialized dictionary

```python
# DataFrame은 열 이름을 열 데이터로 이루어진 Series에 매핑
states['area']
```

    California    423967
    Texas         695662
    New York      141297
    Florida       170312
    Illinois      149995
    Name: area, dtype: int64

### DataFrame 객체 구성하기 Constructing DataFrame objects

```python
# DataFrame은 Series 객체의 집합체로서 열 하나짜리 DataFrame은 단일 Series로부터 구성
pd.DataFrame(population, columns=['population'])
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
      <th>population</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>California</th>
      <td>38332521</td>
    </tr>
    <tr>
      <th>Texas</th>
      <td>26448193</td>
    </tr>
    <tr>
      <th>New York</th>
      <td>19651127</td>
    </tr>
    <tr>
      <th>Florida</th>
      <td>19552860</td>
    </tr>
    <tr>
      <th>Illinois</th>
      <td>12882135</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 딕셔너리의 리스트는 DataFrame으로 만들 수 있음
data = [{'a': i, 'b': 2 * i}
        # 간단한 리스트 컴프리핸션을 사용해 데이터 제작
        for i in range(3)]
pd.DataFrame(data)
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
      <th>a</th>
      <th>b</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
</div>

```python
# Pandas는 누락된 자리를 NaN값으로 채움
pd.DataFrame([{'a': 1, 'b': 2}, {'b': 3, 'c': 4}])
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
      <th>a</th>
      <th>b</th>
      <th>c</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.0</td>
      <td>2</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>NaN</td>
      <td>3</td>
      <td>4.0</td>
    </tr>
  </tbody>
</table>
</div>

```python
# DataFrame을 Series 객체의 딕셔너리로 구성
pd.DataFrame({'population': population, 'area': area})
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
      <th>population</th>
      <th>area</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>California</th>
      <td>38332521</td>
      <td>423967</td>
    </tr>
    <tr>
      <th>Texas</th>
      <td>26448193</td>
      <td>695662</td>
    </tr>
    <tr>
      <th>New York</th>
      <td>19651127</td>
      <td>141297</td>
    </tr>
    <tr>
      <th>Florida</th>
      <td>19552860</td>
      <td>170312</td>
    </tr>
    <tr>
      <th>Illinois</th>
      <td>12882135</td>
      <td>149995</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 2차원 배열로 지정된 열과 인덱스 이름을 가진 DataFrame 생성
pd.DataFrame(np.random.rand(3, 2), columns=['foo', 'bar'], index=['a', 'b', 'c'])
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
      <th>foo</th>
      <th>bar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a</th>
      <td>0.683869</td>
      <td>0.876236</td>
    </tr>
    <tr>
      <th>b</th>
      <td>0.393982</td>
      <td>0.461714</td>
    </tr>
    <tr>
      <th>c</th>
      <td>0.079062</td>
      <td>0.769231</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 생략 시 각각에 대해 정수 인덱스 사용
pd.DataFrame(np.random.rand(3, 2), columns=['foo', 'bar'])
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
      <th>foo</th>
      <th>bar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.150569</td>
      <td>0.339610</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.495684</td>
      <td>0.406123</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.617366</td>
      <td>0.497586</td>
    </tr>
  </tbody>
</table>
</div>

```python
# NumPy의 구조화된 배열에서 구성
A = np.zeros(3, dtype=[('A', 'i8'), ('B', 'f8')])
A
```

    array([(0, 0.), (0, 0.), (0, 0.)], dtype=[('A', '<i8'), ('B', '<f8')])

## The Pandas Index Object

```python
ind = pd.Index([2, 3, 5, 7, 11])
ind
```

    Index([2, 3, 5, 7, 11], dtype='int64')

### 불변의 배열 immutable array

```python
# Index 객체는 여러 면에서 배열처럼 동작
print(ind[1])
print(ind[::2])
print(ind.size, ind.shape, ind.ndim, ind.dtype)
```

    3
    Index([2, 5, 11], dtype='int64')
    5 (5,) 1 int64

```python
# Index 객체는 일반적인 방법으로 변경 불가
# --> 예기치 않은 인덱스 변경으로 인한 부작용 없이
# 여러 DataFrame과 배열 사이에서 인덱스를 더 안전하게 공유 가능
ind[1] = 0
```

    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    Cell In[24], line 4
          1 # Index 객체는 일반적인 방법으로 변경 불가
          2 # --> 예기치 않은 인덱스 변경으로 인한 부작용 없이
          3 # 여러 DataFrame과 배열 사이에서 인덱스를 더 안전하게 공유 가능
    ----> 4 ind[1] = 0
    

    File D:\miniconda3\Lib\site-packages\pandas\core\indexes\base.py:5371, in Index.__setitem__(self, key, value)
       5369 @final
       5370 def __setitem__(self, key, value) -> None:
    -> 5371     raise TypeError("Index does not support mutable operations")
    

    TypeError: Index does not support mutable operations

### 정렬된 집합 ordered set

```python
indA = pd.Index([1, 3, 5, 7, 9])
indB = pd.Index([2, 3, 5, 7, 11])
# 파이썬에 내장된 set 데이터 구조에서 사용하는 표기법을 따름
print("indA & indB:", indA & indB)  # 교집합
print("indA | indB:", indA | indB)  # 합집합
print("indA ^ indB:", indA ^ indB)  # 대칭 차(두 집합의 상대 여집합의 합)
```

    indA & indB: Index([0, 3, 5, 7, 9], dtype='int64')
    indA | indB: Index([3, 3, 5, 7, 11], dtype='int64')
    indA ^ indB: Index([3, 0, 0, 0, 2], dtype='int64')
    
