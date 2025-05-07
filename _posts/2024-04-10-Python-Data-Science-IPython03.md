---
title: IPython_And_Shell_Commands
date: 2024-04-10
categories: [ Python Data Science ]
tags: [ IPython ]
layout: post
---

# IPython_And_Shell_Commands

## IPython과 shell 명령어

```python
%ls
```

     D 드라이브의 볼륨: JIINNN
     볼륨 일련 번호: 20A8-6B0F
    
     D:\A\AI_Programming 디렉터리
    
    2024-04-06  오후 04:53    <DIR>          .
    2024-04-06  오후 04:00    <DIR>          ..
    2024-04-06  오후 04:42    <DIR>          .ipynb_checkpoints
    2024-04-06  오후 04:26             8,460 Basic_IPython.ipynb
    2024-04-06  오후 04:34             3,067 Basic_IPython.md
    2024-04-06  오후 04:40             5,603 Input_And_Output_History.ipynb
    2024-04-06  오후 04:41               944 Input_And_Output_History.md
    2024-04-06  오후 04:53             5,360 IPython_And_Shell_Commands.ipynb
    2024-04-06  오후 04:16               134 myscript.py
                   6개 파일              23,568 바이트
                   3개 디렉터리  233,442,889,728 바이트 남음

```python
# automagic 사용 시 % 생략 가능
pwd
```

    'D:\\A\\AI_Programming'

```python
echo
"출력"
```

    "출력"

### shell에 값 전달 및 받기

```python
contents = %ls
```

     D 드라이브의 볼륨: JIINNN
     볼륨 일련 번호: 20A8-6B0F
    
     D:\A\AI_Programming 디렉터리
    
    2024-04-06  오후 04:53    <DIR>          .
    2024-04-06  오후 04:00    <DIR>          ..
    2024-04-06  오후 04:42    <DIR>          .ipynb_checkpoints
    2024-04-06  오후 04:26             8,460 Basic_IPython.ipynb
    2024-04-06  오후 04:34             3,067 Basic_IPython.md
    2024-04-06  오후 04:40             5,603 Input_And_Output_History.ipynb
    2024-04-06  오후 04:41               944 Input_And_Output_History.md
    2024-04-06  오후 04:53             5,360 IPython_And_Shell_Commands.ipynb
    2024-04-06  오후 04:16               134 myscript.py
                   6개 파일              23,568 바이트
                   3개 디렉터리  233,442,889,728 바이트 남음

```python
print(contents)
```

    None

```python
directory = %pwd
```

```python
print(directory)
```

    D:\A\AI_Programming

```python
type(directory)
```

    str

```python
message = "Hello"
```

```python
%echo
{message}
```

    Hello
    
