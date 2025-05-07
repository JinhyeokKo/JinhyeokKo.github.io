---
title: Basic_IPython
date: 2024-04-08
categories: [ Python Data Science ]
tags: [ IPython ]
layout: post
---

# Basic_IPython

## help()함수로 문서 확인하기

```python
len?
```

    [1;31mSignature:[0m [0mlen[0m[1;33m([0m[0mobj[0m[1;33m,[0m [1;33m/[0m[1;33m)[0m[1;33m[0m[1;33m[0m[0m
    [1;31mDocstring:[0m Return the number of items in a container.
    [1;31mType:[0m      builtin_function_or_method

```python
L = [1, 2, 3]
```

```python
L.insert?
```

    [1;31mSignature:[0m [0mL[0m[1;33m.[0m[0minsert[0m[1;33m([0m[0mindex[0m[1;33m,[0m [0mobject[0m[1;33m,[0m [1;33m/[0m[1;33m)[0m[1;33m[0m[1;33m[0m[0m
    [1;31mDocstring:[0m Insert object before index.
    [1;31mType:[0m      builtin_function_or_method

```python
L?
```

    [1;31mType:[0m        list
    [1;31mString form:[0m [1, 2, 3]
    [1;31mLength:[0m      3
    [1;31mDocstring:[0m  
    Built-in mutable sequence.
    
    If no argument is given, the constructor creates a new empty list.
    The argument must be an iterable if specified.

```python
def square(a):
    """a의 제곱을 반환"""
    return a ** 2
```

```python
square?
```

    [1;31mSignature:[0m [0msquare[0m[1;33m([0m[0ma[0m[1;33m)[0m[1;33m[0m[1;33m[0m[0m
    [1;31mDocstring:[0m a의 제곱을 반환
    [1;31mFile:[0m      c:\users\jiinn\appdata\local\temp\ipykernel_432\2796758577.py
    [1;31mType:[0m      function

## 소스코드에 접근하기

```python
square??
```

    [1;31mSignature:[0m [0msquare[0m[1;33m([0m[0ma[0m[1;33m)[0m[1;33m[0m[1;33m[0m[0m
    [1;31mSource:[0m   
    [1;32mdef[0m [0msquare[0m[1;33m([0m[0ma[0m[1;33m)[0m[1;33m:[0m[1;33m
    [0m    [1;34m"""a의 제곱을 반환"""[0m[1;33m
    [0m    [1;32mreturn[0m [0ma[0m[1;33m**[0m[1;36m2[0m[1;33m[0m[1;33m[0m[0m
    [1;31mFile:[0m      c:\users\jiinn\appdata\local\temp\ipykernel_432\2796758577.py
    [1;31mType:[0m      function

## 와일드카드 매칭

```python
*Warning?
```

    BytesWarning
    DeprecationWarning
    EncodingWarning
    FutureWarning
    ImportWarning
    PendingDeprecationWarning
    ResourceWarning
    RuntimeWarning
    SyntaxWarning
    UnicodeWarning
    UserWarning
    Warning

```python
str. * find *?
```

    str.find
    str.rfind

## 외부 코드 실행

```python
%run
myscript.py
```

    1 의 제곱은  1
    2 의 제곱은  4
    3 의 제곱은  9

```python
square(5)
```

    25

```python
square??
```

    [1;31mSignature:[0m [0msquare[0m[1;33m([0m[0mx[0m[1;33m)[0m[1;33m[0m[1;33m[0m[0m
    [1;31mSource:[0m   
    [1;32mdef[0m [0msquare[0m[1;33m([0m[0mx[0m[1;33m)[0m[1;33m:[0m[1;33m
    [0m    [1;34m"""숫자의 제곱을 반환"""[0m[1;33m
    [0m    [1;32mreturn[0m [0mx[0m [1;33m**[0m [1;36m2[0m[1;33m[0m[1;33m[0m[0m
    [1;31mFile:[0m      d:\a\ai_programming\myscript.py
    [1;31mType:[0m      function

## 코드 실행 시간 측정

```python
%timeit
L = [n ** 2 for n in range(1000)]
```

    40.2 µs ± 375 ns per loop (mean ± std. dev. of 7 runs, 10,000 loops each)

```python
%%timeit
L = []
for n in range(1000):
    L.append(n ** 2)
```

    48 µs ± 1.13 µs per loop (mean ± std. dev. of 7 runs, 10,000 loops each)
    
