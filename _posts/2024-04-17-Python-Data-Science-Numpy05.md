---
title: Broadcasting
date: 2024-04-17
categories: [ Python Data Science ]
tags: [ NumPy ]
layout: post
---

# Broadcasting

```python
import numpy as np

# 같은 크기의 배열에서 이항 연산은 배열의 요소 단위로 수행
a = np.array([0, 1, 2])
b = np.array([5, 5, 5])
print("a + b: ", a + b)

# 서로 다른 크기의 배열에서 이항 연산 --> 브로드캐스팅
# 배열에 스칼라(단일 값을 가지는 배열) 더하기
print("a + 5: ", a + 5)
```

    a + b:  [5 6 7]
    a + 5:  [5 6 7]

## 규칙

두 배열의 차원 수가 다르면 더 작은 수의 차원을 가진 배열 형상의 앞쪽(왼쪽)을 1로 채움
두 배열의 형상이 어떤 차원에서도 일치하지 않는다면 해당 차원의 형상이 1인 배열이 다른 형상과 일치하도록 늘어남
임의의 차원에서 크기가 일치하지 않고 1도 아니라면 오류 발생

## Example

### 1차원 배열 + 2차원 배열

```python
M = np.ones((2, 3))
a = np.arange(3)

print("M:\n", M)
print("\na:\n", a)

print("\nM.shape = ", M.shape)
print("a.shape = ", a.shape)

# a.shape = (3,) --> (1, 3) --> (2, 3)
print("\nM + a:\n", M + a)
```

    M:
     [[1. 1. 1.]
     [1. 1. 1.]]
    
    a:
     [0 1 2]
    
    M.shape =  (2, 3)
    a.shape =  (3,)
    
    M + a:
     [[1. 2. 3.]
     [1. 2. 3.]]

### 두 배열 모두 브로드캐스팅

```python
a = np.arange(3).reshape((3, 1))
b = np.arange(3)

print("a:\n", a)
print("\nb:\n", b)

print("\na.shape = ", a.shape)
print("b.shape = ", b.shape)

# b.shape = (3,) --> (1, 3) --> (3, 3)
# a.shape = (3, 1) --> (3, 3)
print("\na + b:\n", a + b)
```

    a:
     [[0]
     [1]
     [2]]
    
    b:
     [0 1 2]
    
    a.shape =  (3, 1)
    b.shape =  (3,)
    
    a + b:
     [[0 1 2]
     [1 2 3]
     [2 3 4]]

### 두 배열이 호환 불가

```python
M = np.ones((3, 2))
a = np.arange(3)

print("M:\n", M)
print("\na:\n", a)

print("\nM.shape = ", M.shape)
print("a.shape = ", a.shape)

# a.shape = (3,) --> (1, 3) --> (3, 3)
# 최종 형상이 일치하지 않음 --> 브로드캐스팅 불가

# 배열의 재구조화를 통한 브로드캐스팅
print("\n+ 연산자:\n", M + a[:, np.newaxis])

# log(exp(a) + exp(b))를 보다 정확하게 계산
print("\nlogaddexp 함수:\n", np.logaddexp(M, a[:, np.newaxis]))
```

    M:
     [[1. 1.]
     [1. 1.]
     [1. 1.]]
    
    a:
     [0 1 2]
    
    M.shape =  (3, 2)
    a.shape =  (3,)
    
    + 연산자:
     [[1. 1.]
     [2. 2.]
     [3. 3.]]
    
    logaddexp 함수:
     [[1.31326169 1.31326169]
     [1.69314718 1.69314718]
     [2.31326169 2.31326169]]

### 배열 중앙 정렬

```python
X = np.random.random((10, 3))
Xmean = X.mean(0)  # 첫 차원의 특성별 평균값
X_centered = X - Xmean  # 평균값을 빼 X배열 중앙 정렬 --> 브로드캐스팅

print("X:\n", X)
print("\nXmean:\n", Xmean)
print("\nX_centered:\n", X_centered)

print("\nX_centered.mean(0):\n", X_centered.mean(0))  # 기계 정밀도 내 평균값은 0
```

    X:
     [[0.35977004 0.12358548 0.29426091]
     [0.05579591 0.78636917 0.00315014]
     [0.88997821 0.66524767 0.74282443]
     [0.3719009  0.63410359 0.2665996 ]
     [0.14267093 0.01049539 0.43815262]
     [0.67100915 0.31562613 0.17450512]
     [0.55706161 0.22985058 0.19524535]
     [0.29427804 0.75426718 0.53877332]
     [0.15255555 0.15272358 0.49272337]
     [0.2662454  0.92746251 0.882475  ]]
    
    Xmean:
     [0.37612657 0.45997313 0.40287099]
    
    X_centered:
     [[-0.01635653 -0.33638765 -0.10861007]
     [-0.32033067  0.32639605 -0.39972085]
     [ 0.51385164  0.20527454  0.33995344]
     [-0.00422567  0.17413047 -0.13627138]
     [-0.23345564 -0.44947774  0.03528163]
     [ 0.29488257 -0.144347   -0.22836586]
     [ 0.18093504 -0.23012254 -0.20762563]
     [-0.08184854  0.29429405  0.13590233]
     [-0.22357102 -0.30724955  0.08985238]
     [-0.10988117  0.46748938  0.47960401]]
    
    X_centered.mean(0):
     [4.44089210e-17 2.22044605e-17 2.22044605e-17]

### 2차원 함수 플로팅

```python
# x와 y는 0에서 5까지 50단계로 나눈 배열
x = np.linspace(0, 5, 50)
y = np.linspace(0, 5, 50)[:, np.newaxis]
z = np.sin(x) ** 10 + np.cos(10 + y * x) * np.cos(x)

%matplotlib
inline
import matplotlib.pyplot as plt

plt.imshow(z, origin='lower', extent=[0, 5, 0, 5], cmap='viridis')
plt.colorbar();
```

![png](assets/img/Broadcasting_files/Broadcasting_13_0.png)
    

