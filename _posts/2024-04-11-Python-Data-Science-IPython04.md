---
title: Debugging
date: 2024-04-11
categories: [ Python Data Science ]
tags: [ IPython ]
layout: post
---

# Debugging

## 예외제어: %xmode

```python
def func1(a, b):
    return a / b


def func2(x):
    a = x
    b = x - 1
    return func1(a, b)
```

```python
func2(1)
```

    ---------------------------------------------------------------------------

    ZeroDivisionError                         Traceback (most recent call last)

    Cell In[2], line 1
    ----> 1 func2(1)
    

    Cell In[1], line 7, in func2(x)
          5 a = x
          6 b = x - 1
    ----> 7 return func1(a, b)
    

    Cell In[1], line 2, in func1(a, b)
          1 def func1(a, b):
    ----> 2     return a/b
    

    ZeroDivisionError: division by zero

```python
%xmode
Plain
```

    Exception reporting mode: Plain

```python
func2(1)
```

    Traceback (most recent call last):
    

      Cell In[4], line 1
        func2(1)
    

      Cell In[1], line 7 in func2
        return func1(a, b)
    

      Cell In[1], line 2 in func1
        return a/b
    

    ZeroDivisionError: division by zero

```python
%xmode
Verbose
```

    Exception reporting mode: Verbose

```python
func2(1)
```

    ---------------------------------------------------------------------------

    ZeroDivisionError                         Traceback (most recent call last)

    Cell In[6], line 1
    ----> 1 func2(1)
    

    Cell In[1], line 7, in func2(x=1)
          5 a = x
          6 b = x - 1
    ----> 7 return func1(a, b)
            a = 1
            b = 0
    

    Cell In[1], line 2, in func1(a=1, b=0)
          1 def func1(a, b):
    ----> 2     return a/b
            a = 1
            b = 0
    

    ZeroDivisionError: division by zero

## 역추적 내용으로 불충분할 경우: %debug

```python
%debug
```

    > [1;32mc:\users\jiinn\appdata\local\temp\ipykernel_2956\4210028810.py[0m(2)[0;36mfunc1[1;34m()[0m
    
    

    ipdb>  list
    

    [0;32m      1 [0m[1;32mdef[0m [0mfunc1[0m[1;33m([0m[0ma[0m[1;33m,[0m [0mb[0m[1;33m)[0m[1;33m:[0m[1;33m[0m[1;33m[0m[0m
    [1;32m----> 2 [1;33m    [1;32mreturn[0m [0ma[0m[1;33m/[0m[0mb[0m[1;33m[0m[1;33m[0m[0m
    [0m[0;32m      3 [0m[1;33m[0m[0m
    [0;32m      4 [0m[1;32mdef[0m [0mfunc2[0m[1;33m([0m[0mx[0m[1;33m)[0m[1;33m:[0m[1;33m[0m[1;33m[0m[0m
    [0;32m      5 [0m    [0ma[0m [1;33m=[0m [0mx[0m[1;33m[0m[1;33m[0m[0m
    [0;32m      6 [0m    [0mb[0m [1;33m=[0m [0mx[0m [1;33m-[0m [1;36m1[0m[1;33m[0m[1;33m[0m[0m
    [0;32m      7 [0m    [1;32mreturn[0m [0mfunc1[0m[1;33m([0m[0ma[0m[1;33m,[0m [0mb[0m[1;33m)[0m[1;33m[0m[1;33m[0m[0m
    
    

    ipdb>  print(a)
    

    1
    

    ipdb>  print(b)
    

    0
    

    ipdb>  exit

```python
%debug
```

    > [1;32mc:\users\jiinn\appdata\local\temp\ipykernel_2956\4210028810.py[0m(2)[0;36mfunc1[1;34m()[0m
    
    

    ipdb>  list
    

    [0;32m      1 [0m[1;32mdef[0m [0mfunc1[0m[1;33m([0m[0ma[0m[1;33m,[0m [0mb[0m[1;33m)[0m[1;33m:[0m[1;33m[0m[1;33m[0m[0m
    [1;32m----> 2 [1;33m    [1;32mreturn[0m [0ma[0m[1;33m/[0m[0mb[0m[1;33m[0m[1;33m[0m[0m
    [0m[0;32m      3 [0m[1;33m[0m[0m
    [0;32m      4 [0m[1;32mdef[0m [0mfunc2[0m[1;33m([0m[0mx[0m[1;33m)[0m[1;33m:[0m[1;33m[0m[1;33m[0m[0m
    [0;32m      5 [0m    [0ma[0m [1;33m=[0m [0mx[0m[1;33m[0m[1;33m[0m[0m
    [0;32m      6 [0m    [0mb[0m [1;33m=[0m [0mx[0m [1;33m-[0m [1;36m1[0m[1;33m[0m[1;33m[0m[0m
    [0;32m      7 [0m    [1;32mreturn[0m [0mfunc1[0m[1;33m([0m[0ma[0m[1;33m,[0m [0mb[0m[1;33m)[0m[1;33m[0m[1;33m[0m[0m
    
    

    ipdb>  up
    

    > [1;32mc:\users\jiinn\appdata\local\temp\ipykernel_2956\4210028810.py[0m(7)[0;36mfunc2[1;34m()[0m
    
    

    ipdb>  list
    

    [0;32m      2 [0m    [1;32mreturn[0m [0ma[0m[1;33m/[0m[0mb[0m[1;33m[0m[1;33m[0m[0m
    [0;32m      3 [0m[1;33m[0m[0m
    [0;32m      4 [0m[1;32mdef[0m [0mfunc2[0m[1;33m([0m[0mx[0m[1;33m)[0m[1;33m:[0m[1;33m[0m[1;33m[0m[0m
    [0;32m      5 [0m    [0ma[0m [1;33m=[0m [0mx[0m[1;33m[0m[1;33m[0m[0m
    [0;32m      6 [0m    [0mb[0m [1;33m=[0m [0mx[0m [1;33m-[0m [1;36m1[0m[1;33m[0m[1;33m[0m[0m
    [1;32m----> 7 [1;33m    [1;32mreturn[0m [0mfunc1[0m[1;33m([0m[0ma[0m[1;33m,[0m [0mb[0m[1;33m)[0m[1;33m[0m[1;33m[0m[0m
    [0m
    

    ipdb>  print(x)
    

    1
    

    ipdb>  up
    

    > [1;32mc:\users\jiinn\appdata\local\temp\ipykernel_2956\2483606204.py[0m(1)[0;36m<module>[1;34m()[0m
    
    

    ipdb>  list
    

    [1;32m----> 1 [1;33m[0mfunc2[0m[1;33m([0m[1;36m1[0m[1;33m)[0m[1;33m[0m[1;33m[0m[0m
    [0m
    

    ipdb>  down
    

    > [1;32mc:\users\jiinn\appdata\local\temp\ipykernel_2956\4210028810.py[0m(7)[0;36mfunc2[1;34m()[0m
    
    

    ipdb>  list
    

    [0;32m      2 [0m    [1;32mreturn[0m [0ma[0m[1;33m/[0m[0mb[0m[1;33m[0m[1;33m[0m[0m
    [0;32m      3 [0m[1;33m[0m[0m
    [0;32m      4 [0m[1;32mdef[0m [0mfunc2[0m[1;33m([0m[0mx[0m[1;33m)[0m[1;33m:[0m[1;33m[0m[1;33m[0m[0m
    [0;32m      5 [0m    [0ma[0m [1;33m=[0m [0mx[0m[1;33m[0m[1;33m[0m[0m
    [0;32m      6 [0m    [0mb[0m [1;33m=[0m [0mx[0m [1;33m-[0m [1;36m1[0m[1;33m[0m[1;33m[0m[0m
    [1;32m----> 7 [1;33m    [1;32mreturn[0m [0mfunc1[0m[1;33m([0m[0ma[0m[1;33m,[0m [0mb[0m[1;33m)[0m[1;33m[0m[1;33m[0m[0m
    [0m
    

    ipdb>  exit

```python
%xmode
Plain
```

    Exception reporting mode: Plain

```python
%pdb
on
```

    Automatic pdb calling has been turned ON

```python
func2(1)
```

    Traceback (most recent call last):
    

      Cell In[11], line 1
        func2(1)
    

      Cell In[1], line 7 in func2
        return func1(a, b)
    

      Cell In[1], line 2 in func1
        return a/b
    

    ZeroDivisionError: division by zero
    


    > [1;32mc:\users\jiinn\appdata\local\temp\ipykernel_2956\4210028810.py[0m(2)[0;36mfunc1[1;34m()[0m
    
    

    ipdb>  list
    

    [0;32m      1 [0m[1;32mdef[0m [0mfunc1[0m[1;33m([0m[0ma[0m[1;33m,[0m [0mb[0m[1;33m)[0m[1;33m:[0m[1;33m[0m[1;33m[0m[0m
    [1;32m----> 2 [1;33m    [1;32mreturn[0m [0ma[0m[1;33m/[0m[0mb[0m[1;33m[0m[1;33m[0m[0m
    [0m[0;32m      3 [0m[1;33m[0m[0m
    [0;32m      4 [0m[1;32mdef[0m [0mfunc2[0m[1;33m([0m[0mx[0m[1;33m)[0m[1;33m:[0m[1;33m[0m[1;33m[0m[0m
    [0;32m      5 [0m    [0ma[0m [1;33m=[0m [0mx[0m[1;33m[0m[1;33m[0m[0m
    [0;32m      6 [0m    [0mb[0m [1;33m=[0m [0mx[0m [1;33m-[0m [1;36m1[0m[1;33m[0m[1;33m[0m[0m
    [0;32m      7 [0m    [1;32mreturn[0m [0mfunc1[0m[1;33m([0m[0ma[0m[1;33m,[0m [0mb[0m[1;33m)[0m[1;33m[0m[1;33m[0m[0m
    
    

    ipdb>  print(b)
    

    0
    

    ipdb>  exit
    
