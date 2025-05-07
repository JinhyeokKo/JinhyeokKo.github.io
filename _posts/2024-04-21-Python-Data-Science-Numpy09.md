---
title: Structured-Data-NumPy
date: 2024-04-21
categories: [ Python Data Science ]
tags: [ NumPy ]
layout: post
---

# Structured-Data-NumPy

## 구조화된 배열 만들기

### 복합 데이터 타입

```python
import numpy as np

name = ['Alice', 'Bob', 'Cathy', 'Doug']
age = [25, 45, 37, 19]
weight = [55.0, 85.5, 68.0, 61.5]

# 딕셔너리
# U10 --> 최대 길이 10을 갖는 유니코드 문자열
# i4 --> 4바이트(32비트) 정수
# f8 --> 8바이트(64비트) 부동 소수점
data = np.zeros(4, dtype={'names': ('name', 'age', 'weight'), 'formats': ('U10', 'i4', 'f8')})
print("data.dtype: ", data.dtype)

data['name'] = name
data['age'] = age
data['weight'] = weight
print("\ndata:\n", data)

# 특정 값 가져오기
print("\ndata['name']:", data['name'])
print("data[0]:", data[0])
print("data[-1]['name']:", data[-1]['name'])
print("data[data['age'] < 30]['name']:", data[data['age'] < 30]['name'])
```

    data.dtype:  [('name', '<U10'), ('age', '<i4'), ('weight', '<f8')]
    
    data:
     [('Alice', 25, 55. ) ('Bob', 45, 85.5) ('Cathy', 37, 68. )
     ('Doug', 19, 61.5)]
    
    data['name']: ['Alice' 'Bob' 'Cathy' 'Doug']
    data[0]: ('Alice', 25, 55.)
    data[-1]['name']: Doug
    data[data['age'] < 30]['name']: ['Alice' 'Doug']

```python
# 숫자 타입 --> 파이썬 타입이나 NumPy dtype으로 지정 가능
np.dtype({'names': ('name', 'age', 'weight'), 'formats': ((np.str_, 10), int, np.float32)})
# 튜플 리스트
np.dtype([('name', 'S10'), ('age', 'i4'), ('weight', 'f8')])
# 타입만 지정
np.dtype('S10,i4,f8')
```

    dtype([('f0', 'S10'), ('f1', '<i4'), ('f2', '<f8')])

### NumPy 데이터 타입

| 문자           | 설명                                 | 예제                                 |
|--------------|------------------------------------|------------------------------------| 
| `'b'`        | Byte(바이트)                          | `np.dtype('b')`                    |
| `'i'`        | Signed integer(부호 있는 정수)           | `np.dtype('i4') == np.int32`       |
| `'u'`        | Unsigned integer(부호 없는 정수)         | `np.dtype('u1') == np.uint8`       |
| `'f'`        | Floating point(부동 소수점)             | `np.dtype('f8') == np.int64`       |
| `'c'`        | Complex floating point(복소수 부동 소수점) | `np.dtype('c16') == np.complex128` |
| `'S'`, `'a'` | String(문자열)                        | `np.dtype('S5')`                   |
| `'U'`        | Unicode string(유니코드 문자열)           | `np.dtype('U') == np.str_`         |
| `'V'`        | Raw data (void)(원시데이터)             | `np.dtype('V') == np.void`         |

## 고급 복합 타입

```python
# dtype은 C구조체 정의에 직접 매핑 --> 배열 내용 포함하는 버퍼에 직접 접근
tp = np.dtype([('id', 'i8'), ('mat', 'f8', (3, 3))])
X = np.zeros(1, dtype=tp)
print(X[0])
print(X['mat'][0])
```

    (0, [[0., 0., 0.], [0., 0., 0.], [0., 0., 0.]])
    [[0. 0. 0.]
     [0. 0. 0.]
     [0. 0. 0.]]

## 레코드 배열 RecordArrays

```python
print(data['age'])

# 레코드 배열 --> 필드에 접근 시 동일 구문을 사용해도 오버헤드 발생
data_rec = data.view(np.recarray)
print(data_rec.age)

# 두 방법 중 필요에 따라 선택
```

    [25 45 37 19]
    [25 45 37 19]

```python

```
