---
title: Array_Basics
date: 2024-04-14
categories: [ Python Data Science ]
tags: [ NumPy ]
layout: post
---

# Array_Basics

## NumPy 배열 속성 지정

```python
import numpy as np

np.random.seed(0)  # 재현 가능성을 위한 시드 값

x1 = np.random.randint(10, size=6)  # 1차원 배열
x2 = np.random.randint(10, size=(3, 4))  # 2차원 배열
x3 = np.random.randint(10, size=(3, 4, 5))  # 3차원 배열
```

```python
print("x3.ndim:  ", x3.ndim)  # 차원의 개수
print("x3.shape: ", x3.shape)  # 각 차원의 크기
print("x3.size:  ", x3.size)  # 전체 배열의 크기
print("x3.dtype: ", x3.dtype)  # 각 요소의 타입
```

    x3.ndim:   3
    x3.shape:  (3, 4, 5)
    x3.size:   60
    x3.dtype:  int32

## 배열 인덱싱: 단일 요소에 접근

```python
# 배열의 시작부터 인덱싱
print("x1: ", x1, "\n")
print("x1[0]: ", x1[0])
print("x1[4]: ", x1[4])
```

    x1:  [5 0 3 3 7 9] 
    
    x1[0]:  5
    x1[4]:  7

```python
# 배열의 끝에서부터 인덱싱
print("x1[-1]: ", x1[-1])
print("x1[-2]: ", x1[-2])
```

    x1[-1]:  9
    x1[-2]:  7

```python
# 다차원 배열에서 콤마로 구분된 인덱스 튜플을 이용해 항목에 접근
print("x2: \n", x2, "\n")

print("x2[0, 0]:  ", x2[0, 0])
print("x2[2, 0]:  ", x2[2, 0])
print("x2[2, -1]: ", x2[2, -1])
```

    x2: 
     [[3 5 2 4]
     [7 6 8 8]
     [1 6 7 7]] 
    
    x2[0, 0]:   3
    x2[2, 0]:   1
    x2[2, -1]:  7

```python
# 인덱스 표기법을 이용한 값 수정
x2[0, 0] = 12
print("x2: \n", x2, "\n")

# 인트타입을 가져 소수점 이하 절삭 --> 고정 타입
x2[0, 0] = 3.1415
print("x2: \n", x2)
```

    x2: 
     [[12  5  2  4]
     [ 7  6  8  8]
     [ 1  6  7  7]] 
    
    x2: 
     [[3 5 2 4]
     [7 6 8 8]
     [1 6 7 7]]

## 배열 슬라이싱: 하위 배열 접근

### 1차원 하위 배열 슬라이싱

```python
x = np.arange(10)

print("x: ", x, "\n")
print("x[:5]:   ", x[:5])  # 첫 5개 요소
print("x[5:]:   ", x[5:])  # 인덱스 5 다음 요소
print("x[4:7]:  ", x[4:7])  # 인덱스 4이상 7미만까지의 요소
print("x[::2]:  ", x[::2])  # 하나 걸러 하나씩의 요소
print("x[1::2]: ", x[1::2])  # 인덱스 1에서 시작해 하나 걸러 하나씩 요소
```

    x:  [0 1 2 3 4 5 6 7 8 9] 
    
    x[:5]:    [0 1 2 3 4]
    x[5:]:    [5 6 7 8 9]
    x[4:7]:   [4 5 6]
    x[::2]:   [0 2 4 6 8]
    x[1::2]:  [1 3 5 7 9]

### 다차원 하위 배열 슬라이싱

```python
print("x2: \n", x2, "\n")
print("x2[:2, :3]: \n", x2[:2, :3], "\n")  # 두 개의 행, 세 개의 열
print("x2[:3, ::2]: \n", x2[:3, ::2], "\n")  # 모든 행, 한 열 걸러 하나씩
print("x2[::-1, ::-1]: \n", x2[::-1, ::-1])  # 하위 배열 차원 역으로 변환

print("\nx2[:, 0]: ", x2[:, 0])  # 첫 번째 열
print("x2[:, 0]: ", x2[0, :])  # 첫 번째 행
print("x2[2[0]: ", x2[0])  # x2[0, :]와 동일
```

    x2: 
     [[3 5 2 4]
     [7 6 8 8]
     [1 6 7 7]] 
    
    x2[:2, :3]: 
     [[3 5 2]
     [7 6 8]] 
    
    x2[:3, ::2]: 
     [[3 2]
     [7 8]
     [1 7]] 
    
    x2[::-1, ::-1]: 
     [[7 7 6 1]
     [8 8 6 7]
     [4 2 5 3]]
    
    x2[:, 0]:  [3 7 1]
    x2[:, 0]:  [3 5 2 4]
    x2[2[0]:  [3 5 2 4]

### 배열 데이터의 사본이 아닌 뷰를 반환

```python
print("변경 전 x2 : \n", x2, "\n")
x2_sub = x2[:2, :2]
print("변경 전 x2_sub: \n", x2_sub, "\n")

x2_sub[0, 0] = 99

print("변경 후 x2_sub: \n", x2_sub, "\n")
print("변경 후 x2 : \n", x2)  # 하위 배열을 수정하면 원본 배열도 변경
# 큰 데이터세트를 다룰 때 기반 데이터 버퍼를 복사하지 않아도 접근 처리 가능
```

    변경 전 x2 : 
     [[3 5 2 4]
     [7 6 8 8]
     [1 6 7 7]] 
    
    변경 전 x2_sub: 
     [[3 5]
     [7 6]] 
    
    변경 후 x2_sub: 
     [[99  5]
     [ 7  6]] 
    
    변경 후 x2 : 
     [[99  5  2  4]
     [ 7  6  8  8]
     [ 1  6  7  7]]

### 배열 사본 만들기

```python
x2_sub_copy = x2[:2, :2].copy()
print("수정 전 x2_sub_copy: \n", x2_sub_copy)

# 수정 후에도 원본 배열 유지
x2_sub_copy[0, 0] = 33
print("\n수정 후 x2_sub_copy: \n", x2_sub_copy)
print("\nx2: \n", x2)
```

    수정 전 x2_sub_copy: 
     [[99  5]
     [ 7  6]]
    
    수정 후 x2_sub_copy: 
     [[33  5]
     [ 7  6]]
    
    x2: 
     [[99  5  2  4]
     [ 7  6  8  8]
     [ 1  6  7  7]]

## 배열 재구조화

```python
# 배열의 형상 변환
# 기본적으로 뷰를 사용하나, 연속되지 않은 메모리 버퍼일 경우 X
grid = np.arange(1, 10).reshape((3, 3))
grid
```

    array([[1, 2, 3],
           [4, 5, 6],
           [7, 8, 9]])

```python
# 1차원 배열을 2차원 행 혹은 열 매트릭스로 전환
x = np.array([1, 2, 3])

# 행 벡터
print("x.reshape((1, 3)): ", x.reshape((1, 3)))
print("x[np.newaxis, :]: ", x[np.newaxis, :])

# 열 벡터
print("\nx.reshape((3, 1)):\n", x.reshape((3, 1)))
print("\nx[:, np.newaxis]:\n", x[:, np.newaxis])
```

    x.reshape((1, 3)):  [[1 2 3]]
    x[np.newaxis, :]:  [[1 2 3]]
    
    x.reshape((3, 1)):
     [[1]
     [2]
     [3]]
    
    x[:, np.newaxis]:
     [[1]
     [2]
     [3]]

## 배열 연결

```python
# 1차원 배열의 연결
x = np.array([1, 2, 3])
y = np.array([33, 32, 31, 30])
z = [77, 78]
print("np.concatenate([x, y, z]):\n", np.concatenate([x, y, z]))

# 2차원 배열의 연결 --> 첫 번째 축을 따라 연결
grid_x = np.array([[1, 2, 3], [4, 5, 6]])
grid_y = np.array([[12, 21, 22], [14, 15, 16], [33, 32, 31]])
print("\nnp.concatenate([grid_x, grid_y]): \n", np.concatenate([grid_x, grid_y]))

# 혼합된 차원의 배열 연결
print("\nnp.vstack([x, grid_x]):\n", np.vstack([x, grid_x]))  # 배열을 수직으로 쌓음
grid_z = np.array([[99], [99]])
print("\nnp.hstack([grid x, grid_z]:\n", np.hstack([grid_x, grid_z]))  # 배열을 수평으로 쌓음
```

    np.concatenate([x, y, z]):
     [ 1  2  3 33 32 31 30 77 78]
    
    np.concatenate([grid_x, grid_y]): 
     [[ 1  2  3]
     [ 4  5  6]
     [12 21 22]
     [14 15 16]
     [33 32 31]]
    
    np.vstack([x, grid_x]):
     [[1 2 3]
     [1 2 3]
     [4 5 6]]
    
    np.hstack([grid x, grid_z]:
     [[ 1  2  3 99]
     [ 4  5  6 99]]

## 배열 분할

```python
# 1차원 배열의 분할
x = [1, 2, 3, 11, 12, 21, 22, 23]
x1, x2, x3 = np.split(x, [3, 5])
print("x: ", x)
print("x1: ", x1)
print("x2: ", x2)
print("x3: ", x3)

grid = np.arange(16).reshape((4, 4))
print("\ngrid:\n", grid)

# 배열을 수직으로 분할
upper, lower = np.vsplit(grid, [2])
print("\nupper:\n", upper)
print("\nlpwer:\n", lower)

# 배열을 수평으로 분할
left, right = np.hsplit(grid, [2])
print("\nleft:\n", left)
print("\nright:\n", right)
```

    x:  [1, 2, 3, 11, 12, 21, 22, 23]
    x1:  [1 2 3]
    x2:  [11 12]
    x3:  [21 22 23]
    
    grid:
     [[ 0  1  2  3]
     [ 4  5  6  7]
     [ 8  9 10 11]
     [12 13 14 15]]
    
    upper:
     [[0 1 2 3]
     [4 5 6 7]]
    
    lpwer:
     [[ 8  9 10 11]
     [12 13 14 15]]
    
    left:
     [[ 0  1]
     [ 4  5]
     [ 8  9]
     [12 13]]
    
    right:
     [[ 2  3]
     [ 6  7]
     [10 11]
     [14 15]]
    
