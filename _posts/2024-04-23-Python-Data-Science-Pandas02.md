---
title: Data_Indexing_And_Selection
date: 2024-04-23
categories: [ Python Data Science ]
tags: [ Pandas ]
layout: post
---

# Data_Indexing_And_Selection

```python
import pandas as pd
```

## Data Selection in Series

### 딕셔너리 dictionary

```python
# Series 객체는 딕셔너리와 마찬가지로 키의 집합을 값의 집합에 매핑
data = pd.Series([0.25, 0.5, 0.75, 1.0], index=['a', 'b', 'c', 'd'])
print("\ndata:\n", data)
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
# 키/인덱스와 값을 조사하기 위해 딕셔너리와 유사한 파이썬 표현식과 메서드 사용
print("\n'a' in data:", 'a' in data)
print("data.keys():", data.keys())
print("list(data.items()):", list(data.items()))
```

    'a' in data: True
    data.keys(): Index(['a', 'b', 'c', 'd'], dtype='object')
    list(data.items()): [('a', 0.25), ('b', 0.5), ('c', 0.75), ('d', 1.0)]

```python
# 새로운 인덱스 값에 할당하여 Series를 확장
data['e'] = 1.25
print("\ndata:\n", data)
```

    data:
     a    0.25
    b    0.50
    c    0.75
    d    1.00
    e    1.25
    dtype: float64

### 1차원 배열 one-dimensional array

```python
# 명시적인 인덱스로 슬라이싱 --> 최종 인덱스가 슬라이스에 포함
data['a':'c']
```

    a    0.25
    b    0.50
    c    0.75
    dtype: float64

```python
# 암묵적 정수 인덱스로 슬라이싱 --> 최종 인덱스가 슬라이스에서 제외
data[0:2]
```

    a    0.25
    b    0.50
    dtype: float64

```python
# 마스킹
data[(data > 0.3) & (data < 0.8)]
```

    b    0.50
    c    0.75
    dtype: float64

```python
# 팬시 인덱싱
data[['a', 'e']]
```

    a    0.25
    e    1.25
    dtype: float64

### Indexers: loc and iloc

정수 인덱스 사용 시 발생하는 혼선을 방지  
loc와 iloc의 명시적 성격은 명확하고 가독성 있는 코드를 유지

```python
# 명시적 정수 인덱스를 가진 Series
data = pd.Series(['a', 'b', 'c'], index=[1, 3, 5])
data
```

    1    a
    3    b
    5    c
    dtype: object

```python
# 인덱싱할 때 명시적 인덱스 사용
print("data[1]:", data[1])

# 슬라이싱할 때 암묵적 인덱스 사용
print("data[1:3]:\n", data[1:3])
```

    data[1]: a
    data[1:3]:
     3    b
    5    c
    dtype: object

```python
# loc 속성은 명시적인 인덱스를 참조하는 인덱싱과 슬라이싱 가능
print("data.loc[1]:", data.loc[1])
print("data.loc[1:3]:\n", data.loc[1:3])
```

    data.loc[1]: a
    data.loc[1:3]:
     1    a
    3    b
    dtype: object

```python
# iloc 속성은 인덱싱과 슬라이싱에서 암묵적인 파이썬 스타일의 인덱스를 참조
print("data.iloc[1]:", data.iloc[1])
print("data.iloc[1:3]:\n", data.iloc[1:3])
```

    data.iloc[1]: b
    data.iloc[1:3]:
     3    b
    5    c
    dtype: object

## DataFrame에서 데이터 선택

### 딕셔너리 dictionary

```python
area = pd.Series({'California': 423967, 'Texas': 695662,
                  'New York': 141297, 'Florida': 170312,
                  'Illinois': 149995})
pop = pd.Series({'California': 38332521, 'Texas': 26448193,
                 'New York': 19651127, 'Florida': 19552860,
                 'Illinois': 12882135})
data = pd.DataFrame({'area': area, 'pop': pop})
data
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
      <th>area</th>
      <th>pop</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>California</th>
      <td>423967</td>
      <td>38332521</td>
    </tr>
    <tr>
      <th>Texas</th>
      <td>695662</td>
      <td>26448193</td>
    </tr>
    <tr>
      <th>New York</th>
      <td>141297</td>
      <td>19651127</td>
    </tr>
    <tr>
      <th>Florida</th>
      <td>170312</td>
      <td>19552860</td>
    </tr>
    <tr>
      <th>Illinois</th>
      <td>149995</td>
      <td>12882135</td>
    </tr>
  </tbody>
</table>
</div>

```python
# DataFrame의 열을 이루는 각 Series는 열 이름으로 된 딕셔너리 스타일의 인덱싱을 통해 접근 가능
data['area']
```

    California    423967
    Texas         695662
    New York      141297
    Florida       170312
    Illinois      149995
    Name: area, dtype: int64

```python
# 문자열인 열(column)이름을 이용해 속성 스타일로 접근 가능
data.area
```

    California    423967
    Texas         695662
    New York      141297
    Florida       170312
    Illinois      149995
    Name: area, dtype: int64

```python
# 열 이름이 문자열이 아니거나 메서드와 충돌할 때 이 속성 스타일로 접근 불가
# data.pop --> pop() 메서드를 가리킴
data.pop is data['pop']
```

    False

```python
# 열을 할당 시 data['pop'] = z 를 사용 --> data.pop = z 금지
data['density'] = data['pop'] / data['area']
data
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
      <th>area</th>
      <th>pop</th>
      <th>density</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>California</th>
      <td>423967</td>
      <td>38332521</td>
      <td>90.413926</td>
    </tr>
    <tr>
      <th>Texas</th>
      <td>695662</td>
      <td>26448193</td>
      <td>38.018740</td>
    </tr>
    <tr>
      <th>New York</th>
      <td>141297</td>
      <td>19651127</td>
      <td>139.076746</td>
    </tr>
    <tr>
      <th>Florida</th>
      <td>170312</td>
      <td>19552860</td>
      <td>114.806121</td>
    </tr>
    <tr>
      <th>Illinois</th>
      <td>149995</td>
      <td>12882135</td>
      <td>85.883763</td>
    </tr>
  </tbody>
</table>
</div>

### 2차원 배열 two-dimensional array

```python
# values 속성을 이용해 원시 기반 데이터 배열 확인
data.values
```

    array([[4.23967000e+05, 3.83325210e+07, 9.04139261e+01],
           [6.95662000e+05, 2.64481930e+07, 3.80187404e+01],
           [1.41297000e+05, 1.96511270e+07, 1.39076746e+02],
           [1.70312000e+05, 1.95528600e+07, 1.14806121e+02],
           [1.49995000e+05, 1.28821350e+07, 8.58837628e+01]])

```python
data.T
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
      <th>California</th>
      <th>Texas</th>
      <th>New York</th>
      <th>Florida</th>
      <th>Illinois</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>area</th>
      <td>4.239670e+05</td>
      <td>6.956620e+05</td>
      <td>1.412970e+05</td>
      <td>1.703120e+05</td>
      <td>1.499950e+05</td>
    </tr>
    <tr>
      <th>pop</th>
      <td>3.833252e+07</td>
      <td>2.644819e+07</td>
      <td>1.965113e+07</td>
      <td>1.955286e+07</td>
      <td>1.288214e+07</td>
    </tr>
    <tr>
      <th>density</th>
      <td>9.041393e+01</td>
      <td>3.801874e+01</td>
      <td>1.390767e+02</td>
      <td>1.148061e+02</td>
      <td>8.588376e+01</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 배열에 단일 인덱스를 전달 시 행에 접근
data.values[0]
```

    array([4.23967000e+05, 3.83325210e+07, 9.04139261e+01])

```python
# DataFrame에 단일 인덱스를 전달 시 열에 접근
data['area']
```

    California    423967
    Texas         695662
    New York      141297
    Florida       170312
    Illinois      149995
    Name: area, dtype: int64

```python
# iloc 인덱서를 사용해 DataFrame객체를 단순 NumPy배열처럼 기반 배열 인덱싱
data.iloc[:3, :2]
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
      <th>area</th>
      <th>pop</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>California</th>
      <td>423967</td>
      <td>38332521</td>
    </tr>
    <tr>
      <th>Texas</th>
      <td>695662</td>
      <td>26448193</td>
    </tr>
    <tr>
      <th>New York</th>
      <td>141297</td>
      <td>19651127</td>
    </tr>
  </tbody>
</table>
</div>

```python
# loc 인덱서를 사용해 배열과 같은 스타일로 기초 데이터 인덱싱
data.loc[:'Florida', :'pop']
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
      <th>area</th>
      <th>pop</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>California</th>
      <td>423967</td>
      <td>38332521</td>
    </tr>
    <tr>
      <th>Texas</th>
      <td>695662</td>
      <td>26448193</td>
    </tr>
    <tr>
      <th>New York</th>
      <td>141297</td>
      <td>19651127</td>
    </tr>
    <tr>
      <th>Florida</th>
      <td>170312</td>
      <td>19552860</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 마스킹과 팬시 인덱싱 결합
data.loc[data.density > 100, ['pop', 'density']]
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
      <th>pop</th>
      <th>density</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>New York</th>
      <td>19651127</td>
      <td>139.076746</td>
    </tr>
    <tr>
      <th>Florida</th>
      <td>19552860</td>
      <td>114.806121</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 값을 설정하거나 변경하는 데 사용
data.iloc[0, 2] = 90
data
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
      <th>area</th>
      <th>pop</th>
      <th>density</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>California</th>
      <td>423967</td>
      <td>38332521</td>
      <td>90.000000</td>
    </tr>
    <tr>
      <th>Texas</th>
      <td>695662</td>
      <td>26448193</td>
      <td>38.018740</td>
    </tr>
    <tr>
      <th>New York</th>
      <td>141297</td>
      <td>19651127</td>
      <td>139.076746</td>
    </tr>
    <tr>
      <th>Florida</th>
      <td>170312</td>
      <td>19552860</td>
      <td>114.806121</td>
    </tr>
    <tr>
      <th>Illinois</th>
      <td>149995</td>
      <td>12882135</td>
      <td>85.883763</td>
    </tr>
  </tbody>
</table>
</div>

### 추가적인 인덱싱 규칙 Additional indexing conventions

```python
# 인덱싱은 열을 참조, 슬라이싱은 행을 참조
data['Florida':'Illinois']
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
      <th>area</th>
      <th>pop</th>
      <th>density</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Florida</th>
      <td>170312</td>
      <td>19552860</td>
      <td>114.806121</td>
    </tr>
    <tr>
      <th>Illinois</th>
      <td>149995</td>
      <td>12882135</td>
      <td>85.883763</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 슬라이스를 인덱스 대신 숫자로 행을 참조
data[1:3]
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
      <th>area</th>
      <th>pop</th>
      <th>density</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Texas</th>
      <td>695662</td>
      <td>26448193</td>
      <td>38.018740</td>
    </tr>
    <tr>
      <th>New York</th>
      <td>141297</td>
      <td>19651127</td>
      <td>139.076746</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 직접 마스킹 연산은 열 단위가 아닌 행 단위로 해석
data[data.density > 100]
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
      <th>area</th>
      <th>pop</th>
      <th>density</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>New York</th>
      <td>141297</td>
      <td>19651127</td>
      <td>139.076746</td>
    </tr>
    <tr>
      <th>Florida</th>
      <td>170312</td>
      <td>19552860</td>
      <td>114.806121</td>
    </tr>
  </tbody>
</table>
</div>


