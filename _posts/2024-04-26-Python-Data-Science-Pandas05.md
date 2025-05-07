---
title: Hierarchical_Indexing
date: 2024-04-26
categories: [ Python Data Science ]
tags: [ Pandas ]
layout: post
---

# Hierarchical_Indexing

```python
import pandas as pd
import numpy as np
```

## A Multiply Indexed Series

### The bad way

```python
index = [('California', 2000), ('California', 2010),
         ('New York', 2000), ('New York', 2010),
         ('Texas', 2000), ('Texas', 2010)]
populations = [33871648, 37253956,
               18976457, 19378102,
               20851820, 25145561]
pop = pd.Series(populations, index=index)
pop
```

    (California, 2000)    33871648
    (California, 2010)    37253956
    (New York, 2000)      18976457
    (New York, 2010)      19378102
    (Texas, 2000)         20851820
    (Texas, 2010)         25145561
    dtype: int64

```python
pop[('California', 2010):('Texas', 2000)]
```

    (California, 2010)    37253956
    (New York, 2000)      18976457
    (New York, 2010)      19378102
    (Texas, 2000)         20851820
    dtype: int64

```python
# 2010년의 모든 값을 선택해야 한다면 데이터 먼징(munging)을 해야 한다
# 깔끔하지 못하고 대규모 데이터의 경우 비효율적
pop[[i for i in pop.index if i[1] == 2010]]
```

    (California, 2010)    37253956
    (New York, 2010)      19378102
    (Texas, 2010)         25145561
    dtype: int64

### The Better Way: Pandas MultiIndex

```python
index = pd.MultiIndex.from_tuples(index)
index
```

    MultiIndex([('California', 2000),
                ('California', 2010),
                (  'New York', 2000),
                (  'New York', 2010),
                (     'Texas', 2000),
                (     'Texas', 2010)],
               )

```python
pop = pop.reindex(index)
pop
```

    California  2000    33871648
                2010    37253956
    New York    2000    18976457
                2010    19378102
    Texas       2000    20851820
                2010    25145561
    dtype: int64

```python
pop[:, 2010]
```

    California    37253956
    New York      19378102
    Texas         25145561
    dtype: int64

### MultiIndex as extra dimension

```python
# 다중 인덱스를 가진 Series를 전형적인 인덱스를 가진 DataFrame으로 변환
pop_df = pop.unstack()
pop_df
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
      <th>2000</th>
      <th>2010</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>California</th>
      <td>33871648</td>
      <td>37253956</td>
    </tr>
    <tr>
      <th>New York</th>
      <td>18976457</td>
      <td>19378102</td>
    </tr>
    <tr>
      <th>Texas</th>
      <td>20851820</td>
      <td>25145561</td>
    </tr>
  </tbody>
</table>
</div>

```python
pop_df.stack()
```

    California  2000    33871648
                2010    37253956
    New York    2000    18976457
                2010    19378102
    Texas       2000    20851820
                2010    25145561
    dtype: int64

```python
# 계측적 인덱싱을 통해 데이터 타입에 대한 유연성 확보
pop_df = pd.DataFrame({'total': pop,
                       'under18': [9267089, 9284094,
                                   4687374, 4318033,
                                   5906301, 6879014]})
pop_df
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
      <th></th>
      <th>total</th>
      <th>under18</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">California</th>
      <th>2000</th>
      <td>33871648</td>
      <td>9267089</td>
    </tr>
    <tr>
      <th>2010</th>
      <td>37253956</td>
      <td>9284094</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">New York</th>
      <th>2000</th>
      <td>18976457</td>
      <td>4687374</td>
    </tr>
    <tr>
      <th>2010</th>
      <td>19378102</td>
      <td>4318033</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">Texas</th>
      <th>2000</th>
      <td>20851820</td>
      <td>5906301</td>
    </tr>
    <tr>
      <th>2010</th>
      <td>25145561</td>
      <td>6879014</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 고차원 데이터를 쉽고 빠르게 가공하고 탐색 가능
f_u18 = pop_df['under18'] / pop_df['total']
f_u18.unstack()
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
      <th>2000</th>
      <th>2010</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>California</th>
      <td>0.273594</td>
      <td>0.249211</td>
    </tr>
    <tr>
      <th>New York</th>
      <td>0.247010</td>
      <td>0.222831</td>
    </tr>
    <tr>
      <th>Texas</th>
      <td>0.283251</td>
      <td>0.273568</td>
    </tr>
  </tbody>
</table>
</div>

## Methods of MultiIndex Creation

```python
# 다중 인덱스를 가진 Series나 DataFrame을 생성하는 가장 간단한 방식은
# 생성자에 2개 이상의 인덱스 배열 리스트를 전달하는 것
df = pd.DataFrame(np.random.rand(4, 2),
                  index=[['a', 'a', 'b', 'b'], [1, 2, 1, 2]],
                  columns=['data1', 'data2'])
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
      <th></th>
      <th>data1</th>
      <th>data2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">a</th>
      <th>1</th>
      <td>0.458682</td>
      <td>0.273650</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.446261</td>
      <td>0.781636</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">b</th>
      <th>1</th>
      <td>0.615580</td>
      <td>0.353759</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.356826</td>
      <td>0.624523</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 튜플을 키로 갖는 딕셔너리를 전달하면 Pandas는 자동으로 인식해 MultiIndex를 사용
data = {('California', 2000): 33871648,
        ('California', 2010): 37253956,
        ('Texas', 2000): 20851820,
        ('Texas', 2010): 25145561,
        ('New York', 2000): 18976457,
        ('New York', 2010): 19378102}
pd.Series(data)
```

    California  2000    33871648
                2010    37253956
    Texas       2000    20851820
                2010    25145561
    New York    2000    18976457
                2010    19378102
    dtype: int64

### 명시적 MultiIndex 생성자 Explicit MultiIndex constructors

```python
# 각 레벨 내에 인덱스 값을 제공하는 간단한 배열 리스트로부터 MultiIndex 생성
pd.MultiIndex.from_arrays([['a', 'a', 'b', 'b'], [1, 2, 1, 2]])
```

    MultiIndex([('a', 1),
                ('a', 2),
                ('b', 1),
                ('b', 2)],
               )

```python
# 각 점의 여러 인덱스 값을 제공하는 튜플 리스트로부터 생성
pd.MultiIndex.from_tuples([('a', 1), ('a', 2), ('b', 1), ('b', 2)])
```

    MultiIndex([('a', 1),
                ('a', 2),
                ('b', 1),
                ('b', 2)],
               )

```python
# 단일 인덱스의 데카르트 곱(Cartesian product)으로부터 MultiIndex를 생성
pd.MultiIndex.from_product([['a', 'b'], [1, 2]])
```

    MultiIndex([('a', 1),
                ('a', 2),
                ('b', 1),
                ('b', 2)],
               )

```python
# levels(MultiIndex의 고유한 값들의 집합을 나타내는 리스트)
# codes(각 데이터 포인트가 levels에 어떻게 매핑되는지를 나타내는 정수 값들의 리스트)
# levels와 codes를 전달함으로써 그 내부 인코딩을 사용해 직접 MultiIndex를 생성
pd.MultiIndex(levels=[['a', 'b'], [1, 2]],
              codes=[[0, 0, 1, 1], [0, 1, 0, 1]])
```

    MultiIndex([('a', 1),
                ('a', 2),
                ('b', 1),
                ('b', 2)],
               )

### MultiIndex level names

```python
# MultiIndex생성자에 names 인수를 전달하거나 생성 후에 인덱스의 name속성을 설정해 이름을 지정
pop.index.names = ['state', 'year']
pop
```

    state       year
    California  2000    33871648
                2010    37253956
    New York    2000    18976457
                2010    19378102
    Texas       2000    20851820
                2010    25145561
    dtype: int64

### MultiIndex for columns

```python
# 계층적 인덱스와 열 hierarchical indices and columns
index = pd.MultiIndex.from_product([[2013, 2014], [1, 2]],
                                   names=['year', 'visit'])
columns = pd.MultiIndex.from_product([['Bob', 'Guido', 'Sue'], ['HR', 'Temp']],
                                     names=['subject', 'type'])

# 일부 데이터 모형 만들기 mock some data
data = np.round(np.random.randn(4, 6), 1)
data[:, ::2] *= 10
data += 37

# create the DataFrame
health_data = pd.DataFrame(data, index=index, columns=columns)
health_data
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead tr th {
        text-align: left;
    }

    .dataframe thead tr:last-of-type th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>subject</th>
      <th colspan="2" halign="left">Bob</th>
      <th colspan="2" halign="left">Guido</th>
      <th colspan="2" halign="left">Sue</th>
    </tr>
    <tr>
      <th></th>
      <th>type</th>
      <th>HR</th>
      <th>Temp</th>
      <th>HR</th>
      <th>Temp</th>
      <th>HR</th>
      <th>Temp</th>
    </tr>
    <tr>
      <th>year</th>
      <th>visit</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">2013</th>
      <th>1</th>
      <td>37.0</td>
      <td>38.0</td>
      <td>31.0</td>
      <td>35.0</td>
      <td>37.0</td>
      <td>36.4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>37.0</td>
      <td>36.5</td>
      <td>25.0</td>
      <td>39.3</td>
      <td>68.0</td>
      <td>38.2</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">2014</th>
      <th>1</th>
      <td>43.0</td>
      <td>35.3</td>
      <td>24.0</td>
      <td>38.2</td>
      <td>37.0</td>
      <td>38.4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>37.0</td>
      <td>37.6</td>
      <td>47.0</td>
      <td>36.5</td>
      <td>62.0</td>
      <td>36.7</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 특정 subject로 최상위 열의 인덱스를 지정하고 그 subject의 정보를 포함하는 전체 DataFrame을 가져올 수 있다
health_data['Guido']
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
      <th>type</th>
      <th>HR</th>
      <th>Temp</th>
    </tr>
    <tr>
      <th>year</th>
      <th>visit</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">2013</th>
      <th>1</th>
      <td>31.0</td>
      <td>35.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>25.0</td>
      <td>39.3</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">2014</th>
      <th>1</th>
      <td>24.0</td>
      <td>38.2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>47.0</td>
      <td>36.5</td>
    </tr>
  </tbody>
</table>
</div>

## Indexing and Slicing a MultiIndex

### Multiply indexed Series

```python
pop
```

    state       year
    California  2000    33871648
                2010    37253956
    New York    2000    18976457
                2010    19378102
    Texas       2000    20851820
                2010    25145561
    dtype: int64

```python
# 여러 용어로 인덱싱해서 단일 요소에 접근 가능
pop['California', 2000]
```

    33871648

```python
# 부분 인덱싱(partial indexing)이나 인덱스 레벨 중 하나만 인덱싱하는 것도 지원
pop['California']
```

    year
    2000    33871648
    2010    37253956
    dtype: int64

```python
# MultiIndex가 정렬되어 있다면 부분 슬라이싱 가능
pop.loc['California':'New York']
```

    state       year
    California  2000    33871648
                2010    37253956
    New York    2000    18976457
                2010    19378102
    dtype: int64

```python
# index가 정렬되어 있다면 첫 번째 인덱스에 빈 슬라이스를 전달함으로써 더 낮은 레벨에서 부분인덱싱 수행 가능
pop[:, 2000]
```

    state
    California    33871648
    New York      18976457
    Texas         20851820
    dtype: int64

```python
# 다른 유형의 데이터 인덱싱과 선택 방식 적용 가능
pop[pop > 22000000]
```

    state       year
    California  2000    33871648
                2010    37253956
    Texas       2010    25145561
    dtype: int64

```python
# 팬시 인덱싱을 이용한 데이터 선택 가능
pop[['California', 'Texas']]
```

    state       year
    California  2000    33871648
                2010    37253956
    Texas       2000    20851820
                2010    25145561
    dtype: int64

### Multiply indexed DataFrames

```python
# 열은 DataFrame의 기본 요소
health_data
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead tr th {
        text-align: left;
    }

    .dataframe thead tr:last-of-type th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>subject</th>
      <th colspan="2" halign="left">Bob</th>
      <th colspan="2" halign="left">Guido</th>
      <th colspan="2" halign="left">Sue</th>
    </tr>
    <tr>
      <th></th>
      <th>type</th>
      <th>HR</th>
      <th>Temp</th>
      <th>HR</th>
      <th>Temp</th>
      <th>HR</th>
      <th>Temp</th>
    </tr>
    <tr>
      <th>year</th>
      <th>visit</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">2013</th>
      <th>1</th>
      <td>37.0</td>
      <td>38.0</td>
      <td>31.0</td>
      <td>35.0</td>
      <td>37.0</td>
      <td>36.4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>37.0</td>
      <td>36.5</td>
      <td>25.0</td>
      <td>39.3</td>
      <td>68.0</td>
      <td>38.2</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">2014</th>
      <th>1</th>
      <td>43.0</td>
      <td>35.3</td>
      <td>24.0</td>
      <td>38.2</td>
      <td>37.0</td>
      <td>38.4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>37.0</td>
      <td>37.6</td>
      <td>47.0</td>
      <td>36.5</td>
      <td>62.0</td>
      <td>36.7</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 다중 인덱스를 가진 Series에서 사용된 구문이 열에 적용
health_data['Guido', 'HR']
```

    year  visit
    2013  1        31.0
          2        25.0
    2014  1        24.0
          2        47.0
    Name: (Guido, HR), dtype: float64

```python
# 인덱서 사용
health_data.iloc[:2, :2]
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead tr th {
        text-align: left;
    }

    .dataframe thead tr:last-of-type th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>subject</th>
      <th colspan="2" halign="left">Bob</th>
    </tr>
    <tr>
      <th></th>
      <th>type</th>
      <th>HR</th>
      <th>Temp</th>
    </tr>
    <tr>
      <th>year</th>
      <th>visit</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">2013</th>
      <th>1</th>
      <td>37.0</td>
      <td>38.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>37.0</td>
      <td>36.5</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 인덱서에서 개별 인덱스는 다중 인덱스의 튜플로 전달
health_data.loc[:, ('Bob', 'HR')]
```

    year  visit
    2013  1        37.0
          2        37.0
    2014  1        43.0
          2        37.0
    Name: (Bob, HR), dtype: float64

```python
# 튜플 내 슬라이스 생성 시 에러 발생
health_data.loc[(:, 1), (:, 'HR')]
```

      Cell In[32], line 2
        health_data.loc[(:, 1), (:, 'HR')]
                         ^
    SyntaxError: invalid syntax

```python
# slice()를 사용해 원하는 슬라이스를 명시적으로 만들면 에러를 피할 수 있지만 Pandas에선 IndexSlice 객체를 사용
idx = pd.IndexSlice
health_data.loc[idx[:, 1], idx[:, 'HR']]
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead tr th {
        text-align: left;
    }

    .dataframe thead tr:last-of-type th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th>subject</th>
      <th>Bob</th>
      <th>Guido</th>
      <th>Sue</th>
    </tr>
    <tr>
      <th></th>
      <th>type</th>
      <th>HR</th>
      <th>HR</th>
      <th>HR</th>
    </tr>
    <tr>
      <th>year</th>
      <th>visit</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2013</th>
      <th>1</th>
      <td>37.0</td>
      <td>31.0</td>
      <td>37.0</td>
    </tr>
    <tr>
      <th>2014</th>
      <th>1</th>
      <td>43.0</td>
      <td>24.0</td>
      <td>37.0</td>
    </tr>
  </tbody>
</table>
</div>

## 다중 인덱스 재정렬 Rearranging Multi-Indices

### 정렬된 인덱스와 정렬되지 않은 인덱스 Sorted and unsorted indices

```python
# 대부분의 MultiIndex 슬라이싱 연산은 인덱스가 정렬되어 있지 않으면 실패
index = pd.MultiIndex.from_product([['a', 'c', 'b'], [1, 2]])
data = pd.Series(np.random.rand(6), index=index)
data.index.names = ['char', 'int']
data
```

    char  int
    a     1      0.284602
          2      0.411979
    c     1      0.068748
          2      0.564982
    b     1      0.045159
          2      0.356365
    dtype: float64

```python
# 미정렬 인덱스는 부분 슬라이싱 불가
try:
    data['a':'b']
except KeyError as e:
    print(type(e))
    print(e)
```

    <class 'pandas.errors.UnsortedIndexError'>
    'Key length (1) was greater than MultiIndex lexsort depth (0)'

```python
# MultiIndex 정렬
data = data.sort_index()
data
```

    char  int
    a     1      0.284602
          2      0.411979
    b     1      0.045159
          2      0.356365
    c     1      0.068748
          2      0.564982
    dtype: float64

```python
# 정렬된 인덱스를 사용하면 부분 슬라이싱은 정상 동작
data['a':'b']
```

    char  int
    a     1      0.284602
          2      0.411979
    b     1      0.045159
          2      0.356365
    dtype: float64

### Stacking and unstacking indices

```python
# 정렬된 다중 인덱스에서 간단한 2차원 표현으로 변경 가능하며, 이 때 선택적으로 사용할 레벨 지정 가능
pop.unstack(level=0)
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
      <th>state</th>
      <th>California</th>
      <th>New York</th>
      <th>Texas</th>
    </tr>
    <tr>
      <th>year</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2000</th>
      <td>33871648</td>
      <td>18976457</td>
      <td>20851820</td>
    </tr>
    <tr>
      <th>2010</th>
      <td>37253956</td>
      <td>19378102</td>
      <td>25145561</td>
    </tr>
  </tbody>
</table>
</div>

```python
pop.unstack(level=1)
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
      <th>year</th>
      <th>2000</th>
      <th>2010</th>
    </tr>
    <tr>
      <th>state</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>California</th>
      <td>33871648</td>
      <td>37253956</td>
    </tr>
    <tr>
      <th>New York</th>
      <td>18976457</td>
      <td>19378102</td>
    </tr>
    <tr>
      <th>Texas</th>
      <td>20851820</td>
      <td>25145561</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 원래 시리즈로 회복하는 데 사용 가능
pop.unstack().stack()
```

    state       year
    California  2000    33871648
                2010    37253956
    New York    2000    18976457
                2010    19378102
    Texas       2000    20851820
                2010    25145561
    dtype: int64

### Index setting and resetting

```python
# 인덱스 레이블을 열로 바꿈
pop_flat = pop.reset_index(name='population')
pop_flat
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
      <th>state</th>
      <th>year</th>
      <th>population</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>California</td>
      <td>2000</td>
      <td>33871648</td>
    </tr>
    <tr>
      <th>1</th>
      <td>California</td>
      <td>2010</td>
      <td>37253956</td>
    </tr>
    <tr>
      <th>2</th>
      <td>New York</td>
      <td>2000</td>
      <td>18976457</td>
    </tr>
    <tr>
      <th>3</th>
      <td>New York</td>
      <td>2010</td>
      <td>19378102</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Texas</td>
      <td>2000</td>
      <td>20851820</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Texas</td>
      <td>2010</td>
      <td>25145561</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 다중 인덱스를 갖는 DataFrame 반환
pop_flat.set_index(['state', 'year'])
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
      <th></th>
      <th>population</th>
    </tr>
    <tr>
      <th>state</th>
      <th>year</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">California</th>
      <th>2000</th>
      <td>33871648</td>
    </tr>
    <tr>
      <th>2010</th>
      <td>37253956</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">New York</th>
      <th>2000</th>
      <td>18976457</td>
    </tr>
    <tr>
      <th>2010</th>
      <td>19378102</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">Texas</th>
      <th>2000</th>
      <td>20851820</td>
    </tr>
    <tr>
      <th>2010</th>
      <td>25145561</td>
    </tr>
  </tbody>
</table>
</div>


