---
title: Boolean-Arrays-And-Masks
date: 2024-04-18
categories: [ Python Data Science ]
tags: [ NumPy ]
layout: post
---

# Comparisons, Masks, and Boolean Logic

```python
import numpy as np
import pandas as pd

rainfall = pd.read_csv('./Seattle2014.csv')['PRCP'].values
inches = rainfall / 254  # 1/10mm --> inches 
print("inches.shape: ", inches.shape)
```

    inches.shape:  (365,)

## Ufunc 비교 연산자

```python
x = np.array([1, 2, 3, 4, 5])
print("x: ", x)
print("x < 3: ", x < 3)
print("x > 3: ", x > 3)
print("x <= 3: ", x <= 3)
print("x >= 3: ", x >= 3)
print("x != 3: ", x != 3)

# 복합 표현식 --> 두 배열 항목별 비교
print("\n(2 * x) == (x ** 2): ", (2 * x) == (x ** 2))

# 2차원
rng = np.random.RandomState(0)
x = rng.randint(10, size=(3, 4))
print("\nx: \n", x)
print("\nx < 6: \n", x < 6)
```

    x:  [1 2 3 4 5]
    x < 3:  [ True  True False False False]
    x > 3:  [False False False  True  True]
    x <= 3:  [ True  True  True False False]
    x >= 3:  [False False  True  True  True]
    x != 3:  [ True  True False  True  True]
    
    (2 * x) == (x ** 2):  [False  True False False False]
    
    x: 
     [[5 0 3 3]
     [7 9 3 5]
     [2 4 7 6]]
    
    x < 6: 
     [[ True  True  True  True]
     [False False  True  True]
     [ True  True False False]]

| Operator | Equivalent ufunc | Operator | Equivalent ufunc   |
|----------|------------------|----------|--------------------|
| `==`     | `np.equal`       | `!=`     | `np.not_equal`     |
| `<`      | `np.less`        | `<=`     | `np.less_equal`    |
| `>`      | `np.greater`     | `>=`     | `np.greater_equal` |

## 부울 배열로 작업

### 요소 개수 세기

```python
# 요소 개수 세기
print("x: \n", x)
# True인 요소의 개수
print("\nnp.count_nonzero(x < 6): ", np.count_nonzero(x < 6))
# False는 0으로, True는 1로 해석
print("\nnp.sum(x < 6): ", np.sum(x < 6))
# 집계함수와 같이 행이나 열에 따른 계산 가능
print("np.sum(x < 6, axis=1): ", np.sum(x < 6, axis=1))
# 값 중 참이 있는지 확인
print("\nnp.any(x > 8): ", np.any(x > 8))  # 하나의 값 기준
print("np.all(x < 10): ", np.all(x < 10))  # 모든 값 기준
print("\nnp.any(x > 8, axis=1): ", np.any(x > 8, axis=1))
print("np.all(x < 8, axis=0): ", np.all(x < 8, axis=0))
```

    x: 
     [[5 0 3 3]
     [7 9 3 5]
     [2 4 7 6]]
    
    np.count_nonzero(x < 6):  8
    
    np.sum(x < 6):  8
    np.sum(x < 6, axis=1):  [4 2 2]
    
    np.any(x > 8):  True
    np.all(x < 10):  True
    
    np.any(x > 8, axis=1):  [False  True False]
    np.all(x < 8, axis=0):  [ True False  True  True]

### 부울 연산자

| Operator | Equivalent ufunc | Operator | Equivalent ufunc |
|----------|------------------|----------|------------------|
| `&`      | `np.bitwise_and` | &#124;   | `np.bitwise_or`  |
| `^`      | `np.bitwise_xor` | `~`      | `np.bitwise_not` |

```python
print("np.sum((inches > 0.5) & (inches < 1)): ", np.sum((inches > 0.5) & (inches < 1)))
print("np.sum(~((inches <= 0.5) | (inches >= 1))): ", np.sum(~((inches <= 0.5) | (inches >= 1))))
```

    np.sum((inches > 0.5) & (inches < 1)):  29
    np.sum(~((inches <= 0.5) | (inches >= 1))):  29

### 마스크로서의 부울 배열

```python
print("x: \n", x)
print("\nx[x < 5]: ", x[x < 5])  # 마스킹 연산 --> 부울(마스크) 배열에서 True값 반환

# Example
rainy = (inches > 0)
summer = (np.arange(365) - 172 < 90) & (np.arange(365) - 17 > 0)
print("\nnp.median(inches[rainy]): ", np.median(inches[rainy]))
print("np.median(inches[summer]): ", np.median(inches[summer]))
print("np.max(inches[summer]): ", np.max(inches[summer]))
print("np.median(inches[rainy & ~summer]): ", np.median(inches[rainy & ~summer]))
```

    x: 
     [[5 0 3 3]
     [7 9 3 5]
     [2 4 7 6]]
    
    x[x < 5]:  [0 3 3 3 2 4]
    
    np.median(inches[rainy]):  0.19488188976377951
    np.median(inches[summer]):  0.0
    np.max(inches[summer]):  1.8385826771653544
    np.median(inches[rainy & ~summer]):  0.20866141732283464

### 키워드 사용

```python
# and / or --> 객체를 부울 요소로 취급
x = bool(33)
y = bool(0)
print("x:", x, "\ny:", y)
print("x and y:", x and y, "\nx or y:", x or y)

# & / | --> 비트를 비교(배열에 사용)
print("\nbin(33):", bin(33), "\nbin(55):", bin(55))
print("bin(33 & 55):", bin(33 & 55))
print("bin(33 | 55):", bin(33 | 55))
```

    x: True 
    y: False
    x and y: False 
    x or y: True
    
    bin(33): 0b100001 
    bin(55): 0b110111
    bin(33 & 55): 0b100001
    bin(33 | 55): 0b110111
    
