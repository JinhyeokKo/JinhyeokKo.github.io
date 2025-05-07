---
title: Working_With_Time_Series
date: 2024-05-02
categories: [ Python Data Science ]
tags: [ Pandas ]
layout: post
---

# 시계열 다루기 Working_With_Time_Series

`타임 스탬프` : 특정 시점을 말함  
`시간 간격` : 특정 시작점과 종료점 사이의 시간의 길이  
`기간` : 일반적으로 각 간격이 일정하고 서로 곂치지 않는 특별한 경우의 시간 간격  
`시간 델타`, `지속 기간` : 정확한 시간 길이

## Dates and Times in Python

### Native Python dates and times: datetime and dateutil

```python
from datetime import datetime

# 날짜를 직접 구성
datetime(year=2015, month=7, day=4)
```

    datetime.datetime(2015, 7, 4, 0, 0)

```python
from dateutil import parser

# 다양한 문자열 형태로부터 날짜를 해석
date = parser.parse("4th of July, 2015")
date
```

    datetime.datetime(2015, 7, 4, 0, 0)

```python
# 요일을 출력
date.strftime('%A')
```

    'Saturday'

### Typed arrays of times: NumPy's datetime64

```python
import numpy as np

# datetime64 dtype은 날짜를 64비트 정수로 인코딩
date = np.array('2015-07-04', dtype=np.datetime64)
date
```

    array('2015-07-04', dtype='datetime64[D]')

```python
# 벡터화 연산 가능
date + np.arange(12)
```

    array(['2015-07-04', '2015-07-05', '2015-07-06', '2015-07-07',
           '2015-07-08', '2015-07-09', '2015-07-10', '2015-07-11',
           '2015-07-12', '2015-07-13', '2015-07-14', '2015-07-15'],
          dtype='datetime64[D]')

```python
# 하루 단위
np.datetime64('2015-07-04')
```

    numpy.datetime64('2015-07-04')

```python
# 분 단위
np.datetime64('2015-07-04 12:00')
```

    numpy.datetime64('2015-07-04T12:00')

```python
# 시간 단위 --> 나노초
np.datetime64('2015-07-04 12:59:59.50', 'ns')
```

    numpy.datetime64('2015-07-04T12:59:59.500000000')

#### 날짜와 시간 코드

| Code   | Meaning     | Time span (relative) | Time span (absolute)   |
|--------|-------------|----------------------|------------------------|
| ``Y``  | Year	       | ± 9.2e18 years       | [9.2e18 BC, 9.2e18 AD] |
| ``M``  | Month       | ± 7.6e17 years       | [7.6e17 BC, 7.6e17 AD] |
| ``W``  | Week	       | ± 1.7e17 years       | [1.7e17 BC, 1.7e17 AD] |
| ``D``  | Day         | ± 2.5e16 years       | [2.5e16 BC, 2.5e16 AD] |
| ``h``  | Hour        | ± 1.0e15 years       | [1.0e15 BC, 1.0e15 AD] |
| ``m``  | Minute      | ± 1.7e13 years       | [1.7e13 BC, 1.7e13 AD] |
| ``s``  | Second      | ± 2.9e12 years       | [ 2.9e9 BC, 2.9e9 AD]  |
| ``ms`` | Millisecond | ± 2.9e9 years        | [ 2.9e6 BC, 2.9e6 AD]  |
| ``us`` | Microsecond | ± 2.9e6 years        | [290301 BC, 294241 AD] |
| ``ns`` | Nanosecond  | ± 292 years          | [ 1678 AD, 2262 AD]    |
| ``ps`` | Picosecond  | ± 106 days           | [ 1969 AD, 1970 AD]    |
| ``fs`` | Femtosecond | ± 2.6 hours          | [ 1969 AD, 1970 AD]    |
| ``as`` | Attosecond  | ± 9.2 seconds        | [ 1969 AD, 1970 AD]    |

### Dates and times in pandas: best of both worlds

```python
import pandas as pd

date = pd.to_datetime("4th of July, 2015")
date
```

    Timestamp('2015-07-04 00:00:00')

```python
date.strftime('%A')
```

    'Saturday'

```python
# NumPy 스타일 벡터화 연산
date + pd.to_timedelta(np.arange(12), 'D')
```

    DatetimeIndex(['2015-07-04', '2015-07-05', '2015-07-06', '2015-07-07',
                   '2015-07-08', '2015-07-09', '2015-07-10', '2015-07-11',
                   '2015-07-12', '2015-07-13', '2015-07-14', '2015-07-15'],
                  dtype='datetime64[ns]', freq=None)

## Pandas Time Series: Indexing by Time

```python
# 시간 인덱스를 가진 데이터의 Series 객체 구성
index = pd.DatetimeIndex(['2014-07-04', '2014-08-04',
                          '2015-07-04', '2015-08-04'])
data = pd.Series([0, 1, 2, 3], index=index)
data
```

    2014-07-04    0
    2014-08-04    1
    2015-07-04    2
    2015-08-04    3
    dtype: int64

```python
# Series 인덱싱 패턴
data['2014-07-04':'2015-07-04']
```

    2014-07-04    0
    2014-08-04    1
    2015-07-04    2
    dtype: int64

```python
# 인덱싱 연산
data['2015']
```

    2015-07-04    2
    2015-08-04    3
    dtype: int64

## Pandas Time Series Data Structures

`타임스탬프` : numpy.datetime64 데이터 타입 기반 --> 관련 인덱스 구조 : DatetimeIndex  
`기간(time period)` : numpy.datetime64 기반, 고정 주파수 간격을 인코딩 --> 관련 인덱스 구조 : PeriodIndex  
`시간 델타`, `지속 기간` : datetime.timedelta 타입의 효율적 대체 타입, numpy.timedelta64 기반 --> 관련 인덱스 구조 : TimedeltaIndex

```python
# 단일 날짜를 pd.to_datetime()에 전달하면 TimeStamp 생성하고, 일련의 날짜를 전달하면 DatetimeIndex를 생성
dates = pd.to_datetime([datetime(2015, 7, 3), '4th of July, 2015',
                        '2015-Jul-6', '07-07-2015', '20150708'])
dates
```

    DatetimeIndex(['2015-07-03', '2015-07-04', '2015-07-06', '2015-07-07',
                   '2015-07-08'],
                  dtype='datetime64[ns]', freq=None)

```python
# 주기(frequency) 코드를 추가해 PeriodIndex로 전환
dates.to_period('D')
```

    PeriodIndex(['2015-07-03', '2015-07-04', '2015-07-06', '2015-07-07',
                 '2015-07-08'],
                dtype='period[D]')

```python
# TimedeltaIndex 생성
dates - dates[0]
```

    TimedeltaIndex(['0 days', '1 days', '3 days', '4 days', '5 days'], dtype='timedelta64[ns]', freq=None)

## Regular sequences: pd.date_range()

```python
# 시작일, 종료일, 선택적 주기 코드를 받아 정규 날짜 시퀀스 생성
pd.date_range('2015-07-03', '2015-07-10')
```

    DatetimeIndex(['2015-07-03', '2015-07-04', '2015-07-05', '2015-07-06',
                   '2015-07-07', '2015-07-08', '2015-07-09', '2015-07-10'],
                  dtype='datetime64[ns]', freq='D')

```python
# 시작점과 기간의 수로 지정
pd.date_range('2015-07-03', periods=8)
```

    DatetimeIndex(['2015-07-03', '2015-07-04', '2015-07-05', '2015-07-06',
                   '2015-07-07', '2015-07-08', '2015-07-09', '2015-07-10'],
                  dtype='datetime64[ns]', freq='D')

```python
# freq 인수를 바꿔 간격을 조정
pd.date_range('2015-07-03', periods=8, freq='h')
```

    DatetimeIndex(['2015-07-03 00:00:00', '2015-07-03 01:00:00',
                   '2015-07-03 02:00:00', '2015-07-03 03:00:00',
                   '2015-07-03 04:00:00', '2015-07-03 05:00:00',
                   '2015-07-03 06:00:00', '2015-07-03 07:00:00'],
                  dtype='datetime64[ns]', freq='h')

```python
# 기간이나 타임 델타값의 정규 시퀀스 생성
pd.period_range('2015-07', periods=8, freq='M')
```

    PeriodIndex(['2015-07', '2015-08', '2015-09', '2015-10', '2015-11', '2015-12',
                 '2016-01', '2016-02'],
                dtype='period[M]')

```python
# 시간단위로 증가하는 기간의 시퀀스 생성
pd.timedelta_range(0, periods=10, freq='h')
```

    TimedeltaIndex(['0 days 00:00:00', '0 days 01:00:00', '0 days 02:00:00',
                    '0 days 03:00:00', '0 days 04:00:00', '0 days 05:00:00',
                    '0 days 06:00:00', '0 days 07:00:00', '0 days 08:00:00',
                    '0 days 09:00:00'],
                   dtype='timedelta64[ns]', freq='h')

## Frequencies and Offsets

### Pandas 주기 코드

| Code    | Description  | Code   | Description          |
|---------|--------------|--------|----------------------|
| ``D``   | Calendar day | ``B``  | Business day         |
| ``W``   | Weekly       |        |                      |
| ``M``   | Month end    | ``BM`` | Business month end   |
| ``Q``   | Quarter end  | ``BQ`` | Business quarter end |
| ``A``   | Year end     | ``BA`` | Business year end    |
| ``h``   | Hours        | ``BH`` | Business hours       |
| ``min`` | Minutes      |        |                      |
| ``s``   | Seconds      |        |                      |
| ``ms``  | Milliseonds  |        |                      |
| ``us``  | Microseconds |        |                      |
| ``ns``  | nanoseconds  |        |                      |

### 주기 코드의 시작 시점을 표시하는 목록

| Code   | Description   | | Code    | Description            |
|--------|---------------|-|---------|------------------------|
| ``MS`` | Month start   | | ``BMS`` | Business month start   |
| ``QS`` | Quarter start | | ``BQS`` | Business quarter start |
| ``AS`` | Year start    | | ``BAS`` | Business year start    |

```python
# 코드를 숫자와 결합해 주기 지정
pd.timedelta_range(0, periods=9, freq="2h30min")
```

    TimedeltaIndex(['0 days 00:00:00', '0 days 02:30:00', '0 days 05:00:00',
                    '0 days 07:30:00', '0 days 10:00:00', '0 days 12:30:00',
                    '0 days 15:00:00', '0 days 17:30:00', '0 days 20:00:00'],
                   dtype='timedelta64[ns]', freq='150min')

```python
from pandas.tseries.offsets import BDay

# 영업일 오프셋 만들기
pd.date_range('2015-07-01', periods=5, freq=BDay())
```

    DatetimeIndex(['2015-07-01', '2015-07-02', '2015-07-03', '2015-07-06',
                   '2015-07-07'],
                  dtype='datetime64[ns]', freq='B')

## Resampling, Shifting, and Windowing

```python
from pandas_datareader import data
import yfinance as yf

yf.pdr_override()
sp500 = data.DataReader('^GSPC', start='2018-01-01', end='2021-12-31')

sp500.head()
```

    [*********************100%%**********************]  1 of 1 completed

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
      <th>Open</th>
      <th>High</th>
      <th>Low</th>
      <th>Close</th>
      <th>Adj Close</th>
      <th>Volume</th>
    </tr>
    <tr>
      <th>Date</th>
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
      <th>2018-01-02</th>
      <td>2683.729980</td>
      <td>2695.889893</td>
      <td>2682.360107</td>
      <td>2695.810059</td>
      <td>2695.810059</td>
      <td>3397430000</td>
    </tr>
    <tr>
      <th>2018-01-03</th>
      <td>2697.850098</td>
      <td>2714.370117</td>
      <td>2697.770020</td>
      <td>2713.060059</td>
      <td>2713.060059</td>
      <td>3544030000</td>
    </tr>
    <tr>
      <th>2018-01-04</th>
      <td>2719.310059</td>
      <td>2729.290039</td>
      <td>2719.070068</td>
      <td>2723.989990</td>
      <td>2723.989990</td>
      <td>3697340000</td>
    </tr>
    <tr>
      <th>2018-01-05</th>
      <td>2731.330078</td>
      <td>2743.449951</td>
      <td>2727.919922</td>
      <td>2743.149902</td>
      <td>2743.149902</td>
      <td>3239280000</td>
    </tr>
    <tr>
      <th>2018-01-08</th>
      <td>2742.669922</td>
      <td>2748.510010</td>
      <td>2737.600098</td>
      <td>2747.709961</td>
      <td>2747.709961</td>
      <td>3246160000</td>
    </tr>
  </tbody>
</table>
</div>

```python
sp500 = sp500['Close']
```

```python
%matplotlib
inline
import matplotlib.pyplot as plt
import seaborn;

seaborn.set()
sp500.plot();
```

![png](_posts/Working_With_Time_Series_files/Working_With_Time_Series_41_0.png)

```python
# resample() --> 데이터를 집계 --> 전년도 평균 보여줌
# asfreq() --> 데이터를 선택 --> 연말 주가 보여줌
sp500.plot(alpha=0.5, style='-')
# resampling
sp500.resample('BYE').mean().plot(style=':')
sp500.asfreq('BYE').plot(style='--');
plt.legend(['input', 'resample', 'asfreq'],
           loc='upper left');
```

![png](_posts/Working_With_Time_Series_files/Working_With_Time_Series_42_0.png)

```python
fig, ax = plt.subplots(2, sharex=True)
data = sp500.iloc[:10]

data.asfreq('D').plot(ax=ax[0], marker='o')

data.asfreq('D', method='bfill').plot(ax=ax[1], style='-o')
data.asfreq('D', method='ffill').plot(ax=ax[1], style='--o')
ax[1].legend(["back-fill", "forward-fill"]);
```

![png](_posts/Working_With_Time_Series_files/Working_With_Time_Series_43_0.png)

### Time-shifts

```python
sp500 = sp500.asfreq('D', method='pad')
# 주어진 항목 수만큼 데이터를 이동하는데 shift 메서드 사용
ROI = 100 * (sp500.shift(-365) - sp500) / sp500
ROI.plot()
plt.ylabel('% Return on Investment after 1 year');
```

![png](_posts/Working_With_Time_Series_files/Working_With_Time_Series_45_0.png)

### Rolling windows

```python
# 롤링 통계
# 인덱스의 1년 중심 롤링 평균과 표준 편차
rolling = sp500.rolling(365, center=True)

data = pd.DataFrame({'input': sp500,
                     'one-year rolling_mean': rolling.mean(),
                     'one-year rolling_std': rolling.std()})
ax = data.plot(style=['-', '--', ':'])
ax.lines[0].set_alpha(0.3)
```

![png](_posts/Working_With_Time_Series_files/Working_With_Time_Series_47_0.png)

## Example: Visualizing Seattle Bicycle Counts

```python
data = pd.read_csv('FremontBridge.csv', index_col='Date', parse_dates=True, date_format='%m/%d/%Y %I:%M:%S %p')
data.columns = ['Total', 'West', 'East']
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
      <th>Total</th>
      <th>West</th>
      <th>East</th>
    </tr>
    <tr>
      <th>Date</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2012-10-02 13:00:00</th>
      <td>55.0</td>
      <td>7.0</td>
      <td>48.0</td>
    </tr>
    <tr>
      <th>2012-10-02 14:00:00</th>
      <td>130.0</td>
      <td>55.0</td>
      <td>75.0</td>
    </tr>
    <tr>
      <th>2012-10-02 15:00:00</th>
      <td>152.0</td>
      <td>81.0</td>
      <td>71.0</td>
    </tr>
    <tr>
      <th>2012-10-02 16:00:00</th>
      <td>278.0</td>
      <td>167.0</td>
      <td>111.0</td>
    </tr>
    <tr>
      <th>2012-10-02 17:00:00</th>
      <td>563.0</td>
      <td>393.0</td>
      <td>170.0</td>
    </tr>
  </tbody>
</table>
</div>

```python
data.dropna().describe()
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
      <th>Total</th>
      <th>West</th>
      <th>East</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>100735.000000</td>
      <td>100735.000000</td>
      <td>100735.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>105.352827</td>
      <td>45.553373</td>
      <td>59.799454</td>
    </tr>
    <tr>
      <th>std</th>
      <td>131.840748</td>
      <td>60.090291</td>
      <td>81.591238</td>
    </tr>
    <tr>
      <th>min</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>13.000000</td>
      <td>5.000000</td>
      <td>7.000000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>59.000000</td>
      <td>25.000000</td>
      <td>32.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>143.000000</td>
      <td>62.000000</td>
      <td>78.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>1097.000000</td>
      <td>667.000000</td>
      <td>850.000000</td>
    </tr>
  </tbody>
</table>
</div>

### Visualizing the data

```python
data.plot()
plt.ylabel('Hourly Bicycle Count');
```

![png](_posts/Working_With_Time_Series_files/Working_With_Time_Series_52_0.png)

```python
# 밀집도를 낮추기 위해 주 단위로 리샘플링
weekly = data.resample('W').sum()
weekly.plot(style=[':', '--', '-'])
plt.ylabel('Weekly bicycle count');
```

![png](_posts/Working_With_Time_Series_files/Working_With_Time_Series_53_0.png)

```python
# 30일 롤링 평균을 구해 데이터가 중심에 오게 하기
daily = data.resample('D').sum()
daily.rolling(30, center=True).sum().plot(style=[':', '--', '-'])
plt.ylabel('mean hourly count');
```

![png](_posts/Working_With_Time_Series_files/Working_With_Time_Series_54_0.png)

```python
# 가우스 윈도우 함수 사용
daily.rolling(50, center=True,
              win_type='gaussian').sum(std=10).plot(style=[':', '--', '-']);
```

![png](_posts/Working_With_Time_Series_files/Working_With_Time_Series_55_0.png)

### Digging into the data

```python
# 하루 시간대별 통행량
by_time = data.groupby(data.index.time).mean()
hourly_ticks = 4 * 60 * 60 * np.arange(6)
by_time.plot(xticks=hourly_ticks, style=[':', '--', '-']);
```

![png](_posts/Working_With_Time_Series_files/Working_With_Time_Series_57_0.png)

```python
# 요일에 따른 통행량
by_weekday = data.groupby(data.index.dayofweek).mean()
by_weekday.index = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
by_weekday.plot(style=[':', '--', '-']);
```

![png](_posts/Working_With_Time_Series_files/Working_With_Time_Series_58_0.png)

```python
# 주말 표시 플래그와 시간대별 분류
weekend = np.where(data.index.weekday < 5, 'Weekday', 'Weekend')
by_time = data.groupby([weekend, data.index.time]).mean()
```

```python
# 주중과 주말의 시간대별 추이
import matplotlib.pyplot as plt

fig, ax = plt.subplots(1, 2, figsize=(14, 5))
by_time.loc['Weekday'].plot(ax=ax[0], title='Weekdays',
                            xticks=hourly_ticks, style=[':', '--', '-'])
by_time.loc['Weekend'].plot(ax=ax[1], title='Weekends',
                            xticks=hourly_ticks, style=[':', '--', '-']);
```

![png](_posts/Working_With_Time_Series_files/Working_With_Time_Series_60_0.png)
    

