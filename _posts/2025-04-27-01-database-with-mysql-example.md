---
title: 01. Database System-Example
date: 2025-04-27
categories: [ Database With MySQL ]
tags: [ Example ]
layout: post
---

# Database system

## example

### 데이터베이스의 특성

1. 질의에 대하여 실시간 처리 및 응답이 가능하도록 지원
2. 삽입, 삭제, 갱신으로 항상 최신의 데이터를 유지
3. 다수의 사용자가 동시에 이용 가능
4. ~~데이터 참조 시 데이터 값에 의해서는 참조될 수 없으므로 위치나 주소에 의하여 데이터를 찾음~~

> 데이터베이스는 데이터 값 자체로 데이터 참조 가능  
> 일반적으로 데이터를 고유하게 식별할 수 있는 키 값을 이용해 데이터를 참조하고 조작

### 데이터베이스의 정의

Q. 조직에서 그 고유의 기능을 수행하기 위해 반드시 유지해야 할 데이터가 있다. 조직의 존재 목적이나 기능을 수행하는 데 없어서는 안 될 데이터의 집합이다.
> A. Operational Data  
> Shared Data(공용), Stored Data(저장), Operational Data(운영), Integrated Data(통합)

### 시스템 카탈로그(데이터 사전)

1. 데이터베이스에 포함되는 모든 데이터 객체에 대한 정의나 명세에 관한 정보를 유지 관리
2. DBMS가 스스로 생성하고 유지하는 데이터베이스 내의 특별한 테이블의 집합체
3. 카탈로그에 저장된 정보를 메타 데이터라고도 함
4. ~~시스템 카탈로그의 갱신은 무결성 유지를 위해 SQL을 이용하여 사용자가 직접 갱신하여야 함~~

> 시스템 카탈로그는 DBMS가 자동으로 갱신하며 무결성과 일관성 보장을 위해 사용자가 직접 갱신 불가

### 스키마 정의

Q. 물리적 저장 장치의 입장에서 본 데이터베이스 구조로서 실제로 데이터베이스에 저장될 레코드로 형식을 정의하고 저장 데이터 항목의 표현 방법, 내부 레코드의 물리적 순서 등을 나타냄
> A. 내부 스키마

Q. 모든 응용 프로그램이나 사용자들이 필요로 하는 데이터를 통합한 조직 전체의 데이터베이스 구조를 논리적으로 정의
> A. 개념 스키마

### DBMS 역할

1. ~~데이터 조작어(Data Manipulation Language, DML)로 스키마의 구조를 기술하여 시스템 카탈로그(데이터 사전)에 저장한 후 필요할 때 활용~~
2. 질의어 처리기는 질의문을 파싱하고 분석해서 효율적인 데이터베이스 접근 코드를 생성
3. 트랜잭션 관리자는 무결성 제약조건 검사, 사용자의 권한 검사, 병행제어, 회복 등의 작업을 수행
4. 저장 데이터 관리자는 디스크에 저장되어 있는 사용자 데이터베이스와 시스템 카탈로그의 접근을 책임

> DDL의 역할

### DBMS를 사용하는 것이 파일 시스템을 사용하는 것보다 더 적합한 경우

1. 데이터와 응용이 단순하고 변경이 거의 일어나지 않는 경우
2. <u>예약 시스템과 같이 최신 정보를 다수의 사용자가 공유해야 하는 경우</u>
3. 응용 프로그램의 실시간 요구사항이 엄격한 경우
4. 내장형 시스템과 같이 저장 용량이 제한된 경우

> 1. DBMS의 오버헤드가 불필요
> 2. DBMS는 동시성 제어, 백업/복구, 무결성 제약 등의 기능을 제공하여 데이터 공유와 일관성 유지에 적합
> 3. 실시간 시스템에서 DBMS의 오버헤드가 부담되고, 예측 가능한 성능이 중요
> 4. DBMS는 저장 용량이 제한된 환경에서는 오버헤드가 부담

### 파일 처리 시스템에서 데이터 중복의 단점

1. ~~같은 데이터가 여러 곳에 중복되어 있어 동일 수준의 보안이 가능~~
2. 데이터 저장 공간에 대한 추가 비용이 소요
3. 데이터 간의 불일치로 인해 데이터 일관성이 결여
4. 데이터 갱신 시 중복된 모든 데이터를 찾아내어 갱신해야 하므로 갱신 비용이 추가

> 데이터 중복으로 인한 보안 취약점 증가 -> 데이터 무결성, 일관성, 보안성 등을 저해

### 각 용어의 의미

* `데이터베이스` : 조직에 필요한 정보를 얻기 위하여 논리적으로 연관된 데이터를 모아 구조적으로 통합해 놓은 것
* `DBMS` : 데이터베이스 사용자가 데이터베이스를 생성&공유&관리할 수 있도록 지원해 주는 역할을 하며 사용자와 데이터베이스를 연결해 주는 소프트웨어
* `데이터 모델` : 데이터베이스 시스템에서 데이터를 저장하는 이론적인 방법을 기술한 것으로, 데이터베이스에 데이터가 어떻게 구조화되어 저장하는지를 결정
* `데이터베이스 시스템` : 각 조직에서 사용하던 데이터를 통합하고 공유할 때 생기는 장점을 이용하는 시스템(DBMS, DB, data model 세 가지로 구성)

### 데이터베이스의 특징

1. 실시간 접근이 가능 real-time accessibility
2. 지속적 변화 continuous evolution
3. 동시 공유 concurrent sharing
4. 내용에 의한 참조 content reference

### 파일 시스템과 DBMS의 장단점

1. 파일 시스템
  * 장점 : 간단하고 저렴, 개발 및 유지보수 용이, 빠른 데이터 접근 가능, 제한된 저장 공간에서 효율적
  * 단점 : 데이터 중복, 저장공간 낭비, 데이터 무결성, 보안성, 일관성, 독립성 등의 문제
2. DBMS
  * 장점 : 데이터 중복 최소화, 데이터 불일치 방지 및 무결성 보장, 데이터 독립성으로 프로그램 유지보수성 향상, 다수 사용자의 데이터 공유 및 통합 뷰 제공
  * 단점 : 비용, 복잡성, 오버헤드로 인해 실시간 응답성 저하, 제한된 저장 공간에서는 부적합

> 파일시슽템은 단순하고 실시간성이 좋으나 데이터 관리 기능이 부족함  
> DBMS는 데이터 관리 기능은 뛰어나나 오버헤드가 있어 실시간성이 떨어짐

### 데이터 모델의 종류

* 데이터 모델을 구분하는 가장 큰 기준은 데이터 간 관계를 표현하는 방법
* 현재 관계 데이터 모델이 가장 많이 사용

`포인터 사용: 계층(hierarchical) 데이터 모델, 네트워크(network) 데이터 모델`

* 프로그래밍 언어의 포인터 타입을 이용하여 데이터가 저장된 포인터값을 다른 데이터에 저장하는 방법
* 데이터를 직접 찾아갈 수 있어 프로그램 속도는 빠르지만, 포인터를 다루는 프로그래밍을 해야 하므로 응용 프로그램 개발 속도 면에서는 느림

`속성값 사용 : 관계(relational) 데이터 모델`

* 데이터의 속성인 값을 다른 데이터에 직접 저장하는 방법
* 포인터를 사용하는 방법보다 속도는 조금 느리지만, 개념이 쉽고 프로그램 개발이 빠름

`객체 식별자 사용 : 객체(object) 데이터 모델`

* 개체를 객체 개념으로 추상화하고, 객체의 고유 식별자인 OID(Object Identifier)를 다른 객체에 저장하여 객체 간의 관계를 참조하는 방식

### 데이터 독립성 정의 및 데이터베이스 시스템에서의 중요성

* 하위 단계의 내용을 추상화하여 상위 단계에 그 세부사항을 숨김으로써 한 단계 내의 변경에 대해서 다른 단계와 상호 간섭이 없도록 하는 것

`논리적 데이터 독립성 logical data independence`

* 외부 단계와 개념 단계 사이의 독립성
* 개념 스키마가 변경되어도 외부 스키마에는 영향을 미치지 않도록 지원
* 논리적 구조가 변경되어도 응용 프로그램에는 영향이 없도록 하는 개념

`물리적 데이터 독립성 physical data independence`

* 개념 단계와 내부 단계 사이의 독립성
* 저장 장치 구조 변경과 같이 내부 스키마가 변경되어도 개념 스키마에 영향을 미치지 않도록 지원
* 물리적 독립성은 논리적 독립성보다 구현하기 쉬움

### ANSI의 3단계 데이터베이스 구조

`외부 스키마`

* 사용자 관점에서 데이터베이스를 정의한 것으로, 사용자가 데이터베이스를 어떻게 보는지를 정의
* 서브 스키마라고도 부르며, 뷰의 개념, 개념 스키마 중 사용자에게 필요한 부분 스키마를 의미

`개념 스키마`

* 전체 데이터베이스의 논리적 구조를 정의한 것으로, 데이터베이스의 전체적인 구조를 정의
* 저장 장치에 독립적으로 기술되며, 데이터와의 관계, 제약사항, 무결성에 대한 내용이 포함

`내부 스키마`

* 데이터베이스의 물리적 구조를 정의한 것으로, 데이터가 저장되는 방법과 저장 장치에 대한 세부적인 사항을 정의
* 인덱스, 데이터 레코드의 배치 방법, 데이터 압축 등에 관한 사항이 포함
