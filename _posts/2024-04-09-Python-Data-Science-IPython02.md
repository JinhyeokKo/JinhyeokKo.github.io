---
title: Input_And_Output_History
date: 2024-04-09
categories: [ Python Data Science ]
tags: [ IPython ]
layout: post
---

# Input_And_Output_History

## 입력/출력 이력

### In 과 Out 객체

```python
import math
```

```python
math.sin(2)
```

    0.9092974268256817

```python
math.cos(2)
```

    -0.4161468365471424

```python
# 입력값과 출력값을 자동으로 변수에 저장
print("In:", In)
print("Out:", Out)
# 명령어를 순서대로 기록하는 리스트 --> 저장된 순서에 따른 출력 가능
print("\nIn[1]:", In[1])
# 입력 번호를 출력값과 매핑하는 딕셔너리
print("Out[2]:", Out[2])  # _2로 사용 가능
print("\nOut[2] ** 2 + Out[3] ** 2:", Out[2] ** 2 + Out[3] ** 2)
```

    In: ['', 'import math', 'math.sin(2)', 'math.cos(2)', '# 입력값과 출력값을 자동으로 변수에 저장\nprint("In:", In)\nprint("Out:" ,Out)\n# 명령어를 순서대로 기록하는 리스트 --> 저장된 순서에 따른 출력 가능\nprint("\\nIn[1]:", In[1])\n# 입력 번호를 출력값과 매핑하는 딕셔너리\nprint("Out[2]:", Out[2]) # _2로 사용 가능\nprint("\\nOut[2] ** 2 + Out[3] ** 2:", Out[2] ** 2 + Out[3] ** 2)']
    Out: {2: 0.9092974268256817, 3: -0.4161468365471424}
    
    In[1]: import math
    Out[2]: 0.9092974268256817
    
    Out[2] ** 2 + Out[3] ** 2: 1.0

### 밑줄 표시 단축키와 이전 출력값

```python
# 밑줄 개수에 따른 이전 출력값
print(_)
print(__)
```

    -0.4161468365471424
    0.9092974268256817

### 출력값 숨기기

```python
math.sin(2) + math.cos(2);
```

```python
# Out 딕셔너리에도 저장 안됨
6 in Out
```

    False

### 입력값 여러 개 한 번에 접근

```python
%history - n
1 - 3
```

       1: import math
       2: math.sin(2)
       3: math.cos(2)
    
