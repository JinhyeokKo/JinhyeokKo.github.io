---
title: Universal_Functions
date: 2024-04-15
categories: [ Python Data Science ]
tags: [ NumPy ]
layout: post
---

# Universal_Functions

## NumPy 배열 연산: Ufuncs

```python
import numpy as np

np.random.seed(0)


def compute_reciprocals(values):
    output = np.empty(len(values))
    for i in range(len(values)):
        output[i] = 1.0 / values[i]
    return output


big_array = np.random.randint(1, 100, size=1000000)

# 벡터화 연산은 Numpy 배열의 값에 반복된 연산을 빠르게 수행하는 것을 주목적으로 하는 Ufuncs를 통해 구현
print("파이썬 루프: ")
%timeit
compute_reciprocals(big_array)
print("벡터화: ")
%timeit(1.0 / big_array)

# Ufunc 연산은 여러 차원 배열에서 동작
print("\n1차원 배열 : \n", np.arange(5) / np.arange(1, 6))
print("\n3차원 배열 : \n", 2 ** (np.arange(9).reshape((3, 3))))
```

    파이썬 루프: 
    967 ms ± 4.74 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
    벡터화: 
    1.7 ms ± 41.7 µs per loop (mean ± std. dev. of 7 runs, 1,000 loops each)
    
    1차원 배열 : 
     [0.         0.5        0.66666667 0.75       0.8       ]
    
    3차원 배열 : 
     [[  1   2   4]
     [  8  16  32]
     [ 64 128 256]]

Ufuncs는 기본 산술 연산자를 사용하며 표준 연산 순서를 따름

| 연산자 | 대응 Ufuncs | 설명 |

| --- | --- | --- |

| + | np.add | 덧셈(예: 1 + 1 = 2) |

| - | np.subtract | 뺄셈(예: 3 - 2 = 1) |

| - | np.negative | 단항 음수(예: -2) |

| * | np.multiply | 곱셈(예: 2 * 3 = 6) |

| / | np.divide | 나눗셈(예: 3 / 2 = 1.5) |

| // | np.floor_divide | 나눗셈의 몫(예: 3 // 2 = 1) |

| **  | np.power | 지수(예: 2 ** 3 = 8) |

| % | np.mod | 나눗셈의 나머지(예: 9 % 4 = 1) |

### 절댓값 함수

```python
# 절댓값 함수 ufunc : np.absolute --> np.abs
x = np.array([-2, -1, 0, 1, 2])
print("x: ", x)
print("np.absolute(x): ", np.absolute(x))
print("np.abs(x): ", np.abs(x))

# 복수 데이터도 처리 가능하며, 이 경우 절댓값은 크기를 반환
x = np.array([3 - 4j, 4 - 3j, 2 + 0j, 0 + 1j])
print("복수 데이터 np.abs(x):", np.abs(x))
```

    x:  [-2 -1  0  1  2]
    np.absolute(x):  [2 1 0 1 2]
    np.abs(x):  [2 1 0 1 2]
    복수 데이터 np.abs(x): [5. 5. 2. 1.]

### 삼각 함수

```python
# 삼각함수
theta = np.linspace(0, np.pi, 3)  # np.pi --> 파이값
print("theta      = ", theta)
print("sin(theta) = ", np.sin(theta))
print("cos(theta) = ", np.cos(theta))
print("tan(theta) = ", np.tan(theta))

# 역삼각함수
x = [-1, 0, 1]
print("\nx         = ", x)
print("arcsin(x) = ", np.arcsin(x))
print("arccos(x) = ", np.arccos(x))
print("arctan(x) = ", np.arctan(x))
```

    theta      =  [0.         1.57079633 3.14159265]
    sin(theta) =  [0.0000000e+00 1.0000000e+00 1.2246468e-16]
    cos(theta) =  [ 1.000000e+00  6.123234e-17 -1.000000e+00]
    tan(theta) =  [ 0.00000000e+00  1.63312394e+16 -1.22464680e-16]
    
    x         =  [-1, 0, 1]
    arcsin(x) =  [-1.57079633  0.          1.57079633]
    arccos(x) =  [3.14159265 1.57079633 0.        ]
    arctan(x) =  [-0.78539816  0.          0.78539816]

### 지수와 로그

```python
# 지수 연산
x = [1, 2, 3]
print("x   = ", x)
print("e^x = ", np.exp(x))
print("2^x = ", np.exp2(x))
print("3^x = ", np.power(3, x))

# 로그 연산
x = [1, 2, 4, 10]
print("\nx        = ", x)
print("ln(x)    = ", np.log(x))
print("log2(x)  = ", np.log2(x))
print("log10(x) = ", np.log10(x))

# 매우 작은 입력값의 정확도를 유지할 때
x = [0, 0.001, 0.01, 0.1]
print("\nx          = ", x)
print("exp(x) - 1 = ", np.expm1(x))
print("log(1 + x) = ", np.log1p(x))
```

    x   =  [1, 2, 3]
    e^x =  [ 2.71828183  7.3890561  20.08553692]
    2^x =  [2. 4. 8.]
    3^x =  [ 3  9 27]
    
    x        =  [1, 2, 4, 10]
    ln(x)    =  [0.         0.69314718 1.38629436 2.30258509]
    log2(x)  =  [0.         1.         2.         3.32192809]
    log10(x) =  [0.         0.30103    0.60205999 1.        ]
    
    x          =  [0, 0.001, 0.01, 0.1]
    exp(x) - 1 =  [0.         0.0010005  0.01005017 0.10517092]
    log(1 + x) =  [0.         0.0009995  0.00995033 0.09531018]

```python
# 잘 알려지지 안은 수학적 함수를 사용할 때 --> 대부분 scipy.special
from scipy import special

# 감마 함수(일반화된 계승)와 관련 함수
x = [1, 5, 10]
print("gamma(x)     = ", special.gamma(x))
print("ln|gamma(x)| = ", special.gammaln(x))
print("beta(x, 2)   = ", special.beta(x, 2))

# 오차 함수(가우스 적분), 그 보수(complement)와 역수(inverse)
x = np.array([0, 0.3, 0.7, 1.0])
print("\nerf(x)    = ", special.erf(x))
print("erfc(x)   = ", special.erfc(x))
print("erfinv(x) = ", special.erfinv(x))

# 이 외 gamma function python 참조
```

    gamma(x)     =  [1.0000e+00 2.4000e+01 3.6288e+05]
    ln|gamma(x)| =  [ 0.          3.17805383 12.80182748]
    beta(x, 2)   =  [0.5        0.03333333 0.00909091]
    
    erf(x)    =  [0.         0.32862676 0.67780119 0.84270079]
    erfc(x)   =  [1.         0.67137324 0.32219881 0.15729921]
    erfinv(x) =  [0.         0.27246271 0.73286908        inf]

## 고급 Ufunc 기능

```python
# 출력 지정 --> out
x = np.arange(5)
y = np.empty(5)
np.multiply(x, 10, out=y)
print(y)

#배열 뷰와 함께 사용
y = np.zeros(10)
# y[::2] = 2 ** x --> 2 ** x 결과를 임시 배열을 생성 후 y 배열에 복사
np.power(2, x, out=y[::2])  # 2 ** x 결과를 바로 y 배열에 기록 -> 메모리 효율적
print(y)
```

    [ 0. 10. 20. 30. 40.]
    [ 1.  0.  2.  0.  4.  0.  8.  0. 16.  0.]

```python
# 외적(Outer products) --> outer
#서로 다른 두 입력값의 모든 쌍에 대한 출력값 계산
x = np.arange(1, 6)
np.multiply.outer(x, x)
```

    array([[ 1,  2,  3,  4,  5],
           [ 2,  4,  6,  8, 10],
           [ 3,  6,  9, 12, 15],
           [ 4,  8, 12, 16, 20],
           [ 5, 10, 15, 20, 25]])


