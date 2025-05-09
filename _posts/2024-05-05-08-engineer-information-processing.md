---
title: 08. 자료구조
date: 2024-05-05
categories: [정보처리기사]
tags: [정보처리기사]
layout: post
---

## 자료구조

### 정의

- 자료를 효율적으로 사용하기 위해서 자료의 특성에 따라서 분류하여 구성하고 저장 및 처리하는 모든 방법

- 효율적인 자료구조는 프로그램의 실행시간을 단축, 메모리 용량 절약

### 특징

`효율성` : 적절한 자료구조를 선택하여 시스템의 효율을 높임  
`추상화` : 복잡한 자료, 모듈, 시스템 등으로부터 핵심적인 개념을 간추려냄  
`재사용성` : 다양한 프로그램에서 동작할 수 있도록 설계  

### 분류

`선형구조`

- 데이터를 연속적으로 연결한 구조

- 하나의 자료 뒤에 하나의 자료가 존재

- 데이터를 연속적으로 연결한 구조

- 리스트, 스택, 큐, 데크

`비선형구조`

- 데이터를 비연속적으로 연결한 구조

- 하나의 자료 뒤에 여러 개의 자료가 존재할 수 있음

- 자료들 간의 앞뒤 관계가 1 : n 또는 n : n의 관계

- 트리, 그래프

## 선형구조

### 배열 | Array

- 메모리 상에 데이터를 연속으로 배치한 자료구조

- 배열의 각 원소들은 자료형과 기억 공간의 크기가 같음

- 메모리의 물리적인 위치를 순서적으로 결정하는 특징

- 배열의 논리적인 순서는 메모리에 저장되는 물리적인 순서와 동일

- 각 원소의 이름은 고유한 이름이 없고 원소의 위치에 따라 정해짐

- 배열의 접근 방법은 직접 접근(direct access)이며, 빅오 표기법으로 O(1)의 시간복잡도를 가짐

- 원소의 삽입과 삭제 시 데이터 이동으로 인한 시간 복잡도가 증가하기 떄문에 빅오 표기법으로 O(n)의 시간 복잡도를 가짐

### 리스트 | List

`선형 리스트`

- 배열 같이 연속적인 기억장소에 저장되는 리스트 형태

- 임의의 노드에 접근할 때는 인덱스(Index)를 사용하므로 포인터가 없음

> 
> 
> 
> #### 장점
> 
> 
>
> - 가장 간편한 자료구조
> - 저장 효율이 뛰어남
> - 접근 속도가 빠름
> 
> 
> 
> #### 단점
> 
> 
>
> - 자료의 삽입, 삭제가 어려움
> (삽입하거나 삭제할 위치 이후의 모든 자료의 이동 필요)
> 
> 

`연결 리스트`

- 자료를 임의의 공간에 기억시키고, 각 노드의 포인터 부분을 이용해서 서로 연결한 형태

- 각 노드는 데이터를 저장하는 공간과 다음노드를 가리키는 링크(Pointer)정보를 가짐

- 마지막 노드는 다음 공간이 없기 때문에 Null 값을 가짐

> 
> 
> 
> #### 장점
> 
> 
>
> - 자료의 삽입 및 삭제가 용이
> - 희소행렬(행렬 요소가 0이 많은 경우)을 표현할 때 기억장소 이용효율이 좋음
> 
> 
> 
> #### 단점
> 
> 
>
> - 데이터 접근 시 포인터를 찾는 시간이 필요하기 때문에 선형리스트에 비해 느림
> - 포인터를 위한 추가 공간이 필요
> - 중간에 연결이 끊어진다면 다음 노드를 찾기가 힘듬
> 
> 
> 
> #### 종류
> 
> 
> `단순 연결 리스트 | Singly Linked List`
>
> - 한 방향으로 앞에서 뒤로만 연결되어 있는 리스트
> - 가장 마지막 노드의 Link 값은 Null을 가리킴
> 
> `원형 단순 연결 리스트 | Circular Singly Linked List`
>
> - 단순 연결 리스트와 비슷하지만 제일 끝 노드가 제일 앞의 노드를 가리킴
> 
> `이중 연결 리스트 | Doubly Linked List`
>
> - 각 노드 앞, 뒤를 가리키고 있는 리스트
> - 첫 노드와 마지막 노드는 Null을 가리킴
> 
> `원형 이중 연결 리스트 | Circular Doubly Linked List`
>
> - 첫 번째 노드는 마지막 노드를, 마지막 노드는 첫 번쨰 노드를 가리킴
> 
> 

### 스택 | Stack

- 한 방향으로만 자료의 삽입과 삭제가 일어나는 자료구조

- 후입선출, LIFO(Last In First Out) 구조

- Top이라는 스택 공간의 위치를 가리키는 포인터 사용

- 자료의 삽입은 push 연산을 통해서, 자료의 삭제는 pop 연산을 통해서 함

- `Overflow` : 스택이 가득 차 있을 때 Push 연산 수행 시 발생

- `Underflow` : 스택이 비어있을 때 Pop 연산 수행 시 발생

> 
> 
> 
> #### 스택을 이용한 연산
> 
> 
>
> - 인터럽트 처리
> - 수식의 계산
> - 서브루틴의 복귀번지 저장
>   - 호출과 복귀를 처리
> 
> - 웹 브라우저 방문 기록
> - 재귀호출
> - 깊이 우선 탐색(Depth-First Search)
> 
> 
> 
> #### 스택의 삽입 알고리즘
>
> - 스택 포인터를 먼저 증가 ++Top
> 
> 
> 
> ```null
> Top = Top + 1
> If Top > Stack_Size THEN
>     Stack_Overflow
> Else
>     Stack[Top] = Data
> End If
> ```
> 
> 
> 
> 
> #### 스택의 삭제 알고리즘
> 
> 
>
> - 스택 포인터가 위치한 값을 먼저 삭제한 후 감소 Top--
> 
> 
> 
> ```null
> If Top = 0 Then
>     Stack_Underflow
> Else
>     removeS(Top)
>     Top = Top - 1
> End If
> ```
> 
> 
> 

### 큐 | Queue

- 한 쪽 끝에서 삽입이 이루어지고, 반대쪽 끝에서 삭제가 이루어지는 자료구조

- 선입선출, FIFO(First In First Out) 구조, 시간복잡도 O(1)

- 자료의 삽입은 enQueue 연산을 통해서, 자료의 삭제는 deQueue 연산을 통해서 함

- enQueue 연산 시 rear 포인터를 이용하고, deQueue 연산 시 front 포인터 사용

> 
> 
> 
> #### 큐를 이용한 연산
> 
> 
>
> - 인쇄작업 대기목록
> - 프로세스 관리
> - 너비 우선 탐색(Breadth-First Search)
> 
> 

### 데크 | Deque, Double Ended Queue

- Stack과 Queue의 장점을 빼서 구성된 자료구조

- 입력/삭제가 양쪽 끝에서 모두 발생할 수 있는 자료구조

- Scroll | 입력 제한 데크 : 입력이 한 쪽에서만 발생하고 출력은 양쪽에서 일어남

- Shelf | 출력 제한 데크 : 입력은 양쪽에서 일어나고 출력은 한 쪽에서만 일어남

## 비선형구조

### 트리 | Tree

`개념`

- 노드(Node)와 간선(선분, Branch)으로 이루어진 자료구조

- 데이터의 각 요소들을 계층적으로 구조화시키고자 할 때 사용하는 자료구조

- 데이터의 각 요소들은 단순한 나열이 아닌, 부모-자식 관계의 계층적 구조로 표현

- 그래프의 일종으로 하나 이상의 노드를 가지고 정점 사이에 사이클이 형성되지 않음

`용어`

> 
> `노드 | Node`  
> : 트리의 기본 구성 요소  
> `근 노드 | Root Node`  
> : 가장 상위에 위치한 트리의 시작 노드  
> `레벨 | Level`  
> : 근 노드를 기준으로 특정 노드까지의 경로 길이
>
> - 내부 경로 길이(I) : 루트 노드에서 모든 노드에 도달하는 거리의 합  
>   - I = Level(1) X Level(1)의 노드 수 + ... + Level(n) X Level(n)의 노드 수
> 
> - 외부 경로 길이(E) : 루트 노드에서 단말 노드에 도달하는 거리의 합
>   - E = I + 2N | 외부 경로 길이 = 내부 경로 길이 + 2 X 내부노드의 수
> 
> 
> `조상 노드 | Ancestors Node`  
> : 특정 노드에서 루트에 이르는 경로상의 노드
>
> `자식 노드 | Child Node`  
> : 특정 노드에 연결된 다름 레벨의 노드
>
> `부모 노드 | Parent Node`  
> : 특정 노드에 연결된 이전 레벨의 노드
> 
> `형제 노드 | Sibling Node`  
> : 같은 부모를 가진 노드
> 
> `깊이 | Depth`  
> : 트리의 최대 레벨
>
> `차수 | Degree`  
> : 특정 노드에 연결된 자식의 수
>
> `트리의 차수 | Degree of Tree`  
> : 자식이 가장 많은 노드의 자식 노드 개수
>
> `단말 노드 | Terminal Node, Leaf Node`  
> : 자식이 없는 노드

`트리의 순회 방법`

- 트리의 순회란 트리 구조의 각 노드를 전부 한 번씩 방문하여 검색하는 방법

> 
> 
> 
> #### 전위 순회 | Pre-Order
> 
> 
>
> - 근(부모)노드부터 시작해 선 좌측 자식(단말)노드, 후 우측 자식(단말)노드로 탐색
> 
> 
> 
> #### 중위 순회 | In-Order
> 
> 
>
> - 좌측 단말(자식)노드부터 시작해 선 부모노드, 후 우측 단말(자식)노드로 탐색
> 
> 
> 
> #### 후위 순회 | Post-Order
> 
> 
>
> - 좌측 단말(자식)노드부터 시작해 우측 단말(자식)노트, 마지막으로 근(부모)노드 탐색
> 
> 

`트리의 종류`

> 
> 
> 
> #### 이진 트리 | Binary Tree
> 
> 
>
> - 차수가 2이하로 구성된 트리
> - 깊이가 H인 이진트리의 최대 노드 수 : 2^H-1
> - 이진 트리의 특정 레벨 L의 최대 노드 수 : 2(L-1)
> 
> 
> 
> #### 완전 이진 트리 | Complete Binary Tree
> 
> 
>
> - 마지막 레벨을 제외하고 모든 노드가 채워진 트리
> - 중간에 노드가 비어있으면 안됨
> - 힙 정렬(heap sort)에서 힙의 구성을 위해 사용하는 트리
> 
> 
> 
> #### 포화 이진 트리 | Full Binary Tree
> 
> 
>
> - 모든 레벨에서 모든 노드가 채워진 트리
> - 깊이가 H인 포화 이진트리 노드의 수 : 2^H-1
> - 모든 레벨 L의 노드 수 : 2(L-1)
> 
> 
> 
> #### 편향 이진 트리 | Skewed Binary Tree
> 
> 
>
> - 왼쪽이나 오른쪽으로 편향된 트리
> - 노드가 N개인 편향 이진트리의 높이는 최악의 경우 O(N)이 될 수 있음
> 
> 
> 
> #### 균형 이진 트리 | Balanced Binary Tree
> 
> 
>
> - 모든 노드의 왼쪽과 오른쪽 서브 트리 높이가 1이상 차이가 나지 않는 트리
> 
> 
> 
> #### 이진 탐색 트리 | Binary Search Tree
> 
> 
>
> - 정렬된 이진 트리
> - 이진탐색의 효율적인 탐색 능력을 유지하면서, 빈번한 자료 입력과 삭제를 가능하게끔 고안된 트리
> - 노드의 왼쪽 하위 트리에는 노드의 값보다 작은 값만 포함
> - 노드의 오른쪽 하위 트리에는 노드의 값보다 큰 값만 포함
> 
> 
> 
> #### AVL 트리
> 
> 
>
> - 스스로 균형을 잡는 이진 탐색 트리, 탐색 시간이 빠른 장점
> - 각 노드의 왼쪽 서브트리의 높이와 오른쪽 서브트리의 높이 차이가 1이하인 이진 탐색 트리
> 
> 
> 
> #### B-트리
> 
> 
>
> - DB와 File System에서 널리 사용되는 트리
> - 이진 트리를 확장해 하나의 노드가 가질 수 있는 자식 노드의 최대 숫자가 2보다 큰 트리 구조
> 
> 
> 
> #### 신장 트리
> 
> 
>
> - 그래프에서 간선들이 사이클이 생기지 않도록 만든 트리
> 
>

### 그래프 | Graph

`개념`

- `G = (V, E)` : 그래프 G는 2개의 집합 V와 E로 구성되어 있는 자료구조

- `정점 | Vertex` : 노드들의 집합

- `간선 | Edge` : 정점들 사이의 상호 연결의 집합, 노드를 연결하는 선

`무방향 그래프 | Undirected Graph`

- 간선을 표현하는 두 정점 사이의 순서가 없는 그래프

- n개의 정점으로 구성된 방향 그래프의 최대 간선 수 : n(n - 1)/2

`방향 그래프 | Directed Graph`

- 간선을 표현하는 두 정점 사이의 순서가 있는 그래프

- n개의 정점으로 구성된 방향 그래프의 최대 간선수는 n(n - 1)

`그래프의 표현 방법`

- `인접 행렬 | Adjacency Matrix`  
  - 그래프의 정점을 2차원 배열로 만든 것

- `인접 리스트 | Adjacency List`  
    - 그래프의 각 정점에 인접한 정점들을 연결리스트(Linked List)로 표현하는 방법

`그래프의 순회 방법`

- `깊이 우선 탐색 | Depth-First Search`  
  - 최대한 깊이 내려간 뒤, 더 이상 깊이 갈 곳이 없을 경우, 백트래킹하여 옆으로 이동
  - 스택을 이용

- `너비 우선 탐색 | Breadth-First Search`  
    - 최대한 넓게 이동한 다음, 더 이상 갈 수 없을 때 아래로 이동
  - 큐를 이용

## 수식 표기법

### 종류

`중위 표기법 | Infix notation`

- 연산자가 피연산자 사이에 있는 표기법 | A + B

`전위 표기법 | Prefix notation`

- 피연산자들 앞에 연산자가 있는 표기법 | + AB

`후위 표기법 | Post notation`

- 피연산자들 뒤에 연산자가 있는 표기법 | AB +

### 변환

`중위 표기법 -> 전위 표기법`

- 연산자 우선순위에 따라 데이터, 연산자, 데이터가 나오게 되면 연산자를 앞으로 넣어줌

- 이때, 변경된 전위식은 하나의 데이터가 됨

> 
>
> 중위. A * (B + C) / D - E
> 1. A * + BC / D - E
> 2. * A + BC / D - E
> 3. / * A + BCD - E  
> 
> 전위. - / * A + BCDE
> 

`중위 표기법 -> 후위 표기법`

- 연산자 우선순위에 따라 데이터, 연산자, 데이터가 나오게 되면 연산자를 뒤로 넣어줌

- 이때, 변경된 후위식은 하나의 데이터가 됨

> 
>
> 중위. A * (B + C) / D - E
> 1. A * BC + / D - E
> 2. ABC + * / D - E
> 3. ABC + * D / - E
>
> 후위. ABC + * D / E -
> 

`전위 표기법 -> 중위 표기법`

- 연산자, 데이터, 데이터가 나오는 식을 찾아 연산자를 가운데로 넣어주면서 중위식으로 변경

- 이때, 변경된 중위식은 하나의 데이터가 됨

> 
> 전위. - / * A + BCDE
> 1. - / * A(B + C)DE
> 2. - / A * (B + C)DE
> 3. - A * (B + C) / DE
>
> 중위. A * (B + C) / D - E
> 

`후위 표기법 -> 중위 표기법`

- 데이터, 데이터, 연산자가 나오는 식을 찾아 연산자를 가운데로 넣어주면서 중위식으로 변경

- 이때, 변경된 중위식은 하나의 데이터가 됨

> 
> 후위. ABC + * D / E -
> 1. A(B + C) * D / E -
> 2. A * (B + C)D / E -
> 3. A * (B + C) / DE-
> 
> 중위. A * (B + C) / D - E
> 

## 해싱 | Hashing

### 개념

- 키값을 해시 함수에 대입시켜 나온 결과를 주소로 사용하여 바로 값에 접근할 수 있게 하는 방법

- Search, Insert, Delete를 단시간(O(1))에 할 수 있게 만들어주는 기법

`해싱 구성요소`

- `Hash table`
  - 키와 값으로 구성되어 있는 자료구조
  - 키에 대한 연산에 의해 직접 접근이 가능한 구조

- `Hashing`
  - 해시 테이블을 이용한 탐색

- `Hash function`
  - 임의의 길이의 데이터를 고정된 길이의 데이터로 만드는 함수
  - 키 값을 이용해서 값이 저장된 주소 값을 바꾸기 위한 함수

### 해시 테이블

`버킷 | Bucket`

- 해시 테이블의 행 인덱스

- 하나의 주소를 가지고 여러 개의 레코드를 저장할 수 있는 파일의 한 구역

- 여러 개의 슬롯으로 구성

`슬롯 | Slot`

- 해시 테이블의 열 인덱스

- 하나의 레코드를 저장할 수 있는 공간

`충돌 | Collision`

- 다른 레코드가 같은 키를 가지는 충돌 현상

`동의어 | Synonym`

- 동일한 홈 주소로 인하여 충돌이 일어난 레코드의 집합

- 키 값이 같은 레코드의 집합

- 동의어가 슬롯의 개수보다 많으면 오버플로우 발생

`오버플로우 | Overflow`

- 더 이상 빈 공간이 없는 상태

- 하나의 버킷 내에 더 이상 레코드를 저장할 슬롯이 없는 상태

### 해싱 함수 종류

`제산법 | Division`

- 레코드의 값을 나누어 나머지 값을 주소로 지정하는 방법

`중간 제곱법 | Mid Square`

- 키 값을 제곱한 후에 중간의 몇 자리를 선택하고 그 중간 값을 주소로 이용

`중첩법 | Folding`

- 주어진 키를 여러 부분으로 나누고, 각 부분의 값을 더하거나 베타적 논리합(XOR | Exclusive OR)연산을 통하여 나온 결과로 주소를 취하는 방법

`숫자(계수) 분석법 | Digit Analysis`

- 주어진 모든 키 값들에서 그 키를 구성하는 자릿수들의 분포를 조사하여 비교적 고른 분포를 보이는 자릿수들을 필요한 만큼 택하는 방법

`기수 변환법 | Radix Exchange`

- 주어진 키의 값을 다른 진법으로 변환하여 얻은 값을 주소로 사용

`무작위 방법 | Pseudo Random`

- 난수를 발생, 탐색을 위한 해시의 경우 충돌이 발생하면 다음 난수를 이용

### 오버플로우 처리 방법

`개방 주소법 | Open Addressing`

- 선형 방법(Linear Method)이라고도 함

- Collision이 발생했을 때 그 다음 버킷들을 차례로 하나씩 검색하여 최초로 나오는 빈 버킷에 해당 데이터를 저장

`폐쇄 주소법 | Close Addressing`

- Overflow 된 레코드들을 별도의 Overflow영역에 저장하고 Chain(Pointer)으로 버킷에 연결
연결 리스트(Linked List)를 사용

`재해싱 | Rehashing`

- Collision이 발생하면 새로운 해싱 함수로 새로운 주소를 구하는 방식