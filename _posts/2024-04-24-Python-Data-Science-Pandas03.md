---
title: Operations_In_Pandas
date: 2024-04-24
categories: [Python Data Science]
tags: [Pandas]
layout: post
---

# Operations_In_Pandas


```python
import pandas as pd
import numpy as np
```

## Ufuncs: Index Preservation

Pandas는 NumPy와 함께 작업하도록 설계되어 NumPy의 UFunc가 Pandas의 Series와 DataFrame 객체에 동작


```python
rng = np.random.RandomState(42)
ser = pd.Series(rng.randint(0, 10, 4))
df = pd.DataFrame(rng.randint(0, 10, (3, 4)), columns=['A', 'B', 'C', 'D'])
print("ser:\n", ser)
print("\ndf:\n", df)
```

    ser:
     0    6
    1    3
    2    7
    3    4
    dtype: int32
    
    df:
        A  B  C  D
    0  6  9  2  6
    1  7  4  3  7
    2  7  2  5  4
    


```python
# NumPy UFunc를 이 객체 중 하나에 적용 시 인덱스가 그대로 보존된 다른 Pandas 객체가 된다
np.exp(ser)
```




    0     403.428793
    1      20.085537
    2    1096.633158
    3      54.598150
    dtype: float64




```python
# UFunc를 통한 연산
np.sin(df * np.pi / 4)
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
      <td>-1.000000</td>
      <td>7.071068e-01</td>
      <td>1.000000</td>
      <td>-1.000000e+00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-0.707107</td>
      <td>1.224647e-16</td>
      <td>0.707107</td>
      <td>-7.071068e-01</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-0.707107</td>
      <td>1.000000e+00</td>
      <td>-0.707107</td>
      <td>1.224647e-16</td>
    </tr>
  </tbody>
</table>
</div>



## UFuncs: Index Alignment

두 개의 Series 또는 DataFrame 객체에 이항 연산을 적용하는 경우, Pandas는 연산을 수행하는 과정에서 인덱스를 정렬

### Series에서 인덱스 정렬


```python
area = pd.Series({'Alaska': 1723337, 'Texas': 695662, 'California': 423967}, name='area')
population = pd.Series({'California': 38332521, 'Texas': 26448193, 'New York': 19651127}, name='population')
```


```python
# 배열은 두 입력 배열의 인덱스의 합집합을 담음
# 둘 중 하나라도 값이 없는 항목은 Pandas가 NaN으로 표시
population / area
```




    Alaska              NaN
    California    90.413926
    New York            NaN
    Texas         38.018740
    dtype: float64




```python
# NaN 값을 원치 않을 경우 산술 연산 메서드를 통한 채우기
# fill_value --> NaN 값등의 누락 요소를 계산 전에 이 값으로 대체
area.add(population, fill_value=0)
```




    Alaska         1723337.0
    California    38756488.0
    New York      19651127.0
    Texas         27143855.0
    dtype: float64



### DataFrame에서 인덱스 정렬


```python
# 두 객체의 순서와 상관없이 인덱스가 올바르게 정렬
A = pd.DataFrame(rng.randint(0, 20, (2, 2)), columns=list('AB'))
B = pd.DataFrame(rng.randint(0, 10, (3, 3)), columns=list('BAC'))

fill = A.stack().mean()
A.add(B, fill_value = fill)
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
      <td>1.0</td>
      <td>15.0</td>
      <td>13.5</td>
    </tr>
    <tr>
      <th>1</th>
      <td>13.0</td>
      <td>6.0</td>
      <td>4.5</td>
    </tr>
    <tr>
      <th>2</th>
      <td>6.5</td>
      <td>13.5</td>
      <td>10.5</td>
    </tr>
  </tbody>
</table>
</div>



### 파이썬 연산자와 Pandas 메서드 매핑

| Python Operator | Pandas Method(s)                      |
|-----------------|---------------------------------------|
| ``+``           | ``add()``                             |
| ``-``           | ``sub()``, ``subtract()``             |
| ``*``           | ``mul()``, ``multiply()``             |
| ``/``           | ``truediv()``, ``div()``, ``divide()``|
| ``//``          | ``floordiv()``                        |
| ``%``           | ``mod()``                             |
| ``**``          | ``pow()``                             |

## Ufuncs: Operations Between DataFrame and Series


```python
A = rng.randint(10, size=(3, 4))
A
```




    array([[3, 8, 2, 4],
           [2, 6, 4, 8],
           [6, 1, 3, 8]])




```python
# NumPy 에서의 연산
A - A[0]
```




    array([[ 0,  0,  0,  0],
           [-1, -2,  2,  4],
           [ 3, -7,  1,  4]])




```python
# Pandas 에서의 연산
df = pd.DataFrame(A, columns=list('QRST'))
df - df.iloc[0]
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
      <th>Q</th>
      <th>R</th>
      <th>S</th>
      <th>T</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-1</td>
      <td>-2</td>
      <td>2</td>
      <td>4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>-7</td>
      <td>1</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
</div>




```python
# 열 방향으로 연산하기 위한 축 지정
df.subtract(df['R'], axis=0)
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
      <th>Q</th>
      <th>R</th>
      <th>S</th>
      <th>T</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-5</td>
      <td>0</td>
      <td>-6</td>
      <td>-4</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-4</td>
      <td>0</td>
      <td>-2</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>5</td>
      <td>0</td>
      <td>2</td>
      <td>7</td>
    </tr>
  </tbody>
</table>
</div>




```python
# DataFrame/Series 연산 --> 두 요소간 인덱스 자동 맞춤
halfrow = df.iloc[0, ::2]
print(halfrow)
df - halfrow
```

    Q    3
    S    2
    Name: 0, dtype: int32
    




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
      <th>Q</th>
      <th>R</th>
      <th>S</th>
      <th>T</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0</td>
      <td>NaN</td>
      <td>0.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-1.0</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3.0</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>


