---
title: ArrayList & LinkedList
date: 2025-05-19
categories: [ Data Structures & Algorithms ]
tags: [ Java Collection Framework ]
layout: post
---

# ArrayList & LinkedList

### ArrayList

* 동적 배열(Resizable Array)
* 연속된 메모리 공간에 데이터 저장
* 내부적으로 `Object[]`배열을 사용
* 용량이 부족할 경우 더 큰 배열을 생성하여 데이터 복사

```java
public class ArrayList<E> extends AbstractList<E> implements List<E>, RandomAccess, Cloneable, Serializable {
    // 기본 내부 배열
    private static final int DEFAULT_CAPACITY = 10;
    transient Object[] elementData;
    private int size;
    
    // 크기 증가 로직
    private Object[] grow(int minCapacity) {
        int oldCapacity = elementData.length;
        // 일반적으로 1.5배로 크기 증가
        int newCapacity = oldCapacity + (oldCapacity >> 1);
        return elementData = Arrays.copyOf(elementData, newCapacity);
    }
}
```

### LinkedList

* 이중 연결 리스트(Doubly Linked List) 구현체
* 노드 단위로 데이터와 포인터를 저장
* 각 노드가 데이터와 이전/다음 노트 참조를 포함
* 각 노드는 메모리에 독립적으로 존재하며 참조로 연결

```java
public class LinkedList<E> extends AbstractSequentialList<E> implements List<E>, Deque<E>, Cloneable, Serializable {
    transient int size = 0;
    transient Node<E> first; // 첫 번째 노드
    transient Node<E> last;  // 마지막 노드
    
    // 노드 구조
    private static class Node<E> {
        E item;
        Node<E> next;
        Node<E> prev;
        
        Node(Node<E> prev, E element, Node<E> next) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }
    }
}
```

## 공통점

* 둘 다 Java의 List 인터페이스를 구현하여 동일한 메서드 세트 제공
* 삽입 순서 유지 및 인덱스 기반 접근 가능
* 동일 요소의 중복 저장 허용
* NULL 요소 저장 가능
* 두 구현체 모두 기본적으로 스레드 안전하지 않음

## 차이점

### 메모리 사용 및 구조
* ArrayList
  * 연속된 메모리 블록에 데이터 저장 
  * 내부 배열의 크기를 초과할 때 리사이징 발생(일반적으로 현재 크기의 1.5배로 증가)
  * 참조 오버헤드가 적음(요소당 추가 참조 없음)

* LinkedList 
  * 각 노드는 데이터와 이전/다음 노드 참조를 포함 
  * 노드마다 추가 메모리 필요(일반적으로 요소당 2개의 참조를 추가로 저장)
  * 동적 크기 조정에 따른 배열 복사 오버헤드 없음

| 항목     | ArrayList               | LinkedList             |
|:-------|:------------------------|:-----------------------|
| 메모리 사용 | 효율적                     | 추가 오버헤드(노드당 추가 참조 저장)  |
| 객체 수   | 요소만큼                    | 요소 + 노드당 2개의 참조        |
| 캐시 성능  | 우수 (배열 기반, locality 좋음) | 낮음 (포인터 구조로 비연속 메모리)   |
| GC 부하  | 낮음                      | 높음 (노드마다 객체 생성)        |

#### 메모리 사용량 차이

`ArrayList`  

* 기본 ArrayList 객체
  * 객체 헤더: 12바이트(64비트 JVM 기준)
  * 내부 배열 참조: 8바이트 
  * size 필드: 4바이트 
  * modCount 필드: 4바이트 
  * 패딩: 4바이트 
  * 총 기본 객체: ~32바이트

* 내부 배열
  * 배열 객체 헤더: 16바이트
  * 길이 필드: 4바이트
  * 참조 배열: 요소당 8바이트 × 용량
  * 패딩: 4바이트
  * 총 배열: 24 + (8 × 용량)바이트

* 요소당 실질적 오버헤드
  * ArrayList 자체 요소당: (24 + (8 × 용량)) ÷ 요소 수
  * 빈 공간이 없을 때 요소당: ~8바이트 (참조 크기만)

`LinkedList`

* 노드 객체당 메모리
  * 객체 헤더: 12바이트(64비트 JVM 기준)
  * 데이터 참조: 8바이트 (요소 객체 참조)
  * 이전 노드 참조: 8바이트 
  * 다음 노드 참조: 8바이트 
  * 패딩: 0-4바이트 (8바이트 경계 정렬)
  * 총 노드당: 36-40바이트 (데이터 객체 자체 크기 제외)

1만개의 요소를 저장할 경우 ArrayList는 약 104KB를 사용하게 되고 LinkedList는 약 360~400KB를 사용하게 됩니다.  
ArrayList는 요소 생성 시 참조만 저장하고 요소당 참조 크기만큼 고정 오버헤드가 발생하지만, LinkedList는 요소 생성 시 새 노드 객체를 생성하며 오버헤드를 발생시킵니다.  
이로 인해 LinkedList는 노드 객체가 많아 가비지 컬렉션의 부하를 증가시킵니다.

#### 성능 비교표

| 연산                | ArrayList  | LinkedList        | 설명                                          |
|:------------------|:-----------|:------------------|:--------------------------------------------|
| 접근(Random Access) | O(1)       | O(n)              | ArrayList는 인덱스로 직접 접근, LinkedList는 순차 탐색 필요 |
| 삽입/삭제 (끝)         | O(1) (평균)  | O(1)              | ArrayList는 용량 증가 시 O(n), 그렇지 않으면 O(1)       |
| 삽입/삭제 (중간)        | O(n)       | O(n) (탐색 후 O(1))  | LinkedList는 위치 찾는 데 O(n), 그 후 삽입은 O(1)      |
| 삽입/삭제 (앞)         | O(n)       | O(1)              | ArrayList는 요소 이동 필요, LinkedList는 참조만 변경     |
| contains/search   | O(n)       | O(n)              | 둘 다 순차 탐색 필요                                |

### Iterator(반복자) 구현 차이

#### ArrayList
기본적으로 인덱스 기반 순회를 하며 현재 위치(cursor)를 인덱스로 추적합니다.  
배열에 직접 접근하여 요소를 반환합니다.

* 연속된 메모리 접근(캐시 효율적)
* 단방향 순회가 효율적 O(n)
* 요소 추가/삭제 시 인덱스 기반 재정렬 필요 O(n)

```java
// ArrayList의 iterator 내부 구현 (유사 코드)
private class Itr implements Iterator<E> {
    int cursor;       // 다음에 반환할 요소의 인덱스
    int lastRet = -1; // 마지막으로 반환한 요소의 인덱스
    int expectedModCount = modCount;
    
    public boolean hasNext() {
        return cursor != size;
    }
    
    public E next() {
        checkForComodification();
        int i = cursor;
        if (i >= size)
            throw new NoSuchElementException();
        Object[] elementData = ArrayList.this.elementData;
        if (i >= elementData.length)
            throw new ConcurrentModificationException();
        cursor = i + 1;
        return (E) elementData[lastRet = i];
    }
    // ... 기타 메서드
}
```

#### LinkedList
노드 참조를 기반으로 순회하며 현재 노드와 다음 노드 참조를 유지합니다.
연결된 참조를 따라가며 순회합니다.

* 불연속적인 메모리 접근(캐시 비효율적)
* 양방향 순회가 효율적(ListIterator 제공) O(n)
* 노드 참조만 변경하여 효율적 수정 가능 O(1)

```java
// LinkedList의 iterator 내부 구현 (유사 코드)
private class ListItr implements ListIterator<E> {
    private Node<E> lastReturned;
    private Node<E> next;
    private int nextIndex;
    private int expectedModCount = modCount;
    
    public boolean hasNext() {
        return nextIndex < size;
    }
    
    public E next() {
        checkForComodification();
        if (!hasNext())
            throw new NoSuchElementException();
            
        lastReturned = next;
        next = next.next;
        nextIndex++;
        return lastReturned.item;
    }
    // ... 기타 메서드
}
```

## 활용 패턴 및 최적화

### ArrayList 선호 상황

* 인덱스 기반 접근이 빈번할 때(랜덤 액세스가 많은 경우)
* 요소 추가/삭제가 주로 끝에서 발생할 때
* 요소 수가 많고 처리량이 중요할 때(대규모 데이터 처리)
* 요소당 메모리 사용량이 중요할 때(메모리가 제한적인 환경이거나 공간 효율이 중요할 경우)

### LinkedList 선호 상황

* 삽입/삭제가 빈번한 경우 (특히 앞이나 중간)
* 큐/스택 같은 구조로 활용할 때 (poll, peek 등)
* 사전에 크기를 알 수 없는 경우(크기 예측이 어려울 때)
* 요소를 다른 컬렉션으로 옮길 때(여러 컬렉션에서 요소 이동 시 효율적)

### 최적 성능을 위한 팁

#### ArrayList

* 예상 요소 수를 알 때 생성자에 지정

```java
// 최적의 초기 용량 지정
ArrayList<String> list = new ArrayList<>(10000);
```

* trimToSize() : 사용 후 여분 공간 제거

```java
list.trimToSize(); // 사용하지 않는 메모리 반환
```

* addAll() 등의 벌크 연산 활용

```java
// 개별 추가보다 벌크 추가가 효율적
list.addAll(Arrays.asList(array));
```

#### LinkedList

* 특정 위치에서 반복 작업 시 ListIterator 활용

```java
ListIterator<String> iter = list.listIterator(index);
while (iter.hasNext()) {
    // 특정 위치에서부터 효율적인 접근
}
```

* 첫/끝 요소 양방향 접근 메서드 사용

```java
linkedList.addFirst(item); // 시작에 추가 O(1)
linkedList.addLast(item);  // 끝에 추가 O(1)
```

* 큐/스택 작업에 Deque 인터페이스 활용

```java
LinkedList<String> deque = new LinkedList<>();
deque.push(item);  // 스택처럼 사용
deque.offer(item); // 큐처럼 사용
```

## 요약

### 핵심 개념 비교

| 항목 | ArrayList | LinkedList |
|:-----|:-----------|:------------|
| 구현 기반 | 동적 배열(resizable array) | 이중 연결 리스트(doubly-linked list) |
| 메모리 구조 | 연속적인 메모리 공간에 저장 | 독립된 노드들이 참조로 연결됨 |
| 구현 인터페이스 | List, RandomAccess, Cloneable, Serializable | List, Deque, Cloneable, Serializable |
| 내부 요소 | Object[] 배열 | Node<E> 객체(이전/다음 노드 참조 포함) |
| 메모리 효율성 | 높음(참조 오버헤드 없음) | 낮음(노드당 추가 참조 저장) |
| 크기 변경 | 용량 초과 시 더 큰 배열 생성 및 복사(일반적으로 1.5배) | 동적으로 노드 추가/제거(재할당 없음) |
| 기본 초기 용량 | 10 | 없음(필요에 따라 노드 생성) |
| 랜덤 액세스 | 지원(O(1)) | 지원(O(n), 비효율적) |
| 캐시 지역성 | 좋음(연속 메모리) | 나쁨(분산된 메모리) |
| 양방향 작업 | 제한적 | 기본 지원(Deque 인터페이스) |
| 추가 기능 | 없음 | 스택, 큐 기능 내장 |

### 테스트 환경 요약
- 리스트 크기: 1,000,000 요소
- 작업 수: 10,000 회
- 실행 횟수: 3회

### 성능 비교

| 작업 유형  | ArrayList | LinkedList  | 평균 비율    | 우수한 자료구조           |
|:-------|:----------|:------------|:---------|:-------------------|
| 초기 채우기 | 14.54ms   | 151.72ms    | 10.4x    | ArrayList          |
| 랜덤 접근  | 1.70ms    | 11,739.34ms | ~36,337x | ArrayList          |
| 맨 앞 삽입 | 11.07ms   | 0.28ms      | 58.8x    | LinkedList         |
| 맨 뒤 삽입 | 0.18ms    | 0.23ms      | 1.4x     | 비슷함(약간 ArrayList)  |
| 중간 삽입  | 23.54ms   | 73.16ms     | 7.6x     | ArrayList          |
| 순차 탐색  | 3.00ms    | 6.32ms      | 2.8x     | ArrayList          |
| 맨 앞 삭제 | 0.86ms    | 0.05ms      | 26.3x    | LinkedList         |
| 중간 삭제  | 0.38ms    | 8.20ms      | 22.3x    | ArrayList          |
| 맨 뒤 삭제 | 0.77ms    | 0.74ms      | 0.9x     | 비슷함(약간 LinkedList) |


<details>
<summary>테스트 결과</summary>

```
List size: 1000000, Operations: 10000, Runs: 3
--------------------------------------------------------------------------------

RUN #1
Filling lists with 1000000 elements...
Time to fill ArrayList: 20.62 ms
Time to fill LinkedList: 144.05 ms
--------------------------------------------------
Random Access Test (10000 operations):
ArrayList random access time: 2.71 ms
LinkedList random access time: 11342.90 ms
Ratio: 4190.1x
--------------------------------------------------
Insert at Beginning Test (10000 operations):
ArrayList insert at beginning time: 11.41 ms
LinkedList insert at beginning time: 0.42 ms
Ratio: 26.8x
--------------------------------------------------
Insert at End Test (10000 operations):
ArrayList insert at end time: 0.15 ms
LinkedList insert at end time: 0.24 ms
Ratio: 1.6x
--------------------------------------------------
Insert in Middle Test (10000 operations):
ArrayList insert in middle time: 56.08 ms
LinkedList insert in middle time: 61.35 ms
Ratio: 1.1x
--------------------------------------------------
Sequential Traversal Test:
ArrayList sequential traversal time: 5.54 ms
LinkedList sequential traversal time: 6.00 ms
Ratio: 1.1x
--------------------------------------------------
Remove from Beginning Test (1000 operations):
ArrayList remove from beginning time: 1.34 ms
LinkedList remove from beginning time: 0.10 ms
Ratio: 13.9x
--------------------------------------------------
Remove from Middle Test (1000 operations):
ArrayList remove from middle time: 0.41 ms
LinkedList remove from middle time: 5.36 ms
Ratio: 13.0x
--------------------------------------------------
Remove from End Test (10000 operations):
ArrayList remove from end time: 0.51 ms
LinkedList remove from end time: 0.50 ms
Ratio: 1.0x
--------------------------------------------------

RUN #2
Filling lists with 1000000 elements...
Time to fill ArrayList: 15.38 ms
Time to fill LinkedList: 59.43 ms
--------------------------------------------------
Random Access Test (10000 operations):
ArrayList random access time: 2.24 ms
LinkedList random access time: 8531.02 ms
Ratio: 3807.5x
--------------------------------------------------
Insert at Beginning Test (10000 operations):
ArrayList insert at beginning time: 10.89 ms
LinkedList insert at beginning time: 0.34 ms
Ratio: 31.6x
--------------------------------------------------
Insert at End Test (10000 operations):
ArrayList insert at end time: 0.33 ms
LinkedList insert at end time: 0.34 ms
Ratio: 1.0x
--------------------------------------------------
Insert in Middle Test (10000 operations):
ArrayList insert in middle time: 7.22 ms
LinkedList insert in middle time: 73.23 ms
Ratio: 10.1x
--------------------------------------------------
Sequential Traversal Test:
ArrayList sequential traversal time: 1.44 ms
LinkedList sequential traversal time: 4.81 ms
Ratio: 3.3x
--------------------------------------------------
Remove from Beginning Test (1000 operations):
ArrayList remove from beginning time: 0.61 ms
LinkedList remove from beginning time: 0.03 ms
Ratio: 23.8x
--------------------------------------------------
Remove from Middle Test (1000 operations):
ArrayList remove from middle time: 0.37 ms
LinkedList remove from middle time: 9.71 ms
Ratio: 26.4x
--------------------------------------------------
Remove from End Test (10000 operations):
ArrayList remove from end time: 1.30 ms
LinkedList remove from end time: 1.42 ms
Ratio: 1.1x
--------------------------------------------------

RUN #3
Filling lists with 1000000 elements...
Time to fill ArrayList: 7.63 ms
Time to fill LinkedList: 251.68 ms
--------------------------------------------------
Random Access Test (10000 operations):
ArrayList random access time: 0.15 ms
LinkedList random access time: 15344.09 ms
Ratio: 101014.4x
--------------------------------------------------
Insert at Beginning Test (10000 operations):
ArrayList insert at beginning time: 10.90 ms
LinkedList insert at beginning time: 0.09 ms
Ratio: 117.9x
--------------------------------------------------
Insert at End Test (10000 operations):
ArrayList insert at end time: 0.07 ms
LinkedList insert at end time: 0.10 ms
Ratio: 1.5x
--------------------------------------------------
Insert in Middle Test (10000 operations):
ArrayList insert in middle time: 7.31 ms
LinkedList insert in middle time: 84.91 ms
Ratio: 11.6x
--------------------------------------------------
Sequential Traversal Test:
ArrayList sequential traversal time: 2.02 ms
LinkedList sequential traversal time: 8.16 ms
Ratio: 4.0x
--------------------------------------------------
Remove from Beginning Test (1000 operations):
ArrayList remove from beginning time: 0.64 ms
LinkedList remove from beginning time: 0.02 ms
Ratio: 41.2x
--------------------------------------------------
Remove from Middle Test (1000 operations):
ArrayList remove from middle time: 0.35 ms
LinkedList remove from middle time: 9.54 ms
Ratio: 27.5x
--------------------------------------------------
Remove from End Test (10000 operations):
ArrayList remove from end time: 0.49 ms
LinkedList remove from end time: 0.31 ms
Ratio: 0.6x
--------------------------------------------------
```

</details>


<details>
<summary>코드 보기</summary>

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;

public class ListPerformanceComparison {
    
    private static final int LIST_SIZE = 1_000_000;
    private static final int NUM_OPERATIONS = 10_000;
    private static final int NUM_RUNS = 3;
    private static final Random random = new Random();
    
    public static void main(String[] args) {
        System.out.println("Running performance comparison between ArrayList and LinkedList...");
        System.out.println("List size: " + LIST_SIZE + ", Operations: " + NUM_OPERATIONS + ", Runs: " + NUM_RUNS);
        System.out.println("-".repeat(80));
        
        // Run multiple times to get more stable results
        for (int run = 1; run <= NUM_RUNS; run++) {
            System.out.println("\nRUN #" + run);
            
            // Create new instances for each test to avoid JVM warmup bias
            ArrayList<Integer> arrayList = new ArrayList<>(LIST_SIZE);
            LinkedList<Integer> linkedList = new LinkedList<>();
            
            // Fill both lists
            System.out.println("Filling lists with " + LIST_SIZE + " elements...");
            long startArrayFill = System.nanoTime();
            for (int i = 0; i < LIST_SIZE; i++) {
                arrayList.add(i);
            }
            long arrayFillTime = System.nanoTime() - startArrayFill;
            
            long startLinkedFill = System.nanoTime();
            for (int i = 0; i < LIST_SIZE; i++) {
                linkedList.add(i);
            }
            long linkedFillTime = System.nanoTime() - startLinkedFill;
            
            System.out.printf("Time to fill ArrayList: %.2f ms%n", arrayFillTime / 1_000_000.0);
            System.out.printf("Time to fill LinkedList: %.2f ms%n", linkedFillTime / 1_000_000.0);
            System.out.println("-".repeat(50));
            
            // 1. Random Access Test
            runRandomAccessTest(arrayList, linkedList);
            
            // 2. Insert at beginning
            runInsertAtBeginningTest(arrayList, linkedList);
            
            // 3. Insert at end
            runInsertAtEndTest(arrayList, linkedList);
            
            // 4. Insert in middle
            runInsertInMiddleTest(arrayList, linkedList);
            
            // 5. Sequential traversal
            runSequentialTraversalTest(arrayList, linkedList);
            
            // 6. Remove from beginning 
            runRemoveFromBeginningTest(arrayList, linkedList);
            
            // 7. Remove from middle
            runRemoveFromMiddleTest(arrayList, linkedList);
            
            // 8. Remove from end
            runRemoveFromEndTest(arrayList, linkedList);
        }
        
        System.out.println("\nPerformance comparison completed!");
    }
    
    private static void runRandomAccessTest(ArrayList<Integer> arrayList, LinkedList<Integer> linkedList) {
        System.out.println("Random Access Test (" + NUM_OPERATIONS + " operations):");
        
        // Generate random indices in advance
        int[] randomIndices = new int[NUM_OPERATIONS];
        for (int i = 0; i < NUM_OPERATIONS; i++) {
            randomIndices[i] = random.nextInt(LIST_SIZE);
        }
        
        // Test ArrayList
        long startArrayRandom = System.nanoTime();
        for (int i = 0; i < NUM_OPERATIONS; i++) {
            int idx = randomIndices[i];
            int val = arrayList.get(idx);
        }
        long arrayRandomTime = System.nanoTime() - startArrayRandom;
        
        // Test LinkedList
        long startLinkedRandom = System.nanoTime();
        for (int i = 0; i < NUM_OPERATIONS; i++) {
            int idx = randomIndices[i];
            int val = linkedList.get(idx);
        }
        long linkedRandomTime = System.nanoTime() - startLinkedRandom;
        
        System.out.printf("ArrayList random access time: %.2f ms%n", arrayRandomTime / 1_000_000.0);
        System.out.printf("LinkedList random access time: %.2f ms%n", linkedRandomTime / 1_000_000.0);
        System.out.printf("Ratio: %.1fx%n", (double) linkedRandomTime / arrayRandomTime);
        System.out.println("-".repeat(50));
    }
    
    private static void runInsertAtBeginningTest(ArrayList<Integer> arrayList, LinkedList<Integer> linkedList) {
        System.out.println("Insert at Beginning Test (" + NUM_OPERATIONS + " operations):");
        
        // Make copies to avoid modifying the original lists
        ArrayList<Integer> arrayListCopy = new ArrayList<>(arrayList.subList(0, Math.min(10000, LIST_SIZE))); 
        LinkedList<Integer> linkedListCopy = new LinkedList<>(linkedList.subList(0, Math.min(10000, LIST_SIZE)));
        
        // Test ArrayList
        long startArrayInsertBegin = System.nanoTime();
        for (int i = 0; i < NUM_OPERATIONS; i++) {
            arrayListCopy.add(0, i);
        }
        long arrayInsertBeginTime = System.nanoTime() - startArrayInsertBegin;
        
        // Test LinkedList
        long startLinkedInsertBegin = System.nanoTime();
        for (int i = 0; i < NUM_OPERATIONS; i++) {
            linkedListCopy.addFirst(i);
        }
        long linkedInsertBeginTime = System.nanoTime() - startLinkedInsertBegin;
        
        System.out.printf("ArrayList insert at beginning time: %.2f ms%n", arrayInsertBeginTime / 1_000_000.0);
        System.out.printf("LinkedList insert at beginning time: %.2f ms%n", linkedInsertBeginTime / 1_000_000.0);
        System.out.printf("Ratio: %.1fx%n", (double) arrayInsertBeginTime / linkedInsertBeginTime);
        System.out.println("-".repeat(50));
    }
    
    private static void runInsertAtEndTest(ArrayList<Integer> arrayList, LinkedList<Integer> linkedList) {
        System.out.println("Insert at End Test (" + NUM_OPERATIONS + " operations):");
        
        // Make copies to avoid modifying the original lists
        ArrayList<Integer> arrayListCopy = new ArrayList<>(NUM_OPERATIONS);
        LinkedList<Integer> linkedListCopy = new LinkedList<>();
        
        // Test ArrayList
        long startArrayInsertEnd = System.nanoTime();
        for (int i = 0; i < NUM_OPERATIONS; i++) {
            arrayListCopy.add(i);
        }
        long arrayInsertEndTime = System.nanoTime() - startArrayInsertEnd;
        
        // Test LinkedList
        long startLinkedInsertEnd = System.nanoTime();
        for (int i = 0; i < NUM_OPERATIONS; i++) {
            linkedListCopy.addLast(i);
        }
        long linkedInsertEndTime = System.nanoTime() - startLinkedInsertEnd;
        
        System.out.printf("ArrayList insert at end time: %.2f ms%n", arrayInsertEndTime / 1_000_000.0);
        System.out.printf("LinkedList insert at end time: %.2f ms%n", linkedInsertEndTime / 1_000_000.0);
        System.out.printf("Ratio: %.1fx%n", (double) linkedInsertEndTime / arrayInsertEndTime);
        System.out.println("-".repeat(50));
    }
    
    private static void runInsertInMiddleTest(ArrayList<Integer> arrayList, LinkedList<Integer> linkedList) {
        System.out.println("Insert in Middle Test (" + NUM_OPERATIONS + " operations):");
        
        // Make copies to avoid modifying the original lists
        ArrayList<Integer> arrayListCopy = new ArrayList<>(arrayList.subList(0, Math.min(10000, LIST_SIZE)));
        LinkedList<Integer> linkedListCopy = new LinkedList<>(linkedList.subList(0, Math.min(10000, LIST_SIZE)));
        
        int middle = arrayListCopy.size() / 2;
        
        // Test ArrayList
        long startArrayInsertMiddle = System.nanoTime();
        for (int i = 0; i < NUM_OPERATIONS; i++) {
            arrayListCopy.add(middle, i);
        }
        long arrayInsertMiddleTime = System.nanoTime() - startArrayInsertMiddle;
        
        // Test LinkedList
        middle = linkedListCopy.size() / 2;
        long startLinkedInsertMiddle = System.nanoTime();
        for (int i = 0; i < NUM_OPERATIONS; i++) {
            linkedListCopy.add(middle, i);
        }
        long linkedInsertMiddleTime = System.nanoTime() - startLinkedInsertMiddle;
        
        System.out.printf("ArrayList insert in middle time: %.2f ms%n", arrayInsertMiddleTime / 1_000_000.0);
        System.out.printf("LinkedList insert in middle time: %.2f ms%n", linkedInsertMiddleTime / 1_000_000.0);
        System.out.printf("Ratio: %.1fx%n", (double) linkedInsertMiddleTime / arrayInsertMiddleTime);
        System.out.println("-".repeat(50));
    }
    
    private static void runSequentialTraversalTest(ArrayList<Integer> arrayList, LinkedList<Integer> linkedList) {
        System.out.println("Sequential Traversal Test:");
        
        // Test ArrayList
        long startArrayTraversal = System.nanoTime();
        int sumArray = 0;
        for (int val : arrayList) {
            sumArray += val;
        }
        long arrayTraversalTime = System.nanoTime() - startArrayTraversal;
        
        // Test LinkedList
        long startLinkedTraversal = System.nanoTime();
        int sumLinked = 0;
        for (int val : linkedList) {
            sumLinked += val;
        }
        long linkedTraversalTime = System.nanoTime() - startLinkedTraversal;
        
        System.out.printf("ArrayList sequential traversal time: %.2f ms%n", arrayTraversalTime / 1_000_000.0);
        System.out.printf("LinkedList sequential traversal time: %.2f ms%n", linkedTraversalTime / 1_000_000.0);
        System.out.printf("Ratio: %.1fx%n", (double) linkedTraversalTime / arrayTraversalTime);
        System.out.println("-".repeat(50));
    }
    
    private static void runRemoveFromBeginningTest(ArrayList<Integer> arrayList, LinkedList<Integer> linkedList) {
        System.out.println("Remove from Beginning Test (" + Math.min(NUM_OPERATIONS, 1000) + " operations):");
        
        // Make copies to avoid modifying the original lists
        ArrayList<Integer> arrayListCopy = new ArrayList<>(arrayList.subList(0, Math.min(10000, LIST_SIZE)));
        LinkedList<Integer> linkedListCopy = new LinkedList<>(linkedList.subList(0, Math.min(10000, LIST_SIZE)));
        
        // Limit operations to avoid excessive time
        int operationsToRun = Math.min(NUM_OPERATIONS, 1000);
        
        // Test ArrayList
        long startArrayRemoveBegin = System.nanoTime();
        for (int i = 0; i < operationsToRun && !arrayListCopy.isEmpty(); i++) {
            arrayListCopy.remove(0);
        }
        long arrayRemoveBeginTime = System.nanoTime() - startArrayRemoveBegin;
        
        // Test LinkedList
        long startLinkedRemoveBegin = System.nanoTime();
        for (int i = 0; i < operationsToRun && !linkedListCopy.isEmpty(); i++) {
            linkedListCopy.removeFirst();
        }
        long linkedRemoveBeginTime = System.nanoTime() - startLinkedRemoveBegin;
        
        System.out.printf("ArrayList remove from beginning time: %.2f ms%n", arrayRemoveBeginTime / 1_000_000.0);
        System.out.printf("LinkedList remove from beginning time: %.2f ms%n", linkedRemoveBeginTime / 1_000_000.0);
        System.out.printf("Ratio: %.1fx%n", (double) arrayRemoveBeginTime / linkedRemoveBeginTime);
        System.out.println("-".repeat(50));
    }
    
    private static void runRemoveFromMiddleTest(ArrayList<Integer> arrayList, LinkedList<Integer> linkedList) {
        System.out.println("Remove from Middle Test (" + Math.min(NUM_OPERATIONS, 1000) + " operations):");
        
        // Make copies to avoid modifying the original lists
        ArrayList<Integer> arrayListCopy = new ArrayList<>(arrayList.subList(0, Math.min(10000, LIST_SIZE)));
        LinkedList<Integer> linkedListCopy = new LinkedList<>(linkedList.subList(0, Math.min(10000, LIST_SIZE)));
        
        // Limit operations to avoid excessive time
        int operationsToRun = Math.min(NUM_OPERATIONS, 1000);
        
        // Test ArrayList
        long startArrayRemoveMiddle = System.nanoTime();
        for (int i = 0; i < operationsToRun && !arrayListCopy.isEmpty(); i++) {
            int middle = arrayListCopy.size() / 2;
            arrayListCopy.remove(middle);
        }
        long arrayRemoveMiddleTime = System.nanoTime() - startArrayRemoveMiddle;
        
        // Test LinkedList
        long startLinkedRemoveMiddle = System.nanoTime();
        for (int i = 0; i < operationsToRun && !linkedListCopy.isEmpty(); i++) {
            int middle = linkedListCopy.size() / 2;
            linkedListCopy.remove(middle);
        }
        long linkedRemoveMiddleTime = System.nanoTime() - startLinkedRemoveMiddle;
        
        System.out.printf("ArrayList remove from middle time: %.2f ms%n", arrayRemoveMiddleTime / 1_000_000.0);
        System.out.printf("LinkedList remove from middle time: %.2f ms%n", linkedRemoveMiddleTime / 1_000_000.0);
        System.out.printf("Ratio: %.1fx%n", (double) linkedRemoveMiddleTime / arrayRemoveMiddleTime);
        System.out.println("-".repeat(50));
    }
    
    private static void runRemoveFromEndTest(ArrayList<Integer> arrayList, LinkedList<Integer> linkedList) {
        System.out.println("Remove from End Test (" + NUM_OPERATIONS + " operations):");
        
        // Make copies to avoid modifying the original lists
        ArrayList<Integer> arrayListCopy = new ArrayList<>(arrayList.subList(0, Math.min(NUM_OPERATIONS * 2, LIST_SIZE)));
        LinkedList<Integer> linkedListCopy = new LinkedList<>(linkedList.subList(0, Math.min(NUM_OPERATIONS * 2, LIST_SIZE)));
        
        // Test ArrayList
        long startArrayRemoveEnd = System.nanoTime();
        for (int i = 0; i < NUM_OPERATIONS && !arrayListCopy.isEmpty(); i++) {
            arrayListCopy.remove(arrayListCopy.size() - 1);
        }
        long arrayRemoveEndTime = System.nanoTime() - startArrayRemoveEnd;
        
        // Test LinkedList
        long startLinkedRemoveEnd = System.nanoTime();
        for (int i = 0; i < NUM_OPERATIONS && !linkedListCopy.isEmpty(); i++) {
            linkedListCopy.removeLast();
        }
        long linkedRemoveEndTime = System.nanoTime() - startLinkedRemoveEnd;
        
        System.out.printf("ArrayList remove from end time: %.2f ms%n", arrayRemoveEndTime / 1_000_000.0);
        System.out.printf("LinkedList remove from end time: %.2f ms%n", linkedRemoveEndTime / 1_000_000.0);
        System.out.printf("Ratio: %.1fx%n", (double) linkedRemoveEndTime / arrayRemoveEndTime);
        System.out.println("-".repeat(50));
    }
}
```

</details>


### ArrayList 주요 메서드

| 메서드                               | 설명               | 시간 복잡도      | 사용 예시                                         |
|:----------------------------------|:-----------------|:------------|:----------------------------------------------|
| `add(E e)`                        | 끝에 요소 추가         | O(1)*       | `list.add("element");`                        |
| `add(int index, E e)`             | 지정 위치에 요소 추가     | O(n)        | `list.add(0, "first");`                       |
| `get(int index)`                  | 인덱스 위치의 요소 반환    | O(1)        | `String item = list.get(0);`                  |
| `set(int index, E e)`             | 인덱스 위치의 요소 변경    | O(1)        | `list.set(1, "newValue");`                    |
| `remove(int index)`               | 인덱스 위치의 요소 제거    | O(n)        | `list.remove(0);`                             |
| `remove(Object o)`                | 첫 번째로 일치하는 요소 제거 | O(n)        | `list.remove("element");`                     |
| `size()`                          | 요소 개수 반환         | O(1)        | `int size = list.size();`                     |
| `isEmpty()`                       | 리스트가 비어있는지 확인    | O(1)        | `boolean empty = list.isEmpty();`             |
| `clear()`                         | 모든 요소 제거         | O(n)        | `list.clear();`                               |
| `contains(Object o)`              | 요소 포함 여부 확인      | O(n)        | `boolean has = list.contains("search");`      |
| `indexOf(Object o)`               | 요소의 첫 번째 위치 반환   | O(n)        | `int idx = list.indexOf("find");`             |
| `lastIndexOf(Object o)`           | 요소의 마지막 위치 반환    | O(n)        | `int last = list.lastIndexOf("find");`        |
| `toArray()`                       | 배열로 변환           | O(n)        | `Object[] arr = list.toArray();`              |
| `toArray(T[] a)`                  | 지정된 타입의 배열로 변환   | O(n)        | `String[] arr = list.toArray(new String[0]);` |
| `subList(int from, int to)`       | 부분 리스트 반환 (뷰)    | O(1)        | `List<String> sub = list.subList(1, 3);`      |
| `ensureCapacity(int minCapacity)` | 최소 용량 확보         | O(n)        | `list.ensureCapacity(100);`                   |
| `trimToSize()`                    | 용량을 크기에 맞게 조정    | O(n)        | `list.trimToSize();`                          |
| `sort(Comparator<? super E> c)`   | 리스트 정렬           | O(n log n)  | `list.sort(Comparator.naturalOrder());`       |

* 용량 증가가 필요한 경우 O(n)

### LinkedList 주요 메서드

| 메서드                       | 설명               | 시간 복잡도      | 사용 예시                                              |
|:--------------------------|:-----------------|:------------|:---------------------------------------------------|
| `add(E e)`                | 끝에 요소 추가         | O(1)        | `list.add("element");`                             |
| `add(int index, E e)`     | 지정 위치에 요소 추가     | O(n)*       | `list.add(0, "first");`                            |
| `addFirst(E e)`           | 리스트 시작에 요소 추가    | O(1)        | `list.addFirst("first");`                          |
| `addLast(E e)`            | 리스트 끝에 요소 추가     | O(1)        | `list.addLast("last");`                            |
| `get(int index)`          | 인덱스 위치의 요소 반환    | O(n)*       | `String item = list.get(0);`                       |
| `getFirst()`              | 첫 번째 요소 반환       | O(1)        | `String first = list.getFirst();`                  |
| `getLast()`               | 마지막 요소 반환        | O(1)        | `String last = list.getLast();`                    |
| `set(int index, E e)`     | 인덱스 위치의 요소 변경    | O(n)*       | `list.set(1, "newValue");`                         |
| `remove(int index)`       | 인덱스 위치의 요소 제거    | O(n)*       | `list.remove(0);`                                  |
| `remove(Object o)`        | 첫 번째로 일치하는 요소 제거 | O(n)        | `list.remove("element");`                          |
| `removeFirst()`           | 첫 번째 요소 제거       | O(1)        | `list.removeFirst();`                              |
| `removeLast()`            | 마지막 요소 제거        | O(1)        | `list.removeLast();`                               |
| `poll()`                  | 첫 번째 요소 반환 및 제거  | O(1)        | `String item = list.poll();`                       |
| `pollFirst()`             | 첫 번째 요소 반환 및 제거  | O(1)        | `String first = list.pollFirst();`                 |
| `pollLast()`              | 마지막 요소 반환 및 제거   | O(1)        | `String last = list.pollLast();`                   |
| `peek()`                  | 첫 번째 요소 반환       | O(1)        | `String item = list.peek();`                       |
| `peekFirst()`             | 첫 번째 요소 반환       | O(1)        | `String first = list.peekFirst();`                 |
| `peekLast()`              | 마지막 요소 반환        | O(1)        | `String last = list.peekLast();`                   |
| `offer(E e)`              | 요소를 큐에 추가        | O(1)        | `list.offer("element");`                           |
| `offerFirst(E e)`         | 첫 번째 위치에 요소 추가   | O(1)        | `list.offerFirst("first");`                        |
| `offerLast(E e)`          | 마지막 위치에 요소 추가    | O(1)        | `list.offerLast("last");`                          |
| `push(E e)`               | 스택에 요소 추가        | O(1)        | `list.push("element");`                            |
| `pop()`                   | 스택에서 요소 제거 및 반환  | O(1)        | `String top = list.pop();`                         |
| `size()`                  | 요소 개수 반환         | O(1)        | `int size = list.size();`                          |
| `isEmpty()`               | 리스트가 비어있는지 확인    | O(1)        | `boolean empty = list.isEmpty();`                  |
| `contains(Object o)`      | 요소 포함 여부 확인      | O(n)        | `boolean has = list.contains("search");`           |
| `clear()`                 | 모든 요소 제거         | O(n)        | `list.clear();`                                    |
| `toArray()`               | 배열로 변환           | O(n)        | `Object[] arr = list.toArray();`                   |
| `descendingIterator()`    | 역순 반복자 반환        | O(1)        | `Iterator<String> it = list.descendingIterator();` |
| `listIterator(int index)` | 지정 위치부터 반복자 반환   | O(n)*       | `ListIterator<String> it = list.listIterator(5);`  |

* 위치 찾는 데 O(n), 찾은 후 작업은 O(1)

