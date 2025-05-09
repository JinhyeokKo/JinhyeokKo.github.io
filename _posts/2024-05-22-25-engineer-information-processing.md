---
title: 25. 고급 SQL 작성
date: 2024-05-22
categories: [정보처리기사]
tags: [정보처리기사]
layout: post
---

## 집합 연산자

### 개념

- 여러 개의 질의의 결과를 연결하여 하나로 결합하는 방식

- 두 개 이상의 테이블에서 조인을 사용하지 않고 연관된 데이터를 조회하는 방법

- 집합 연산자를 사용하기 위해서는 SELECT 절의 컬럼 수가 동일하고, 동일 위치에 존재하는 컬럼의 데이터 타입이 상호 호환 가능해야 함

### 종류

`UNION`

- 여러 개의 SQL 문의 결과에 대한 합집합으로 결과에서 모든 중복된 행은 하나의 행으로 출력

`UNION ALL`

- 여러 개의 SQL 문의 결과에 대한 합집합으로 중복된 행도 그대로 결과로 표시

`INTERSECT`

- 여러 개의 SQL 문의 결과에 대한 교집합으로 중복된 행은 하나의 행으로 출력

`EXCEPT(MINUS)`

- 앞의 SQL 문의 결과에서 뒤의 SQL 문의 결과에 대한 차집합으로 중복된 행은 하나의 행으로 출력

---

## JOIN

### 개념

- 두 개 이상의 테이블을 결합하여 데이터를 검색하는 방법

- 조인 연산자를 사용해 관련 있는 컬럼 기준으로 행을 합쳐주는 연산

- Primary Key 혹은 Foreign Key로 두 테이블을 연결

### 종류

`내부 조인 | Inner Join`

- 두 테이블에 존재하는 데이터 중에 공통된 데이터만 추출

`자연 조인 | Natural Join`

- 동일한 타입과 이름을 가진 컬럼을 조인 조건으로 이용하는 조인을 간단히 표현하는 방법

- 반드시 두 테이블 간의 동일한 이름, 타입을 가진 컬럼이 필요

- 조인에 이용되는 컬럼은 명시하지 않아도 자동으로 조인에 사용

- 동일한 이름을 갖는 컬럼이 있지만 데이터 타입이 다르면 에러 발생

- 두 테이블이 갖는 공통 컬럼에 대해서 Inner Join은 별개의 컬럼으로 나타내지만, Natural Join은 하나의 컬럼으로 나타냄

`전체 외부 조인 | Full Outer Join`

- 좌측 테이블과 우측 테이블의 데이터를 모두 읽어 중복된 데이터는 삭제한 JOIN 결과 반환

`왼쪽 외부 조인 | Left Outer Join`

- 좌측 테이블 기준으로 일치하는 행만 결합하고, 일치하지 않는 부분은 NULL로 채움

`오른쪽 외부 조인 | Right Outer Join`

- 우측 테이블 기준으로 일치하는 행만 결합하고, 일치하지 않는 부분은 NULL로 채움

`곱집합 | Cross Join`

- 두 테이블 데이터의 모든 조합을 반환

- 조인 조건이 없는 조인

---

## Sub-query

### 개념

- SELECT문 안에 다시 SELECT문이 기술된 형태의 쿼리

### 종류

`Scalar Sub-query`

- SELECT 절 안에 서브쿼리가 들어있는 형태

- 반드시 단일행이거나, SUM / COUNT 등의 집계함수를 거친 단일값이 리턴되어야 함

`Inline Views Sub-query`

- FROM 절 안에 서브쿼리 존재

- 서브쿼리의 결과는 반드시 하나의 테이블로 리턴되어야 함

`Nested Sub-query | 중첩`

- WHERE 절 안에 서브쿼리 존재

- 단일 행 서브쿼리 연산자 : >, >=, <, <=, = 등

- 다중 행 서브쿼리 연산자
  - IN : 서브쿼리의 결과값을 포함하고 있으면 출력
  - EXISTS : 서브쿼리 결과값의 행 존재 여부를 확인하여 출력
  - ANY(SOME) : 서브쿼리 결과값이 여러 개 나온 경우, 서브쿼리의 결과값이 하나라도 만족하면 출력
  - ALL : 서브쿼리 결과값이 여러 개 나온 경우, 서브쿼리의 결과값을 모두 만족하는 값을 출력

---

## 윈도우 함수

### 개념

- 행과 행 간의 관계를 쉽게 정의하기 위해 만든 함수

- 분석 함수나 순위 함수를 말함

### 종류

`그룹 내 순위 함수`

- RANK : 특정 항목에 대한 순위를 구하는 함수

- DENSE_RANK : RANK 함수와 흡사하나, 동일한 순위를 하나의 건수로 취급

- ROW_NUMBER : 동일한 값이라도 고유한 순위를 부여

`그룹 내 집계 함수`

- SUM : 합을 구하는 함수

- MAX : 최댓값을 구하는 함수

- MIN : 최솟값을 구하는 함수

- AVG : 평균값을 구하는 함수

- COUNT : 행의 건수를 구하는 함수

`그룹 내 행 순서 함수`

- FIRST_VALUE : 파티션 별 윈도우에서 가장 먼저 나온 값

- LAST_VALUE : 파티션 별 윈도우에서 가장 나중에 나온 값

- LAG : 파티션 별 윈도우에서 이전 몇 번째 행의 값

- LEAD : 파티션 별 윈도우에서 이후 몇 번째 행의 값

`그룹 내 비율 함수`

- CUME_DIST : 파티션 별 윈도우의 전체건수에서 현재 행보다 작거나 같은 건수에 대한 누적백분율

- PERCENT_RANK : 파티션 별 윈도우에서 제일 먼저 나온 것을 0으로 제일 늦게 나오는 것을 1로 하여 값이 아닌 행의 순서별 백분율

- NTILE : 파티션 별 전체 건수를 인자값으로 N등분한 결과

- RATIO_TO_REPORT : 파티션 내 전체 SUM 값에 대한 행별 컬럼 값의 백분율을 소수점으로 구함

### OLAP | Online Analytical Processing

- DB를 사용한 실시간 데이터 분석 처리

- 분석가가 서로 다른 관점에서 비즈니스 데이터를 여러 DB로부터 추출하고 분석할 수 있게 해주는 기술

> 
> 
> 
> #### 기본 분석 유형
> 
> 
> `Roll-up`
>
> - 작은 단위에서 큰 단위로 이동하는 연산
> 
> `Drill-down`
>
> - 큰 단위에서 작은 단위로 세분화
> - 요약된 형태의 데이터 수준에서 더 자세한 자료를 보고자 할 때 사용하는 연산
> 
> `Drill-across`
>
> - 다른 큐브의 데이터에 접근(큐브 간 전환)
> 
> `Drill-through`
>
> - OLAP에서 DW나 OLTP에 존재하는 상세 데이터에 접근(원천 조회)
> 
> `Slice, Slicing`
>
> - 하나 혹은 그 이상의 축(속성 값을 고정)을 중심으로 셀들을 선택
> - 한 차원을 잘라보고 동시에 다른 차원을 자르면서 데이터의 범위를 좁혀가는 연산
> 
> `Dice, Dicing`
>
> - 속성 값의 범위를 명시하여 셀들의 부분집합(부분큐브)을 선택
> 
> `Pivot`
>
> - 데이터 축을 회전하여 제공
> - 하나의 차원 구조로부터 다른 차원 구조로 변환하는 연산
> 
> 

---

## 그룹 함수

### 개념

- 하나 이상의 행을 그룹으로 묶어 연산하여 하나의 결과를 나타내는 것

### 종류

- ROLLUP : 소그룹 간의 소계를 계산

- CUBE : GROUP BY 항목들 간 다차원적인 소계를 계산

- GROUPING SETS : 특정 항목에 대한 소계를 계산