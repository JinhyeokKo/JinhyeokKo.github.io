---
title: Working_With_Strings
date: 2024-05-01
categories: [ Python Data Science ]
tags: [ Pandas ]
layout: post
---

# 벡터화된 문자열 연산 Working_With_Strings

## Pandas 문자열 연산 Pandas String Operations

```python
import numpy as np

x = np.array([2, 3, 5, 7, 11, 13])
# 벡터화 연산
x * 2
```

    array([ 4,  6, 10, 14, 22, 26])

```python
data = ['peter', 'Paul', 'MARY', 'gUIDO']
# NumPy 에서는 문자열 배열에 간단히 접근 불가 --> 루프 구문 사용
[s.capitalize() for s in data]
```

    ['Peter', 'Paul', 'Mary', 'Guido']

```python
import pandas as pd

data = ['peter', 'Paul', None, 'MARY', 'gUIDO']
names = pd.Series(data)
names
```

    0    peter
    1     Paul
    2     None
    3     MARY
    4    gUIDO
    dtype: object

## Tables of Pandas String Methods

```python
monte = pd.Series(['Graham Chapman', 'John Cleese', 'Terry Gilliam',
                   'Eric Idle', 'Terry Jones', 'Michael Palin'])
```

### Methods similar to Python string methods

#### Pandas str methods

|              |                  |                  |                  |
|--------------|------------------|------------------|------------------|
| ``len()``    | ``lower()``      | ``translate()``  | ``islower()``    | 
| ``ljust()``  | ``upper()``      | ``startswith()`` | ``isupper()``    | 
| ``rjust()``  | ``find()``       | ``endswith()``   | ``isnumeric()``  | 
| ``center()`` | ``rfind()``      | ``isalnum()``    | ``isdecimal()``  | 
| ``zfill()``  | ``index()``      | ``isalpha()``    | ``split()``      | 
| ``strip()``  | ``rindex()``     | ``isdigit()``    | ``rsplit()``     | 
| ``rstrip()`` | ``capitalize()`` | ``isspace()``    | ``partition()``  | 
| ``lstrip()`` | ``swapcase()``   | ``istitle()``    | ``rpartition()`` |

```python
# 일부 메서드는 일련의 문자열을 반환
monte.str.lower()
```

    0    graham chapman
    1       john cleese
    2     terry gilliam
    3         eric idle
    4       terry jones
    5     michael palin
    dtype: object

```python
# 일부 메서드는 숫자를 반환
monte.str.len()
```

    0    14
    1    11
    2    13
    3     9
    4    11
    5    13
    dtype: int64

```python
# 일부 메서드는 부울 값을 반환
monte.str.startswith('T')
```

    0    False
    1    False
    2     True
    3    False
    4     True
    5    False
    dtype: bool

```python
# 일부 메서드는 각 요소에 대한 리스트나 다른 복합 값을 반환
monte.str.split()
```

    0    [Graham, Chapman]
    1       [John, Cleese]
    2     [Terry, Gilliam]
    3         [Eric, Idle]
    4       [Terry, Jones]
    5     [Michael, Palin]
    dtype: object

### Methods using regular expressions

#### Pandas 메서드와 파이썬 re 모듈 함수 사이의 매핑

| Method         | Description                          | EngDescription                                                            |
|----------------|--------------------------------------|---------------------------------------------------------------------------|
| ``match()``    | 각 요소에 re.match()를 호출, 부울 값을 반환       | Call ``re.match()`` on each element, returning a boolean.                 |
| ``extract()``  | 각 요소에 re.math()를 호출, 문자열로 매칭된 그룹을 반환 | Call ``re.match()`` on each element, returning matched groups as strings. |
| ``findall()``  | 각 요소에 re.findall()을 호출               | Call ``re.findall()`` on each element                                     |
| ``replace()``  | 패턴이 발생한 곳을 다른 문자열로 대체                | Replace occurrences of pattern with some other string                     |
| ``contains()`` | 각 요소에 re.search()를 호출, 부울 값을 반환      | Call ``re.search()`` on each element, returning a boolean                 |
| ``count()``    | 패턴의 발생 건수를 집계                        | Count occurrences of pattern                                              |
| ``split()``    | str.split()과 동일하지만 정규 표현식을 취함        | Equivalent to ``str.split()``, but accepts regexps                        |
| ``rsplit()``   | str.rsplit()과 동일하지만 정규 표현식을 취함       | Equivalent to ``str.rsplit()``, but accepts regexps                       |

```python
# 각 요소의 시작 문자와 붙어있는 그룹을 요청해 각 요소로부터 이름 부분을 추출
monte.str.extract('([A-Za-z]+)', expand=False)
```

    0     Graham
    1       John
    2      Terry
    3       Eric
    4      Terry
    5    Michael
    dtype: object

```python
# 문자열 시작(^)과 문자열 끝($)을 나타내는 정규 표현식을 사용해 자음으로 시작하고 끝나는 모든 이름 찾기
monte.str.findall(r'^[^AEIOU].*[^aeiou]$')
```

    0    [Graham Chapman]
    1                  []
    2     [Terry Gilliam]
    3                  []
    4       [Terry Jones]
    5     [Michael Palin]
    dtype: object

### Miscellaneous methods

#### 기타 Pandas 문자열 메서드

| Method              | Description                         | EngDescription                                                    |
|---------------------|-------------------------------------|-------------------------------------------------------------------|
| ``get()``           | 각 요소에 인덱스를 지정                       | Index each element                                                |
| ``slice()``         | 각 요소에 슬라이스를 적용                      | Slice each element                                                |
| ``slice_replace()`` | 각 요소의 슬라이스를 전달된 값으로 대체              | Replace slice in each element with passed value                   |
| ``cat()``           | 문자열을 연결                             | Concatenate strings                                               |
| ``repeat()``        | 값을 반복                               | Repeat values                                                     |
| ``normalize()``     | 문자열의 유니코드 형태를 반환                    | Return Unicode form of string                                     |
| ``pad()``           | 문자열 왼쪽, 오른쪽, 또는 양쪽에 공백을 추가          | Add whitespace to left, right, or both sides of strings           |
| ``wrap()``          | 긴 문자열을 주어진 너비보다 짧은 길이의 여러 줄로 나눔     | Split long strings into lines with length less than a given width |
| ``join()``          | Series의 각 요소에 있는 문자열을 전달된 구분자와 결합   | Join strings in each element of the Series with passed separator  |
| ``get_dummies()``   | DataFrame으로 가변수(dummy variable)를 추출 | extract dummy variables as a dataframe                            |

#### 벡터화된 항목의 접근 및 슬라이싱 Vectorized item access and slicing

```python
# df.str.slice(0, 3) 과 동일
monte.str[0:3]
```

    0    Gra
    1    Joh
    2    Ter
    3    Eri
    4    Ter
    5    Mic
    dtype: object

```python
# split --> 반환한 배열의 요소에 접근
# get --> 각 요소의 성 추출
monte.str.split().str.get(-1)
```

    0    Chapman
    1     Cleese
    2    Gilliam
    3       Idle
    4      Jones
    5      Palin
    dtype: object

#### 지시 변수 Indicator variables

```python
full_monte = pd.DataFrame({'name': monte,
                           'info': ['B|C|D', 'B|D', 'A|C',
                                    'B|D', 'B|C', 'B|C|D']})
full_monte
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
      <th>name</th>
      <th>info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Graham Chapman</td>
      <td>B|C|D</td>
    </tr>
    <tr>
      <th>1</th>
      <td>John Cleese</td>
      <td>B|D</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Terry Gilliam</td>
      <td>A|C</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Eric Idle</td>
      <td>B|D</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Terry Jones</td>
      <td>B|C</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Michael Palin</td>
      <td>B|C|D</td>
    </tr>
  </tbody>
</table>
</div>

```python
# 지시 변수를 DataFrame으로 나누기
full_monte['info'].str.get_dummies('|')
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
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>


