---
title: 21. 물리요소 조사 분석
date: 2024-05-18
categories: [정보처리기사]
tags: [정보처리기사]
layout: post
---

## 물리 DB 설계

### 과정

- 사용자 DBMS 결정

- 데이터 타입 크기 결정

- 데이터 용량 설계 및 업무 프로세스 분석

- 역정규화(반정규화)

- 인덱스 정의

- DB 생성

### 특징

- 논리적인 설계의 데이터 구조를 보조 기억장치의 파일(물리적인 데이터 모델)로 사상

- 예상 빈도를 포함하여 DB 질의와 트랜잭션들을 분석

- 데이터에 대한 효율적인 접근을 제공하기 위하여 저장 구조와 접근 방법을 고려

- 특정 DBMS의 특성을 고려하여 진행

- 질의를 효율적으로 지원하기 위해서 인덱스 구조를 적절히 사용

### 고려사항

`무결성` : 삽입, 삭제, 갱신 등의 연산 후에도 저장된 데이터가 정해진 제약조건을 항상 만족해야 함  
`일관성` : 특정 질의에 대한 응답이 처음부터 끝까지 변함없이 일정해야 함  
`회복성` : 시스템 장애 발생 시, 장애 발생 직전의 상태로 복구할 수 있어야 함  
`보안` : 불법적인 데이터의 노출 또는 변경으로부터 보호할 수 있어야 함  
`효율성` : 응답시간 단축, 저장공간의 최적화 등이 가능해야 함  
`확장성` : DB 운영에 영향을 주지 않으면서 지속적으로 데이터를 추가할 수 있어야 함  

### 논리 - 물리 데이터 모델 변환

- Entity를 Table로 변환

- Attribute를 Column으로 변환

- Primary UIP를 Primary Key 로 변환

- Secondary(Alternate) UIP를 Unique Key로 변환

- Relationship을 Foreign Key로 변환

- Business Constraints를 Check Constraints로 변환

---

## 스토리지

### 개념

- 단일 디스크로 처리할 수 없는 대용량의 데이터를 저장하기 위해 서버와 저장장치를 연결하는 기술

- 방대한 데이터를 효율적으로 관리 / 유지하고 가공할 저장장치

### 종류

`DAS | Direct Attached Storage`

- 저장 장치를 직접 호스트(컴퓨터)에 연결하여 관리하는 방식

- 호스트의 저장 공간이 부족해질 경우 새로운 저장 공간을 확보

> 
> 
> 
> #### 장점
> 
> 
>
> - 호스트에서 저장장치까지 물리적으로 가까운 곳에서 접근하여 속도가 빠르고 확장이 비교적 쉬움
> 
> 
> 
> #### 단점
> 
> 
>
> - 데이터가 증가함에 따라 외부 저장 장치를 계속 추가할 경우 호스트의 운영 효율성이 떨어짐
> - 호스트에 장애가 발생할 경우 저장 장치로의 접근이 제한됨
> - 물리적으로 연결 수가 제한됨
> 
> 

`NAS | Network Attached Storage`

- 저장장치를 네트워크에 부착하여 네트워크에 기반한 데이터 공유 방식

- 저장장치가 다른 호스트 없이 직접 네트워크에 연결되는 방식

> 
> 
> 
> #### 장점
> 
> 
>
> - 네트워크를 통해 데이터를 공유하므로 높은 대역폭의 네트워크를 통한 전송 속도 확보가 가능하고 여러 장치들에서 데이터의 입출력이 용이
> - 전용 OS를 사용하여 DAS 방식 대비 입출력 속도가 높음
> 
> 
> 
> #### 단점
> 
> 
>
> - 네트워크를 사용해야 하므로 전송속도에 제한이 있음
> - 데이터를 캡슐화하는 과정에서 속도지연이 발생할 수 있음
> - 네트워크의 병목 현상에 취약
> 
> 

`SAN | Storage Area Network`

- 저장장치를 데이터 서버와 연결하여 별도의 네트워크로 관리하는 고속 네트워크 시스템

- 일반적으로 광을 이용한 네트워크

> 
> 
> 
> #### 장점
> 
> 
>
> - 성능 및 용량 확장성이 좋음
> - 가상화 환경을 구축하기 좋음
> 
> 
> 
> #### 단점
> 
> 
>
> - 구성에 따라 네트워크의 복잡도가 높아짐
> - 상대적으로 비싸며 관리 포인트가 많아짐
> 
> 

### RAID | Redundant Array of Inexpensive Disks

`개념`

- 복수의 HDD를 하나의 드라이브와 같이 인식하고 표기

- HDD의 신뢰성을 높여줌

- 데이터를 분산하여 쓸 수 있어 고속화를 기대할 수 있음

`구성`

> 
> 
> 
> #### Striping
> 
> 
> 

> - 논리적으로 연속된 데이터들이 물리적으로 여러 개의 디스크에 라운드로빈 방식으로 저장되는 형태

> 
> 
> 
> #### Mirroring
> 
> 
>
> - 데이터를 그대로 복제하는 것으로 신뢰성 확보를 위해 사용
> 
> 

`형태`

> 
> 
> 
> #### RAID - 0
> 
> 
>
> - 빠른 데이터 입출력을 위해 스트라이핑을 사용하는 방식으로, 디스크의 모든 용량을 사용
> - 하나의 디스크가 잘못되면 데이터를 잃어버릴 수 있음
> 
> 
> 
> #### RAID - 1
> 
> 
>
> - 두 개 이상의 디스크를 미러링을 통해 하나의 디스크처럼 사용
> - 완전히 동일하게 데이터를 복제하기 때문에 가용량이 절반
> - 하나의 디스크에서 에러가 발생하면 미러링 된 디스크를 통해 복구 가능
> 
> 
> 
> #### RAID - 2
> 
> 
>
> - 오류 정정을 위한 해밍코드를 사용하는 방식
> 
> 
> 
> #### RAID - 3
> 
> 
>
> - 하나의 디스크를 패리티(Parity) 정보를 위해 사용하고 나머지 디스크에 데이터를 균등하게 분산 저장
> - 하나의 디스크에서 에러가 발생하면 패리티 디스크를 통해 복구 가능
> 
> 
> 
> #### RAID - 4
> 
> 
>
> - RAID - 3과 같이 패리티 정보를 독립된 디스크에 저장
> - 블록 단위로 분산 저장하는 차이가 있음
> 
> 
> 
> #### RAID - 5
> 
> 
>
> - 3개 이상의 디스크를 붙여서 하나의 디스크처럼 사용하고 각각의 디스크에 패리티 정보를 가지고 있는 방식
> - 패리티 디스크를 별도로 사용하지 않음으로 병목현상이 발생하지 않음
> 
> 
> 
> #### RAID - 6
> 
> 
>
> - 하나의 패리티를 두 개의 디스크에 분산 저장하는 방식
> - 패리티를 이중으로 저장하기 때문에 두 개의 디스크에 에러가 발생해도 정상적 복구 가능
> 
> 

---

## 분산 DB

### 정의

- 여러 곳으로 분산되어있는 DB를 하나의 가상 시스템으로 사용할 수 있도록 한 DB

- 논리적으로 동일한 시스템에 속하지만, 컴퓨터 네트워크를 통해 물리적으로 분산되어 있는 데이터들의 모임

- DB를 연결하는 빠른 네트워크 환경을 이용하여 DB를 여러 지역 여러 노드로 위치시켜 사용성 / 성능 등을 극대화 시킨 DB

### 구성요소

`분산 처리기`

- 자체적으로 처리 능력을 가지며, 지리적으로 분산되어 있는 컴퓨터 시스템

`분산 DB`

- 지리적으로 분산되어 있는 DB로서 해당 지역의 특성에 맞게 DB가 구성

`통신 네트워크`

- 분산처리기등을 통신망으로 연결하여 논리적으로 하나의 시스템처럼 작동할 수 있도록 하는 통신 네트워크

### 장 & 단점

`장점`

- 지역 자치성, 점증적 시스템 용량 확장

- 신뢰성과 가용성 높음

- 효용성과 융통성 높음

- 빠른 응답속도와 통신 비용 절감

- 시스템 규모의 적절한 조절

- 각 지역 사용자의 요구 수용 증대

`단점`

- 소프트웨어 개발 비용 증가

- 오류의 잠재성 증대

- 처리 비용의 증대

- 설계, 관리의 복잡성과 비용 증대

- 불규칙한 응답 속도

- 통제의 어려움

- 데이터 무결성에 대한 위협

### 적용 기법

`테이블 위치 분산`

- 설계된 테이블의 위치를 각각 다르게 위치시키는 것

- 테이블의 구조가 변하지 않고, DB에 중복되어 생성되지 않음

`테이블 분할 분산 | Fragmentation`

- 각각의 테이블을 쪼개어 분산하는 방법

> 
> 
> 
> #### 종류
> 
> 
> `수평 분할 | Horizontal Fragmentation`
>
> - 테이블을 특정 칼럼의 값을 기준으로 로우를 분리
> - 컬럼은 분리되지 않음
> 
> `수직 분할 | Vertical Fragmentation`
>
> - 테이블 칼럼을 기준으로 컬럼을 분리
> 
> 

`테이블 복제 분산 | Replication`

- 동일한 테이블을 다른 지역이나 서버에서 동시에 생성하여 관리하는 유형

> 
> 
> 
> #### 종류
> 
> 
> `부분 복제 | Segment Replication`
>
> - 마스터 DB에서 테이블의 일부의 내용만 다른 지역이나 서버에 복제
> 
> `광역 복제 | Broadcast Replication`
>
> - 마스터 DB의 테이블의 내용을 각 지역이나 서버에 복제
> 
> `테이블 요약 분산 | Summarization`
- 지역 간에 또는 서버 간에 데이터가 비슷하지만 서로 다른 유형으로 존재
> 
> 
> 
> #### 종류
> 
> 
> `분석 요약 | Rollup Replication`
>
> - 각 지역별로 존재하는 요약정보를 마스터에 통합하여 다시 전체에 대해서 요약정보를 산출하는 분산방법
> 
> `통합 요약 | Consolidation Replication`
>
> - 각 지역별로 존재하는 다른 내용의 정보를 마스터에 통합하여 다시 전체에 대해서 요약정보를 산출하는 분산방법
> 
> 

### 투명성 조건 | Transparency

` 위치 투명성 | Location`

- 액세스하려는 DB의 실제 위치를 알 필요 없이 단지 DB의 논리적인 명칭만으로 액세스할 수 있음

- 데이터가 물리적으로 저장되어 있는 곳을 알 필요 없이 논리적인 입장에서 데이터가 모두 자신의 사이트에 있는 것처럼 처리하는 특성

`분할 투명성 | Division`

- 하나의 논리적 테이블이 여려 단편으로 분할되어 각 단편의 사본이 여러 위치에 저장

`지역사상 투명성 | Local Mapping`

- 지역 DBMS와 물리적 DB 사이의 Mapping 보장

- 각 지역 시스템 이름과 무관한 이름 사용 가능

`중복 투명성 | Replication`

- 동일 데이터가 여러 곳에 중복되어 있더라도 사용자는 마치 하나의 데이터만 존재하는 것처럼 사용하고, 시스템은 자동으로 여러 자료에 대한 작업을 수행

`병행 투명성 | Concurrency`

- 분산 DB와 관련된 다수의 트랜잭션들이 동시에 실현되더라도 그 트랜잭션의 결과는 영향을 받지 않음

`장애 투명성 | Failure`

- 트랜잭션, DBMS, 네트워크, 컴퓨터 장애에도 불구하고 트랜잭션을 정확하게 처리

---

## DB 이중화

### 구성

- 장애 발생 시 DB를 보호하기 위한 방법으로 동일한 DB를 중복시켜 동시에 갱신하여 관리하는 방법

- 서버와 네트워크, 프로그램 등의 정보 시스템이 지속적으로 정상 운영이 가능한 고가용성(HA | High Availability) 서버로 구성

### 목적

- 장애 또는 재해 시 빠른 서비스 재개를 위함

- 원활한 서비스의 성능을 보장하기 위함

### 분류

`Eager 기법`

- 트랜잭션 수행 중에 발생한 변경은 발생 즉시 모든 이중화서버로 전달하여 변경 내용 반영

`Lazy 기법`

- 트랜잭션의 수행이 완전히 완료된 후에 변경 사실에 대한 새로운 트랜잭션을 작성하여 각 노드에게 전달하는 기법

### 종류

`Active - Active`

- 다중화된 장비가 모두 가동되는 방식

- 두 대를 모두 사용하기 때문에 처리율이 높지만 구성이 복잡

- 사용자 세션관리와 부하에 대한 분산처리에 대해 고려

`Active - Standby`

- 두 대 중 하나는 가동이 되고, 하나는 장애 상황의 경우를 대비하여 준비상태로 대기

- 장애가 발생하여 Active 장비가 죽게 되면 Standby 장비가 Active 상태가 되어 서비스에 문제가 없도록 처리

- 종류 : Hot Standby, Warm Standby, Cold Standby

### 고가용성 | High Availability

- 서버와 네트워크, 프로그램 등의 정보 시스템이 오랜 기간 동안 지속적으로 정상 운영이 가능한 성질

- 가용성이 높다는 의미로 고장이 나지 않음을 의미

- 고가용성을 제공하기 위해 주로 2개의 서버를 연결하는 방식 사용

---

## DB 암호화

### 개념

- DB의 내용을 암호화하는 것

- 주민등록번호, 신용카드번호 등 민감한 개인정보를 DB에 저장한 경우, 해킹 등으로 유출될 것에 대비하여 DB내용을 암호화하는 것

### 필요성

- 데이터 자산가치의 증가

- 내부자에 의한 정보 유출 및 보안사고 급증

- 피해규모, 확산속도 가속 및 막대한 사회적 비용 발생

- 개인정보 유출에 대한 불안감 고조 및 신뢰성 저하

- 어플리케이션 구축 및 운영 시의 보안 허점

### 방식

`API 방식`

- DB 솔루션 외부의 어플리케이션에서 데이터의 암 / 복호화를 수행

`Plug-in 방식`

- DB 서버에 제품을 설치 -> 암 / 복호화 수행

`TDE 방식 | Transparent Data Encryption`

- DBMS에 내장 또는 옵션으로 제공되는 암호화 기능을 이용하는 방식

- DB 내부에서 암 / 복호 처리를 하는 방식

- 응용 프로그램에 대한 수정이 없고 인덱스의 경우 DBMS 자체 인덱스 기능과 연동이 가능

`파일 암호화 방식`

- 데이터뿐만 아니라 비정형 데이터 암호화 적용 가능

`하드웨어 방식`

- 별도의 하드웨어 장비를 외부에 설치

`Hybrid 방식`

- Plug-in 방식의 단점인 배치 업무의 성능 저하를 보완하기 위해 API방식을 이용하는 구성

### 국가정보원 권고사항

`안전한 알고리즘`

- 안전성이 검증된 암호모듈, 알고리즘 등 사용

- SEED, ARIA, SHA-256

`암호 키 관리`

- 암호키 생성, 접근, 갱신, 파기 등의 안전성 확보

`데이터 암 / 복호화`

- 암호문, 인덱스 등 중요 데이터의 안전성 확보

`접근 통제`

- 비인가자의 접근 차단

`암호 통신`

- 전송 데이터의 기밀성, 무결성 유지

`식별 및 인증`

- 제품 사용자의 신원 확인 및 검증

`보안 감사`

- 제품 관련 중요 이벤트에 대한 감사 기록

`보안 관리`

- 보안 정책, 검사 기록 등의 효율적인 관리