---
title: Array & ArrayList
date: 2025-05-18
categories: [ Data Structures & Algorithms ]
tags: [ Java Collection Framework ]
layout: post
---

# 배열 (Array) & ArrayList

### Array(배열)

* 고정된 크기를 가진 동일한 타입의 원소들을 연속적인 메모리 공간에 저장하는 자료구조
* 생성 시 크기가 결정되고 이후 변경 불가
* 인덱스를 통해 빠르게 원소에 접근 가능(O(1)시간 복잡도)

### ArrayList

* Array를 기반으로 한 동적 배열 구현체
* 내부적으로 배열을 사용하지만 크기가 가변적으로 조절
* 자바의 Collection 프레임워크에 속하는 클래스

## 공통점

* 둘 다 인덱스를 통해 O(1)시간에 원소에 접근 가능
* 메모리상에 원소들이 순차적으로 배치
* 같은 타입의 데이터만 저장 가능
* 중복되는 요소를 저장할 수 있으며 Null값 또한 저장 가능

| 연산별 성능          | Array & ArrayList |
|:----------------|:------------------|
| 접근(Access)      | O(1)              |
| 검색(Search)      | O(n)              |
| 삽입(Insert) - 끝  | O(1)              |
| 삽입(Insert) - 중간 | O(n)              |
| 삭제(Delete) - 끝  | O(1)              |
| 삭제(Delete) - 중간 | O(n)              |

> ArrayList의 경우 삽입 시 용량이 증가하며 O(n)까지 증가 가능  
> Array는 실제 요소 삽입/삭제 메서드가 없어 직접 구현 필요

## 차이점

### Resizable

Array의 경우 생성 시 크기를 지정하여 이 후 변경할 수 없는 고정 크기를 사용하지만 ArrayList의 경우 가변적인 크기를 갖습니다.  
ArrayList를 기본 생성자로 생성 시 static 변수에 미리 초기화된 빈 배열이 할당되고 이 후 객체가 하나라도 추가되면 default size인 10의 크기로 배열을 초기화합니다.   
사이즈를 넘어서는 객체가 들어오면 배열 크기를 1.5배로 확장합니다.

```java
    private Object[] grow(int minCapacity) {
    int oldCapacity = elementData.length;
    if (oldCapacity > 0 || elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        int newCapacity = ArraysSupport.newLength(oldCapacity,
                minCapacity - oldCapacity, /* minimum growth */
                oldCapacity >> 1           /* preferred growth */);
        return elementData = Arrays.copyOf(elementData, newCapacity);
    } else {
        return elementData = new Object[Math.max(DEFAULT_CAPACITY, minCapacity)];
    }
}
```

`매개변수`

* minCapacity: 필요한 최소 용량 (현재 요소 수 + 추가될 요소 수)

`주요 변수`

* elementData: ArrayList의 요소들을 저장하는 내부 배열
* DEFAULTCAPACITY_EMPTY_ELEMENTDATA: 기본 생성자로 생성된 빈 ArrayList를 나타내는 상수
* DEFAULT_CAPACITY: 기본 초기 용량 (일반적으로 10)

ArrayList 클래스 내부에서 사용되는 내부 배열 크기를 동적으로 조절하는 함수입니다.  
`oldCapacity >> 1` 비트연산을 통해 현재 용량의 절반을 증가시키는 것을 볼 수 있습니다.  
사용 후 불필요한 용량은 `list.trimToSize();`를 통해 제거할 수 있으며 현재 사용하는 용량의 크기와 일치하도록 줄입니다.

### Primitives(기본형) vs Objects(객체)

Array는 기본형 뿐만 아니라 객체도 저장할 수 있습니다.  
하지만 ArrayList는 객체만 저장할 수 있으며, 기본형의 경우 boxing/unboxing이 필요합니다.

```java
// Array with primitives - 메모리 효율적, 빠름
int[] primitiveArray = new int[1000000];
primitiveArray[0]=42; // 직접 값 할당

// ArrayList with boxed primitives - 오버헤드 발생
ArrayList<Integer> list = new ArrayList<>(1000000);
// list.add(Integer.valueOf(42)); 와 같이 동작
list.add(42); // Integer 객체 생성 후 저장(박싱)
// int value = list.get(0).intValue(); 와 같이 동작
int value = list.get(0); // Integer → int 변환(언박싱)
```

#### 메모리 사용량 차이

`Integer 객체의 구조`

* 객체 헤더 : 12~16바이트
    * 마크 워드(Mark Word) : 8바이트(64비트 JVM 기준)
    * 클래스 포인터 : 4~8바이트(JVM 설정에 따라 다름)
* 인스턴스 데이터 : int value(4바이트)
* 패딩 : 메모리 정렬을 위한 추가 바이트(0~4바이트)

따라서 4바이트 int값을 저장하기 위해 최소 4~5배 이상의 메모리가 필요하게 됩니다.

#### 객체 오버헤드와 성능 영향
**1**. 메모리 사용량 : 1백만개 정수 저장할 때
  * `int[]` : ~4MB
  * `ArrayList<Integer>` : ~20MB+

**2**. 성능 영향
  * 박싱/언박싱 CPU 오버헤드 : 변환 작업은 추가 CPU 사이클 소비
  * 메모리 접근 패턴 : 객체는 힙에 분산되어 저장되므로 캐시 지역성 감소
  * 가비지 컬렉션 : 많은 객체 생성은 GC 부담 증가

```java
        // 기본형 배열 측정
        long start1 = System.nanoTime();
        int[] array = new int[10000000];
        for (int i = 0; i < array.length; i++) {
            array[i] = i;
        }
        int sum1 = 0;
        for (int i = 0; i < array.length; i++) {
            sum1 += array[i];
        }
        long time1 = System.nanoTime() - start1;

        // ArrayList<Integer> 측정
        long start2 = System.nanoTime();
        ArrayList<Integer> list = new ArrayList<>(10000000);
        for (int i = 0; i < 10000000; i++) {
            list.add(i);  // 박싱 발생
        }
        int sum2 = 0;
        for (int i = 0; i < list.size(); i++) {
            sum2 += list.get(i);  // 언박싱 발생
        }
        long time2 = System.nanoTime() - start2;

        System.out.println("기본형 배열 시간: " + time1 / 1000000 + "ms");
        System.out.println("ArrayList<Integer> 시간: " + time2 / 1000000 + "ms");
```

> **출력된 시간** :  
> 기본형 배열 시간: 20ms  
> ArrayList<Integer> 시간: 191ms  
> 
> **프로파일링 시간** :  
> 기본형 배열 시간(array[i] = i; CPU 시간): 12ms  
> ArrayList<Integer> 시간(list.add(i); CPU 시간): 109ms

박싱/언박싱 오버헤드와 객체 참조에 따른 메모리 접근 패턴 차이로 성능에 상당한 영향을 미치는 것을 확인할 수 있습니다.

### Type-Safety

#### 컴파일 시간 타입 체크

* Array
  * 런타임에 실제 타입 정보 유지
  * 제네릭과 함께 사용 시 제한적(타입 소거)

```java
// 컴파일 오류 없지만 런타임 오류 발생 가능
Object[] objArray = new String[10];
objArray[0] = 10; // ArrayStoreException 발생
```

* ArrayList
  * 완전한 제네릭 지원으로 컴파일 타임 타입 안정성 제공

```java
ArrayList<String> list = new ArrayList<>();
list.add(10); // 컴파일 오류 - 코드가 실행되기 전에 오류 발견
```

#### 제네릭 배열 생성 제한

Array의 경우 제네릭 배열 생성이 제한됩니다.

```java
E[] genericArray = new E[10]; // 컴파일 오류
```

ArrayList는 내부적으로 타입 소거를 활용해 제네릭을 지원합니다.

```java
ArrayList<E> list = new ArrayList<>(); // 가능
```

자바 제네릭은 컴파일 타임 기능으로 런타임에는 타입 정보를 소거합니다.  
ArrayList는 내부적으로 `Object[]`를 사용하며 캐스팅으로 타입 안정성을 제공합니다.

```java
// 내부 구현 유사 코드
public class ArrayList<E> {
    private Object[] elementData;
    
    @SuppressWarnings("unchecked")
    public E get(int index) {
        return (E) elementData[index]; // 타입 캐스팅
    }
}
```

### 스레드 안정성

#### 동기화 특성
* Array
  * 자체 동기화 매커니즘 없음
  * 불변 선언 시 참조 변경 방지 가능하나 내용 변경은 가능

* ArrayList
  * 스레드 안전하지 않음(synchronized 아님)
  * 동시 접근 시 `ConcurrentModificationException` 발생 가능

#### 병렬 처리 옵션

```java
// 동기화된 리스트 생성
List<String> syncList = Collections.synchronizedList(new ArrayList<>());

// Java 8+ 병렬 스트림 활용
int[] array = {1, 2, 3, 4, 5};
Arrays.stream(array).parallel().forEach(/* 작업 */);

List<Integer> list = new ArrayList<>();
list.parallelStream().forEach(/* 작업 */);
```

## 활용 패턴 및 최적화

### 용량 관리
* 초기 용량 지정 : 예상 요소 수를 알 때 성능 최적화

```java
// 예상 요소 수를 알 때 초기 용량 지정
ArrayList<Integer> optimizedList = new ArrayList<>(10000);
```

* 메모리 최적화 : 사용 후 `trimToSize()` 호출을 통해 여유 공간 제거

### Array와 ArrayList 변환

```java
// Array → ArrayList
Integer[] array = {1, 2, 3};
List<Integer> list = Arrays.asList(array); // 고정 크기 뷰
ArrayList<Integer> arrayList = new ArrayList<>(Arrays.asList(array));

// ArrayList → Array
Integer[] newArray = list.toArray(new Integer[0]);
```

### Array 선호 상황
* 크기가 고정된 데이터 구조
* 기본형 데이터 대량 처리 (메모리/성능 최적화)
* 다차원 데이터 처리
* 성능이 매우 중요한 저수준 연산

### ArrayList 선호 상황
* 동적 크기 조정 필요
* 리스트 조작 메서드 사용 필요
* 제네릭 타입 안전성 필요
* 컬렉션 프레임워크 통합 활용

### 최적 성능을 위한 팁

* Array 최적화
  * 크기가 고정된 데이터에 사용
  * 기본형 데이터는 항상 Array 사용 (성능/메모리 이점)
  * 다차원 데이터 처리에 적합

* ArrayList 최적화
  * 예상 크기를 알면 초기 용량 지정: `new ArrayList<>(expectedSize)`
  * 반복문에서 `size()` 호출 캐싱: `int size = list.size();`
  * 불필요한 박싱/언박싱 피하기
  * 사용 후 `trimToSize()` 호출하여 메모리 최적화

## 요약

### 핵심 개념 비교

| 항목        | Array (배열)                            | ArrayList                        |
|:----------|:--------------------------------------|:---------------------------------|
| 정의        | 고정 크기의 동일한 타입 원소를 연속적인 메모리에 저장하는 자료구조 | Array를 기반으로 한 크기가 가변적인 동적 배열 구현체 |
| 크기 변경     | 불가능 (생성 시 크기 고정)                      | 가능 (자동으로 크기 조절)                  |
| 타입        | 기본형(primitive)과 객체 모두 저장 가능           | 객체만 저장 가능 (기본형은 박싱/언박싱 필요)       |
| 제네릭 지원    | 제한적 (타입 소거)                           | 완전한 제네릭 지원                       |
| 메모리 효율성   | 높음 (특히 기본형 데이터)                       | 낮음 (객체 오버헤드 발생)                  |
| 컬렉션 프레임워크 | 속하지 않음                                | Java Collection Framework의 일부    |

### 성능 비교

| 연산         | Array  | ArrayList            |
|:-----------|:-------|:---------------------|
| 접근(Access) | O(1)   | O(1)                 |
| 검색(Search) | O(n)   | O(n)                 |
| 삽입(끝)      | O(1)*  | O(1)* (용량 증가 시 O(n)) |
| 삽입(중간)     | O(n)*  | O(n)                 |
| 삭제(끝)      | O(1)*  | O(1)                 |
| 삭제(중간)     | O(n)*  | O(n)                 |

* Array는 실제 삽입/삭제 메서드가 없어 직접 구현 필요

### Array 주요 메서드/기능

| 메서드/기능      | 설명            | 사용 예시                                                                                                         |
|:------------|:--------------|:--------------------------------------------------------------------------------------------------------------|
| 배열 생성       | 새 배열 생성       | `int[] arr = new int[10];` <br> `String[] names = {"Kim", "Lee", "Park"};`                                    |
| 길이 확인       | 배열의 길이 확인     | `int length = arr.length;`                                                                                    |
| 요소 접근       | 인덱스로 접근       | `int value = arr[0];` <br> `arr[1] = 100;`                                                                    |
| 배열 복사       | 배열 복사         | `int[] newArr = Arrays.copyOf(arr, arr.length);` <br> `System.arraycopy(src, srcPos, dest, destPos, length);` |
| 정렬          | 배열 정렬         | `Arrays.sort(arr);`                                                                                           |
| 검색          | 이진 검색(정렬된 배열) | `int index = Arrays.binarySearch(arr, key);`                                                                  |
| 채우기         | 모든 요소를 특정 값으로 | `Arrays.fill(arr, value);`                                                                                    |
| 비교          | 배열 내용 비교      | `boolean equals = Arrays.equals(arr1, arr2);`                                                                 |
| 문자열 변환      | 배열을 문자열로      | `String str = Arrays.toString(arr);`                                                                          |
| 스트림 생성      | 스트림 API 사용    | `Arrays.stream(arr).forEach(System.out::println);`                                                            |
| 병렬 처리       | 병렬 스트림        | `Arrays.stream(arr).parallel().forEach(e -> process(e));`                                                     |

### ArrayList 주요 메서드

| 메서드                                   | 설명                  | 시간 복잡도     | 사용 예시                                         |
|:--------------------------------------|:--------------------|:-----------|:----------------------------------------------|
| `add(E e)`                            | 끝에 요소 추가            | O(1)*      | `list.add("element");`                        |
| `add(int index, E e)`                 | 지정된 위치에 삽입          | O(n)       | `list.add(0, "first");`                       |
| `get(int index)`                      | 인덱스 위치의 요소 반환       | O(1)       | `String item = list.get(0);`                  |
| `set(int index, E e)`                 | 인덱스 위치의 요소 변경       | O(1)       | `list.set(1, "newValue");`                    |
| `remove(int index)`                   | 인덱스 위치의 요소 제거       | O(n)       | `list.remove(0);`                             |
| `remove(Object o)`                    | 첫 번째로 일치하는 요소 제거    | O(n)       | `list.remove("element");`                     |
| `size()`                              | 요소 개수 반환            | O(1)       | `int size = list.size();`                     |
| `isEmpty()`                           | 리스트가 비어있는지 확인       | O(1)       | `boolean empty = list.isEmpty();`             |
| `clear()`                             | 모든 요소 제거            | O(n)       | `list.clear();`                               |
| `contains(Object o)`                  | 요소 포함 여부 확인         | O(n)       | `boolean has = list.contains("search");`      |
| `indexOf(Object o)`                   | 요소의 첫 번째 위치 반환      | O(n)       | `int idx = list.indexOf("find");`             |
| `lastIndexOf(Object o)`               | 요소의 마지막 위치 반환       | O(n)       | `int last = list.lastIndexOf("find");`        |
| `toArray()`                           | 배열로 변환              | O(n)       | `Object[] arr = list.toArray();`              |
| `toArray(T[] a)`                      | 지정된 타입의 배열로 변환      | O(n)       | `String[] arr = list.toArray(new String[0]);` |
| `subList(int from, int to)`           | 부분 리스트 반환 (뷰)       | O(1)       | `List<String> sub = list.subList(1, 3);`      |
| `addAll(Collection<? extends E> c)`   | 컬렉션의 모든 요소 추가       | O(n)       | `list.addAll(otherList);`                     |
| `removeAll(Collection<?> c)`          | 컬렉션의 요소와 일치하는 항목 제거 | O(n²)      | `list.removeAll(toRemove);`                   |
| `retainAll(Collection<?> c)`          | 컬렉션의 요소만 유지         | O(n²)      | `list.retainAll(toKeep);`                     |
| `ensureCapacity(int minCapacity)`     | 최소 용량 확보            | O(n)       | `list.ensureCapacity(100);`                   |
| `trimToSize()`                        | 용량을 크기에 맞게 조정       | O(n)       | `list.trimToSize();`                          |
| `forEach(Consumer<? super E> action)` | 각 요소에 작업 적용         | O(n)       | `list.forEach(System.out::println);`          |
| `sort(Comparator<? super E> c)`       | 리스트 정렬              | O(n log n) | `list.sort(Comparator.naturalOrder());`       |

* 용량 증가가 필요한 경우 O(n)
