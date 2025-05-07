---
title: Visualization_With_Seaborn
date: 2024-05-14
categories: [ Python Data Science ]
tags: [ Matplotlib ]
layout: post
---

# Visualization_With_Seaborn

```python
import matplotlib.pyplot as plt
%matplotlib
inline
import seaborn as sns
import numpy as np
import pandas as pd
```

```python
sns.set()  # 차트 스타일을 설정하는 seaborn 메서드
```

## Exploring Seaborn Plots

seaborn의 주 목적은 통계 데이터 탐색과 몇 가지 통계 모델 적합에 유용한 다양한 플롯 유형을 생성할 수 있도록 고차원 명령어를 제공하는 것

### Histograms, KDE, and densities

```python
data = np.random.multivariate_normal([0, 0], [[5, 2], [2, 2]], size=2000)
data = pd.DataFrame(data, columns=['x', 'y'])
# 데이터 클리닝: 무한 값 대체
data.replace([np.inf, -np.inf], np.nan, inplace=True)
data.dropna(inplace=True)

# 분포를 시각화하기 위한 히스토그램
for col in 'xy':
    plt.hist(data[col], density=True, alpha=0.5)
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_6_0.png)

```python
# 분포 시각화를 위한 커널 밀도 추정치
sns.kdeplot(data=data, fill=True);
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_7_0.png)

```python
# 2차원 커널 밀도 그래프
sns.kdeplot(data, x='x', y='y');
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_8_0.png)

```python
# 결합분포와 한계분포
with sns.axes_style('white'):
    sns.jointplot(data=data, x="x", y="y", kind='kde');
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_9_0.png)

```python
# 육각형 기반
with sns.axes_style('white'):
    sns.jointplot(data=data, x="x", y="y", kind='hex');
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_10_0.png)

### Pair plots

```python
iris = sns.load_dataset("iris")
iris.head()
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
      <th>sepal_length</th>
      <th>sepal_width</th>
      <th>petal_length</th>
      <th>petal_width</th>
      <th>species</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5.1</td>
      <td>3.5</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4.9</td>
      <td>3.0</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4.7</td>
      <td>3.2</td>
      <td>1.3</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4.6</td>
      <td>3.1</td>
      <td>1.5</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5.0</td>
      <td>3.6</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 표번 사이 다차원 관계 시각화
sns.pairplot(iris, hue='species', height=2.5);
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_13_0.png)

### Faceted histograms

```python
tips = sns.load_dataset('tips')
tips.head()
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
      <th>total_bill</th>
      <th>tip</th>
      <th>sex</th>
      <th>smoker</th>
      <th>day</th>
      <th>time</th>
      <th>size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>16.99</td>
      <td>1.01</td>
      <td>Female</td>
      <td>No</td>
      <td>Sun</td>
      <td>Dinner</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>10.34</td>
      <td>1.66</td>
      <td>Male</td>
      <td>No</td>
      <td>Sun</td>
      <td>Dinner</td>
      <td>3</td>
    </tr>
    <tr>
      <th>2</th>
      <td>21.01</td>
      <td>3.50</td>
      <td>Male</td>
      <td>No</td>
      <td>Sun</td>
      <td>Dinner</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>23.68</td>
      <td>3.31</td>
      <td>Male</td>
      <td>No</td>
      <td>Sun</td>
      <td>Dinner</td>
      <td>2</td>
    </tr>
    <tr>
      <th>4</th>
      <td>24.59</td>
      <td>3.61</td>
      <td>Female</td>
      <td>No</td>
      <td>Sun</td>
      <td>Dinner</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
</div>

```python
tips['tip_pct'] = 100 * tips['tip'] / tips['total_bill']

grid = sns.FacetGrid(tips, row="sex", col="time", margin_titles=True)
grid.map(plt.hist, "tip_pct", bins=np.linspace(0, 40, 15));
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_16_0.png)

### 범주형 플롯 catplots

```python
with sns.axes_style(style='ticks'):
    g = sns.catplot(x="day", y="total_bill", hue="sex", data=tips, kind="box")
    g.set_axis_labels("Day", "Total Bill");
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_18_0.png)

### Joint distributions

```python
# 결합 분포 플롯
with sns.axes_style('white'):
    sns.jointplot(x="total_bill", y="tip", data=tips, kind='hex')
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_20_0.png)

```python
# 자동 커널 밀도 추정과 회귀 분석 수행
sns.jointplot(x="total_bill", y="tip", data=tips, kind='reg');
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_21_0.png)

### Bar plots

```python
planets = sns.load_dataset('planets')
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

```python
# 요인 플롯의 특별한 경우로 사용된 히스토그램
with sns.axes_style('white'):
    g = sns.catplot(x="year", data=planets, aspect=2,
                    kind="count", color='steelblue')
    g.set_xticklabels(step=5)
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_24_0.png)

```python
# 연도 및 유형별로 발견된 행성 수
with sns.axes_style('white'):
    g = sns.catplot(x="year", data=planets, aspect=4.0, kind='count',
                    hue='method', order=range(2001, 2015))
    g.set_ylabels('Number of Planets Discovered')
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_25_0.png)

## Example: Exploring Marathon Finishing Times

```python
data = pd.read_csv('./marathon-data.csv')
data.head()
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
      <th>age</th>
      <th>gender</th>
      <th>split</th>
      <th>final</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>33</td>
      <td>M</td>
      <td>01:05:38</td>
      <td>02:08:51</td>
    </tr>
    <tr>
      <th>1</th>
      <td>32</td>
      <td>M</td>
      <td>01:06:26</td>
      <td>02:09:28</td>
    </tr>
    <tr>
      <th>2</th>
      <td>31</td>
      <td>M</td>
      <td>01:06:49</td>
      <td>02:10:42</td>
    </tr>
    <tr>
      <th>3</th>
      <td>38</td>
      <td>M</td>
      <td>01:06:16</td>
      <td>02:13:45</td>
    </tr>
    <tr>
      <th>4</th>
      <td>31</td>
      <td>M</td>
      <td>01:06:32</td>
      <td>02:13:59</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 기본적으로 Pandas는 시간 열을 파이썬 문자열로 적재
data.dtypes
```

    age        int64
    gender    object
    split     object
    final     object
    dtype: object

```python
import datetime


def convert_time(s):
    h, m, s = map(int, s.split(':'))
    return datetime.timedelta(hours=h, minutes=m, seconds=s)


data = pd.read_csv('./marathon-data.csv',
                   converters={'split': convert_time, 'final': convert_time})
data.head()
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
      <th>age</th>
      <th>gender</th>
      <th>split</th>
      <th>final</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>33</td>
      <td>M</td>
      <td>0 days 01:05:38</td>
      <td>0 days 02:08:51</td>
    </tr>
    <tr>
      <th>1</th>
      <td>32</td>
      <td>M</td>
      <td>0 days 01:06:26</td>
      <td>0 days 02:09:28</td>
    </tr>
    <tr>
      <th>2</th>
      <td>31</td>
      <td>M</td>
      <td>0 days 01:06:49</td>
      <td>0 days 02:10:42</td>
    </tr>
    <tr>
      <th>3</th>
      <td>38</td>
      <td>M</td>
      <td>0 days 01:06:16</td>
      <td>0 days 02:13:45</td>
    </tr>
    <tr>
      <th>4</th>
      <td>31</td>
      <td>M</td>
      <td>0 days 01:06:32</td>
      <td>0 days 02:13:59</td>
    </tr>
  </tbody>
</table>
</div>

```python
data.dtypes
```

    age                 int64
    gender             object
    split     timedelta64[ns]
    final     timedelta64[ns]
    dtype: object

```python
# Seaborn 플로팅을 목적으로 시간을 초로 제공하는 열 추가
data['split_sec'] = data['split'].dt.total_seconds()
data['final_sec'] = data['final'].dt.total_seconds()
data.head()
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
      <th>age</th>
      <th>gender</th>
      <th>split</th>
      <th>final</th>
      <th>split_sec</th>
      <th>final_sec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>33</td>
      <td>M</td>
      <td>0 days 01:05:38</td>
      <td>0 days 02:08:51</td>
      <td>3938.0</td>
      <td>7731.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>32</td>
      <td>M</td>
      <td>0 days 01:06:26</td>
      <td>0 days 02:09:28</td>
      <td>3986.0</td>
      <td>7768.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>31</td>
      <td>M</td>
      <td>0 days 01:06:49</td>
      <td>0 days 02:10:42</td>
      <td>4009.0</td>
      <td>7842.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>38</td>
      <td>M</td>
      <td>0 days 01:06:16</td>
      <td>0 days 02:13:45</td>
      <td>3976.0</td>
      <td>8025.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>31</td>
      <td>M</td>
      <td>0 days 01:06:32</td>
      <td>0 days 02:13:59</td>
      <td>3992.0</td>
      <td>8039.0</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 데이터 확인을 위한 플로팅
with sns.axes_style('white'):
    g = sns.jointplot(x="split_sec", y="final_sec", data=data, kind='hex')
    g.ax_joint.plot(np.linspace(4000, 16000),
                    np.linspace(8000, 32000), ':k')
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_32_0.png)

```python
# 주자가 네거티브 스플릿 주자인지 포지티브 스플릿 주자인지 정도를 측정하는 열
data['split_frac'] = 1 - 2 * data['split_sec'] / data['final_sec']
data.head()
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
      <th>age</th>
      <th>gender</th>
      <th>split</th>
      <th>final</th>
      <th>split_sec</th>
      <th>final_sec</th>
      <th>split_frac</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>33</td>
      <td>M</td>
      <td>0 days 01:05:38</td>
      <td>0 days 02:08:51</td>
      <td>3938.0</td>
      <td>7731.0</td>
      <td>-0.018756</td>
    </tr>
    <tr>
      <th>1</th>
      <td>32</td>
      <td>M</td>
      <td>0 days 01:06:26</td>
      <td>0 days 02:09:28</td>
      <td>3986.0</td>
      <td>7768.0</td>
      <td>-0.026262</td>
    </tr>
    <tr>
      <th>2</th>
      <td>31</td>
      <td>M</td>
      <td>0 days 01:06:49</td>
      <td>0 days 02:10:42</td>
      <td>4009.0</td>
      <td>7842.0</td>
      <td>-0.022443</td>
    </tr>
    <tr>
      <th>3</th>
      <td>38</td>
      <td>M</td>
      <td>0 days 01:06:16</td>
      <td>0 days 02:13:45</td>
      <td>3976.0</td>
      <td>8025.0</td>
      <td>0.009097</td>
    </tr>
    <tr>
      <th>4</th>
      <td>31</td>
      <td>M</td>
      <td>0 days 01:06:32</td>
      <td>0 days 02:13:59</td>
      <td>3992.0</td>
      <td>8039.0</td>
      <td>0.006842</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 만든 열을 통한 분포도
sns.histplot(data['split_frac'], kde=False);
plt.axvline(0, color="k", linestyle="--");
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_34_0.png)

```python
# 네거티브 스플릿 수
sum(data.split_frac < 0)
```

    251

```python
# 스플릿 정도와 다른 변수들 사이에 상관관계 확인
g = sns.PairGrid(data, vars=['age', 'split_sec', 'final_sec', 'split_frac'],
                 hue='gender', palette='RdBu_r')
g.map(plt.scatter, alpha=0.8)
g.add_legend();
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_36_0.png)

```python
# 남성과 여성 사이 차이
sns.kdeplot(data.split_frac[data.gender == 'M'], label='men', fill=True)
sns.kdeplot(data.split_frac[data.gender == 'W'], label='women', fill=True)
plt.xlabel('split_frac');
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_37_0.png)

```python
# 나이의 함수로 분포 비교
sns.violinplot(x="gender", y="split_frac", data=data, hue="gender",
               palette=["lightblue", "lightpink"], legend=False);
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_38_0.png)

```python
data['age_dec'] = data.age.map(lambda age: 10 * (age // 10))
data.head()
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
      <th>age</th>
      <th>gender</th>
      <th>split</th>
      <th>final</th>
      <th>split_sec</th>
      <th>final_sec</th>
      <th>split_frac</th>
      <th>age_dec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>33</td>
      <td>M</td>
      <td>0 days 01:05:38</td>
      <td>0 days 02:08:51</td>
      <td>3938.0</td>
      <td>7731.0</td>
      <td>-0.018756</td>
      <td>30</td>
    </tr>
    <tr>
      <th>1</th>
      <td>32</td>
      <td>M</td>
      <td>0 days 01:06:26</td>
      <td>0 days 02:09:28</td>
      <td>3986.0</td>
      <td>7768.0</td>
      <td>-0.026262</td>
      <td>30</td>
    </tr>
    <tr>
      <th>2</th>
      <td>31</td>
      <td>M</td>
      <td>0 days 01:06:49</td>
      <td>0 days 02:10:42</td>
      <td>4009.0</td>
      <td>7842.0</td>
      <td>-0.022443</td>
      <td>30</td>
    </tr>
    <tr>
      <th>3</th>
      <td>38</td>
      <td>M</td>
      <td>0 days 01:06:16</td>
      <td>0 days 02:13:45</td>
      <td>3976.0</td>
      <td>8025.0</td>
      <td>0.009097</td>
      <td>30</td>
    </tr>
    <tr>
      <th>4</th>
      <td>31</td>
      <td>M</td>
      <td>0 days 01:06:32</td>
      <td>0 days 02:13:59</td>
      <td>3992.0</td>
      <td>8039.0</td>
      <td>0.006842</td>
      <td>30</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 나이 함수로 바이올린 플롯 비교
men = (data.gender == 'M')
women = (data.gender == 'W')

with sns.axes_style(style=None):
    sns.violinplot(x="age_dec", y="split_frac", hue="gender", data=data,
                   split=True, inner="quartile",
                   palette=["lightpink", "lightblue"]);
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_40_0.png)

```python
# 데이터 표본이 작아 80대 이상 여성의 능력치 이상
(data.age > 80).sum()
```

    7

```python
# 데이터에 선형 회귀 모형 자동 적합
g = sns.lmplot(x='final_sec', y='split_frac', col='gender', data=data,
               markers=".", scatter_kws=dict(color='c'))
g.map(plt.axhline, y=0.1, color="k", ls=":");
```

![png](assets/img/Visualization_With_Seaborn_files/Visualization_With_Seaborn_42_0.png)
    

