---
title: Aggregation_And_Grouping
date: 2024-04-29
categories: [ Python Data Science ]
tags: [ Pandas ]
layout: post
---

# Aggregation_And_Grouping

```python
import numpy as np
import pandas as pd


class display(object):
    """Display HTML representation of multiple objects"""
    template = """<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>{0}</p>{1}
    </div>"""

    def __init__(self, *args):
        self.args = args

    def _repr_html_(self):
        return '\n'.join(self.template.format(a, eval(a)._repr_html_())
                         for a in self.args)

    def __repr__(self):
        return '\n\n'.join(a + '\n' + repr(eval(a))
                           for a in self.args)
```

## Planets Data

```python
# 이 데이터는 외행성 주변에서 발견한 행성에 대한 정보 제공
import seaborn as sns

planets = sns.load_dataset('planets')
planets.shape
```

    (1035, 6)

```python
planets.head()
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
      <th>method</th>
      <th>number</th>
      <th>orbital_period</th>
      <th>mass</th>
      <th>distance</th>
      <th>year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Radial Velocity</td>
      <td>1</td>
      <td>269.300</td>
      <td>7.10</td>
      <td>77.40</td>
      <td>2006</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Radial Velocity</td>
      <td>1</td>
      <td>874.774</td>
      <td>2.21</td>
      <td>56.95</td>
      <td>2008</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Radial Velocity</td>
      <td>1</td>
      <td>763.000</td>
      <td>2.60</td>
      <td>19.84</td>
      <td>2011</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Radial Velocity</td>
      <td>1</td>
      <td>326.030</td>
      <td>19.40</td>
      <td>110.62</td>
      <td>2007</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Radial Velocity</td>
      <td>1</td>
      <td>516.220</td>
      <td>10.50</td>
      <td>119.47</td>
      <td>2009</td>
    </tr>
  </tbody>
</table>
</div>

## Pandas의 간단한 집계 연산 Simple Aggregation in Pandas

```python
# Series
rng = np.random.RandomState(42)
ser = pd.Series(rng.rand(5))
print("ser:\n", ser, "\n\nser.sum():", ser.sum(), "\n\nser.mean():", ser.mean())
```

    ser:
     0    0.374540
    1    0.950714
    2    0.731994
    3    0.598658
    4    0.156019
    dtype: float64 
    
    ser.sum(): 2.811925491708157 
    
    ser.mean(): 0.5623850983416314

```python
# DataFrame
df = pd.DataFrame({'A': rng.rand(5),
                   'B': rng.rand(5)})
print("df:\n", df, "\n\ndf.mean():\n", df.mean(), "\n\ndf.mean(axis='columns'):\n", df.mean(axis='columns'))
```

    df:
               A         B
    0  0.155995  0.020584
    1  0.058084  0.969910
    2  0.866176  0.832443
    3  0.601115  0.212339
    4  0.708073  0.181825 
    
    df.mean():
     A    0.477888
    B    0.443420
    dtype: float64 
    
    df.mean(axis='columns'):
     0    0.088290
    1    0.513997
    2    0.849309
    3    0.406727
    4    0.444949
    dtype: float64

```python
# describe() --> 각 열에 대한 여러 일반적인 집계를 계산하고 결과를 반환
planets.dropna().describe()
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
      <th>number</th>
      <th>orbital_period</th>
      <th>mass</th>
      <th>distance</th>
      <th>year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>498.00000</td>
      <td>498.000000</td>
      <td>498.000000</td>
      <td>498.000000</td>
      <td>498.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>1.73494</td>
      <td>835.778671</td>
      <td>2.509320</td>
      <td>52.068213</td>
      <td>2007.377510</td>
    </tr>
    <tr>
      <th>std</th>
      <td>1.17572</td>
      <td>1469.128259</td>
      <td>3.636274</td>
      <td>46.596041</td>
      <td>4.167284</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1.00000</td>
      <td>1.328300</td>
      <td>0.003600</td>
      <td>1.350000</td>
      <td>1989.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>1.00000</td>
      <td>38.272250</td>
      <td>0.212500</td>
      <td>24.497500</td>
      <td>2005.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>1.00000</td>
      <td>357.000000</td>
      <td>1.245000</td>
      <td>39.940000</td>
      <td>2009.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>2.00000</td>
      <td>999.600000</td>
      <td>2.867500</td>
      <td>59.332500</td>
      <td>2011.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>6.00000</td>
      <td>17337.500000</td>
      <td>25.000000</td>
      <td>354.000000</td>
      <td>2014.000000</td>
    </tr>
  </tbody>
</table>
</div>

### Pandas의 집계 메서드 목록

| Aggregation              | Description                              |
|--------------------------|------------------------------------------|
| ``count()``              | 항목 전체 개수 Total number of items           |
| ``first()``, ``last()``  | 첫 항목과 마지막 항목 First and last item         |
| ``mean()``, ``median()`` | 평균값과 중앙값 Mean and median                 |
| ``min()``, ``max()``     | 최솟값과 최댓값 Minimum and maximum             |
| ``std()``, ``var()``     | 표준편차와 분산 Standard deviation and variance |
| ``mad()``                | 절대 평균 편차 Mean absolute deviation         |
| ``prod()``               | 전체 항목의 곱 Product of all items            |
| ``sum()``                | 전체 항목의 합 Sum of all items                |

## GroupBy: Split, Apply, Combine 분할, 적용, 결합

* 분할 단계: 지정된 키 값을 기준으로 DataFrame을 나누고 분류하는 단계
* 적용 단계: 개별 그룹 내에서 일반적으로 집계, 변환, 필터링 같은 함수를 계산
* 결합 단계: 이 연산의 결과를 결과 배열에 병합

![png](assets/img/Aggregation_And_Grouping/03.08-split-apply-combine.png)
[figure source in Appendix](06.00-Figure-Code.ipynb#Split-Apply-Combine)

```python
df = pd.DataFrame({'key': ['A', 'B', 'C', 'A', 'B', 'C'],
                   'data': range(6)}, columns=['key', 'data'])
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
      <th>key</th>
      <th>data</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>A</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>B</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>C</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>A</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>B</td>
      <td>4</td>
    </tr>
    <tr>
      <th>5</th>
      <td>C</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 분할-적용-결합 연산 계산 --> DataFrameGroupBy 객체 리턴
df.groupby('key')
```

    <pandas.core.groupby.generic.DataFrameGroupBy object at 0x000001F4DCD07D70>

```python
# DataFrameGroupBy 객체에 집계 연산 적용
display("df.groupby('key').sum()", "df.groupby('key').mean()", "df.groupby('key').max()")
```

<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>df.groupby('key').sum()</p><div>
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
      <th>data</th>
    </tr>
    <tr>
      <th>key</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>A</th>
      <td>3</td>
    </tr>
    <tr>
      <th>B</th>
      <td>5</td>
    </tr>
    <tr>
      <th>C</th>
      <td>7</td>
    </tr>
  </tbody>
</table>
</div>
    </div>
<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>df.groupby('key').mean()</p><div>
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
      <th>data</th>
    </tr>
    <tr>
      <th>key</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>A</th>
      <td>1.5</td>
    </tr>
    <tr>
      <th>B</th>
      <td>2.5</td>
    </tr>
    <tr>
      <th>C</th>
      <td>3.5</td>
    </tr>
  </tbody>
</table>
</div>
    </div>
<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>df.groupby('key').max()</p><div>
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
      <th>data</th>
    </tr>
    <tr>
      <th>key</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>A</th>
      <td>3</td>
    </tr>
    <tr>
      <th>B</th>
      <td>4</td>
    </tr>
    <tr>
      <th>C</th>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>
    </div>

### The GroupBy object

#### Column indexing

GroupBy 객체는 DataFrame과 동일한 방식으로 열 인덱싱을 지원하며 수정된 GroupBy 객체를 리턴

```python
planets.groupby('method')
```

    <pandas.core.groupby.generic.DataFrameGroupBy object at 0x000001F4DCD07800>

```python
planets.groupby('method')['orbital_period']
```

    <pandas.core.groupby.generic.SeriesGroupBy object at 0x000001F4DD0A0350>

```python
planets.groupby('method')['orbital_period'].median()
```

    method
    Astrometry                         631.180000
    Eclipse Timing Variations         4343.500000
    Imaging                          27500.000000
    Microlensing                      3300.000000
    Orbital Brightness Modulation        0.342887
    Pulsar Timing                       66.541900
    Pulsation Timing Variations       1170.000000
    Radial Velocity                    360.200000
    Transit                              5.714932
    Transit Timing Variations           57.011000
    Name: orbital_period, dtype: float64

#### Iteration over groups

GroupBy 객체는 그룹을 직접 순회할 수 있도록 지원하며, 각 그룹을 Series나 DataFrame으로 리턴

```python
for (method, group) in planets.groupby('method'):
    print("{0:30s} shape={1}".format(method, group.shape))
```

    Astrometry                     shape=(2, 6)
    Eclipse Timing Variations      shape=(9, 6)
    Imaging                        shape=(38, 6)
    Microlensing                   shape=(23, 6)
    Orbital Brightness Modulation  shape=(3, 6)
    Pulsar Timing                  shape=(5, 6)
    Pulsation Timing Variations    shape=(1, 6)
    Radial Velocity                shape=(553, 6)
    Transit                        shape=(397, 6)
    Transit Timing Variations      shape=(4, 6)

#### Dispatch methods

GroupBy 객체가 명시적으로 구현하지 않은 메서드는 객체에 상관없이 일부 파이썬 클래스 매직을 통해 그 그룹에 전달되고 호출  
Dispatch methods는 각 개별 그룹에 적용되고 그 결과는 GroupBy 내에서 결합돼 리턴

```python
planets.groupby('method')['year'].describe().unstack()
```

           method                       
    count  Astrometry                          2.0
           Eclipse Timing Variations           9.0
           Imaging                            38.0
           Microlensing                       23.0
           Orbital Brightness Modulation       3.0
                                             ...  
    max    Pulsar Timing                    2011.0
           Pulsation Timing Variations      2007.0
           Radial Velocity                  2014.0
           Transit                          2014.0
           Transit Timing Variations        2014.0
    Length: 80, dtype: float64

### 집계, 필터, 변환, 적용 Aggregate, filter, transform, apply

```python
rng = np.random.RandomState(0)
df = pd.DataFrame({'key': ['A', 'B', 'C', 'A', 'B', 'C'],
                   'data1': range(6),
                   'data2': rng.randint(0, 10, 6)},
                  columns=['key', 'data1', 'data2'])
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
      <th>key</th>
      <th>data1</th>
      <th>data2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>A</td>
      <td>0</td>
      <td>5</td>
    </tr>
    <tr>
      <th>1</th>
      <td>B</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>C</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>A</td>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>B</td>
      <td>4</td>
      <td>7</td>
    </tr>
    <tr>
      <th>5</th>
      <td>C</td>
      <td>5</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
</div>

#### Aggregation

```python
# 문자열, 함수, 리스트 등을 취해 한 번에 모든 집계를 계산
df.groupby('key').aggregate(['min', 'median', 'max'])
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
      <th colspan="3" halign="left">data1</th>
      <th colspan="3" halign="left">data2</th>
    </tr>
    <tr>
      <th></th>
      <th>min</th>
      <th>median</th>
      <th>max</th>
      <th>min</th>
      <th>median</th>
      <th>max</th>
    </tr>
    <tr>
      <th>key</th>
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
      <th>A</th>
      <td>0</td>
      <td>1.5</td>
      <td>3</td>
      <td>3</td>
      <td>4.0</td>
      <td>5</td>
    </tr>
    <tr>
      <th>B</th>
      <td>1</td>
      <td>2.5</td>
      <td>4</td>
      <td>0</td>
      <td>3.5</td>
      <td>7</td>
    </tr>
    <tr>
      <th>C</th>
      <td>2</td>
      <td>3.5</td>
      <td>5</td>
      <td>3</td>
      <td>6.0</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 열 이름을 해당 열에 적용될 연산에 매핑하는 딕셔너리 전달
df.groupby('key').aggregate({'data1': 'min', 'data2': 'max'})
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
      <th>data1</th>
      <th>data2</th>
    </tr>
    <tr>
      <th>key</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>A</th>
      <td>0</td>
      <td>5</td>
    </tr>
    <tr>
      <th>B</th>
      <td>1</td>
      <td>7</td>
    </tr>
    <tr>
      <th>C</th>
      <td>2</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
</div>

#### Filtering

filter() 함수는 그룹이 필터링을 통과하는지 아닌지를 지정하는 부울 값을 리턴

```python
# 그룹 속성을 기준으로 데이터를 걸러냄
def filter_func(x):
    return x['data2'].std() > 4


display('df', "df.groupby('key').std()", "df.groupby('key').filter(filter_func)")
```

<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>df</p><div>
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
      <th>key</th>
      <th>data1</th>
      <th>data2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>A</td>
      <td>0</td>
      <td>5</td>
    </tr>
    <tr>
      <th>1</th>
      <td>B</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>C</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>A</td>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>B</td>
      <td>4</td>
      <td>7</td>
    </tr>
    <tr>
      <th>5</th>
      <td>C</td>
      <td>5</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
</div>
    </div>
<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>df.groupby('key').std()</p><div>
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
      <th>data1</th>
      <th>data2</th>
    </tr>
    <tr>
      <th>key</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>A</th>
      <td>2.12132</td>
      <td>1.414214</td>
    </tr>
    <tr>
      <th>B</th>
      <td>2.12132</td>
      <td>4.949747</td>
    </tr>
    <tr>
      <th>C</th>
      <td>2.12132</td>
      <td>4.242641</td>
    </tr>
  </tbody>
</table>
</div>
    </div>
<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>df.groupby('key').filter(filter_func)</p><div>
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
      <th>key</th>
      <th>data1</th>
      <th>data2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>B</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>C</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>B</td>
      <td>4</td>
      <td>7</td>
    </tr>
    <tr>
      <th>5</th>
      <td>C</td>
      <td>5</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
</div>
    </div>

#### Transformation

```python
# 재결합을 위해 전체 데이터의 변환된 버전을 반환 --> 결과는 입력과 같은 형상
df.groupby('key').transform(lambda x: x - x.mean())
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
      <th>data1</th>
      <th>data2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-1.5</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-1.5</td>
      <td>-3.5</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-1.5</td>
      <td>-3.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1.5</td>
      <td>-1.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1.5</td>
      <td>3.5</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1.5</td>
      <td>3.0</td>
    </tr>
  </tbody>
</table>
</div>

#### The apply() method

임의의 함수를 그룹 결과에 적용할 때 사용  
DataFrame을 취해 Pandas 객체나 스칼라를 반환  
결합 연산은 반환된 출력값 유형에 따라 조정

```python
# 첫 번째 열을 두 번째 열의 합계로 정규화
def norm_by_data2(x):
    # x is a DataFrame of group values
    x['data1'] /= x['data2'].sum()
    return x


display('df', "df.groupby('key').apply(norm_by_data2, include_groups=False)")
```

<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>df</p><div>
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
      <th>key</th>
      <th>data1</th>
      <th>data2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>A</td>
      <td>0</td>
      <td>5</td>
    </tr>
    <tr>
      <th>1</th>
      <td>B</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>C</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>A</td>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>B</td>
      <td>4</td>
      <td>7</td>
    </tr>
    <tr>
      <th>5</th>
      <td>C</td>
      <td>5</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
</div>
    </div>
<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>df.groupby('key').apply(norm_by_data2, include_groups=False)</p><div>
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
    <tr>
      <th>key</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">A</th>
      <th>0</th>
      <td>0.000000</td>
      <td>5</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.375000</td>
      <td>3</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">B</th>
      <th>1</th>
      <td>0.142857</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.571429</td>
      <td>7</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">C</th>
      <th>2</th>
      <td>0.166667</td>
      <td>3</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0.416667</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
</div>
    </div>

### 분할 키 지정 Specifying the split key

#### 분할 키를 제공하는 리스트, 배열, 시리즈, 인덱스 A list, array, series, or index providing the grouping keys

```python
L = [0, 1, 0, 1, 2, 0]
display('df', 'df.groupby(L).sum()', "df.groupby(df['key']).sum()")
```

<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>df</p><div>
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
      <th>key</th>
      <th>data1</th>
      <th>data2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>A</td>
      <td>0</td>
      <td>5</td>
    </tr>
    <tr>
      <th>1</th>
      <td>B</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>C</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>A</td>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <th>4</th>
      <td>B</td>
      <td>4</td>
      <td>7</td>
    </tr>
    <tr>
      <th>5</th>
      <td>C</td>
      <td>5</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
</div>
    </div>
<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>df.groupby(L).sum()</p><div>
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
      <th>key</th>
      <th>data1</th>
      <th>data2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>ACC</td>
      <td>7</td>
      <td>17</td>
    </tr>
    <tr>
      <th>1</th>
      <td>BA</td>
      <td>4</td>
      <td>3</td>
    </tr>
    <tr>
      <th>2</th>
      <td>B</td>
      <td>4</td>
      <td>7</td>
    </tr>
  </tbody>
</table>
</div>
    </div>
<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>df.groupby(df['key']).sum()</p><div>
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
      <th>data1</th>
      <th>data2</th>
    </tr>
    <tr>
      <th>key</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>A</th>
      <td>3</td>
      <td>8</td>
    </tr>
    <tr>
      <th>B</th>
      <td>5</td>
      <td>7</td>
    </tr>
    <tr>
      <th>C</th>
      <td>7</td>
      <td>12</td>
    </tr>
  </tbody>
</table>
</div>
    </div>

#### 인덱스를 그룹에 매핑한 딕셔너리나 시리즈 A dictionary or series mapping index to group

```python
df2 = df.set_index('key')
mapping = {'A': 'vowel', 'B': 'consonant', 'C': 'consonant'}
display('df2', 'df2.groupby(mapping).sum()')
```

<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>df2</p><div>
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
      <th>data1</th>
      <th>data2</th>
    </tr>
    <tr>
      <th>key</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>A</th>
      <td>0</td>
      <td>5</td>
    </tr>
    <tr>
      <th>B</th>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>C</th>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>A</th>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <th>B</th>
      <td>4</td>
      <td>7</td>
    </tr>
    <tr>
      <th>C</th>
      <td>5</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
</div>
    </div>
<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>df2.groupby(mapping).sum()</p><div>
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
      <th>data1</th>
      <th>data2</th>
    </tr>
    <tr>
      <th>key</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>consonant</th>
      <td>12</td>
      <td>19</td>
    </tr>
    <tr>
      <th>vowel</th>
      <td>3</td>
      <td>8</td>
    </tr>
  </tbody>
</table>
</div>
    </div>

#### Any Python function

```python
display('df2', 'df2.groupby(str.lower).mean()')
```

<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>df2</p><div>
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
      <th>data1</th>
      <th>data2</th>
    </tr>
    <tr>
      <th>key</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>A</th>
      <td>0</td>
      <td>5</td>
    </tr>
    <tr>
      <th>B</th>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>C</th>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>A</th>
      <td>3</td>
      <td>3</td>
    </tr>
    <tr>
      <th>B</th>
      <td>4</td>
      <td>7</td>
    </tr>
    <tr>
      <th>C</th>
      <td>5</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
</div>
    </div>
<div style="float: left; padding: 10px;">
    <p style='font-family:"Courier New", Courier, monospace'>df2.groupby(str.lower).mean()</p><div>
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
      <th>data1</th>
      <th>data2</th>
    </tr>
    <tr>
      <th>key</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a</th>
      <td>1.5</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>b</th>
      <td>2.5</td>
      <td>3.5</td>
    </tr>
    <tr>
      <th>c</th>
      <td>3.5</td>
      <td>6.0</td>
    </tr>
  </tbody>
</table>
</div>
    </div>

#### A list of valid keys

```python
df2.groupby([str.lower, mapping]).mean()
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
    <tr>
      <th>key</th>
      <th>key</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>a</th>
      <th>vowel</th>
      <td>1.5</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>b</th>
      <th>consonant</th>
      <td>2.5</td>
      <td>3.5</td>
    </tr>
    <tr>
      <th>c</th>
      <th>consonant</th>
      <td>3.5</td>
      <td>6.0</td>
    </tr>
  </tbody>
</table>
</div>

### Grouping example

```python
decade = 10 * (planets['year'] // 10)
decade = decade.astype(str) + 's'
decade.name = 'decade'
planets.groupby(['method', decade])['number'].sum().unstack().fillna(0)
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
      <th>decade</th>
      <th>1980s</th>
      <th>1990s</th>
      <th>2000s</th>
      <th>2010s</th>
    </tr>
    <tr>
      <th>method</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Astrometry</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>Eclipse Timing Variations</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>5.0</td>
      <td>10.0</td>
    </tr>
    <tr>
      <th>Imaging</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>29.0</td>
      <td>21.0</td>
    </tr>
    <tr>
      <th>Microlensing</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>12.0</td>
      <td>15.0</td>
    </tr>
    <tr>
      <th>Orbital Brightness Modulation</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>Pulsar Timing</th>
      <td>0.0</td>
      <td>9.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>Pulsation Timing Variations</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>Radial Velocity</th>
      <td>1.0</td>
      <td>52.0</td>
      <td>475.0</td>
      <td>424.0</td>
    </tr>
    <tr>
      <th>Transit</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>64.0</td>
      <td>712.0</td>
    </tr>
    <tr>
      <th>Transit Timing Variations</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>9.0</td>
    </tr>
  </tbody>
</table>
</div>


