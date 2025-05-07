---
title: Code_Profiling_And_Time_Measurement
date: 2024-04-12
categories: [ Python Data Science ]
tags: [ IPython ]
layout: post
---

# Code_Profiling_And_Time_Measurement

## 실행 시간 측정

```python
# 한 줄 코드 또는 함수 호출 실행 시간 측정
%timeit
sum(range(100))
```

    403 ns ± 11.6 ns per loop (mean ± std. dev. of 7 runs, 1,000,000 loops each)

```python
# shell 단위 시간 측정
%%timeit
total = 0
for i in range(1000):
    for j in range(1000):
        total += i * (-1) ** j
```

    95.9 ms ± 2.89 ms per loop (mean ± std. dev. of 7 runs, 10 loops each)

```python
# 정렬작업을 반복시에는 정확하지 않음 --> %time 사용
import random

L = [random.random() for i in range(100000)]
%timeit
L.sort()
```

    276 µs ± 19.7 µs per loop (mean ± std. dev. of 7 runs, 1,000 loops each)

```python
# 시간 비교
import random

L = [random.random() for i in range(100000)]
print("미정렬 리스트 정렬")
%time
L.sort()
```

    미정렬 리스트 정렬
    CPU times: total: 0 ns
    Wall time: 9.52 ms

```python
# 정렬된 리스트여도 %timeit은 가비지 컬렉션 작업을 막아 %time보다 빠름
print("정렬 리스트 정렬")
%time
L.sort()
```

    정렬 리스트 정렬
    CPU times: total: 0 ns
    Wall time: 2.26 ms

```python
# %%를 통해 여러 줄 스크립트 측정 가능
%%time
total = 0
for i in range(1000):
    for j in range(1000):
        total += i * (-1) ** j
```

    CPU times: total: 93.8 ms
    Wall time: 156 ms

## 프로파일링

```python
def sum_of_lists(N):
    total = 0
    for i in range(5):
        L = [j ^ (j >> i) for j in range(N)]
        total += sum(L)
    return total
```

```python
# 전체 스크립트 프로파일링
%prun
sum_of_lists(1000000)
```

             14 function calls in 0.582 seconds
    
       Ordered by: internal time
    
       ncalls  tottime  percall  cumtime  percall filename:lineno(function)
            5    0.489    0.098    0.489    0.098 3519952779.py:4(<listcomp>)
            5    0.069    0.014    0.069    0.014 {built-in method builtins.sum}
            1    0.018    0.018    0.576    0.576 3519952779.py:1(sum_of_lists)
            1    0.006    0.006    0.582    0.582 <string>:1(<module>)
            1    0.000    0.000    0.582    0.582 {built-in method builtins.exec}
            1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}

```python
pip
install
line_profiler
```

    Collecting line_profiler
      Downloading line_profiler-4.1.2-cp311-cp311-win_amd64.whl.metadata (32 kB)
    Downloading line_profiler-4.1.2-cp311-cp311-win_amd64.whl (123 kB)
       ---------------------------------------- 0.0/123.6 kB ? eta -:--:--
       ----------------------- ---------------- 71.7/123.6 kB 2.0 MB/s eta 0:00:01
       ---------------------------------------- 123.6/123.6 kB 2.4 MB/s eta 0:00:00
    Installing collected packages: line_profiler
    Successfully installed line_profiler-4.1.2
    Note: you may need to restart the kernel to use updated packages.

```python
%load_ext
line_profiler
```

```python
# 라인 단위 프로파일링
%lprun - f
sum_of_lists
sum_of_lists(5000)
```

    Timer unit: 1e-07 s
    
    Total time: 0.008661 s
    File: C:\Users\jiinn\AppData\Local\Temp\ipykernel_10312\3519952779.py
    Function: sum_of_lists at line 1
    
    Line #      Hits         Time  Per Hit   % Time  Line Contents
    ==============================================================
         1                                           def sum_of_lists(N):
         2         1          7.0      7.0      0.0      total = 0
         3         6         45.0      7.5      0.1      for i in range(5):
         4         5      85463.0  17092.6     98.7          L = [j ^ (j >> i) for j in range(N)]
         5         5       1092.0    218.4      1.3          total += sum(L)
         6         1          3.0      3.0      0.0      return total

```python
pip
install
memory_profiler
```

    Collecting memory_profiler
      Downloading memory_profiler-0.61.0-py3-none-any.whl.metadata (20 kB)
    Requirement already satisfied: psutil in d:\anaconda3\lib\site-packages (from memory_profiler) (5.9.0)
    Downloading memory_profiler-0.61.0-py3-none-any.whl (31 kB)
    Installing collected packages: memory_profiler
    Successfully installed memory_profiler-0.61.0
    Note: you may need to restart the kernel to use updated packages.

```python
%load_ext
memory_profiler
```

```python
# 메모리 사용 프로파일링
# timeit과 동일한 방식으로 메모리 츨정
%memit
sum_of_lists(1000000)
```

    peak memory: 180.36 MiB, increment: 77.47 MiB

```python
# 모듈 생성
%%file
mprun_demo.py


def sum_of_lists(N):
    total = 0
    for i in range(5):
        L = [j ^ (j >> i) for j in range(N)]
        total += sum(L)
    return total
```

    Writing mprun_demo.py

```python
# %lprun과 동일한 방식으로 메모리 측정 --> 별도의 모듈에만 동작
from mprun_demo import sum_of_lists
%mprun - f
sum_of_lists
sum_of_lists(1000000)
```

    Filename: D:\A\AI_Programming\mprun_demo.py
    
    Line #    Mem usage    Increment  Occurrences   Line Contents
    =============================================================
         1    105.7 MiB    105.7 MiB           1   def sum_of_lists(N):
         2    105.7 MiB      0.0 MiB           1       total = 0
         3    146.1 MiB     -0.0 MiB           6       for i in range(5):
         4    181.8 MiB -39042623.4 MiB     5000015           L = [j ^ (j >> i) for j in range(N)]
         5    146.1 MiB   -115.7 MiB           5           total += sum(L)
         6    146.1 MiB     -0.0 MiB           1       return total

