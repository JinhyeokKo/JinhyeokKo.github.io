---
title: 24. 기본 SQL 작성
date: 2024-05-21
categories: [정보처리기사]
tags: [정보처리기사]
layout: post
---

## SQL | Structured Query Language

### 개념

- DB 시스템에서 자료를 처리하는 용도로 사용되는 구조적 데이터 질의 언어

- RDBMS의 데이터를 관리하기 위해 설계된 특수 목적의 프로그래밍 언어

### 특징

- 영어 문장과 비슷한 구문을 갖추고 있어 쉽게 배우고 사용할 수 있는 언어

- SQL은 데이터 연산에 대한 처리가 절차적으로 진행되지 않고, 데이터의 집합 단위로 처리

- 표준 SQL 문법이 존재해 DBMS 종류에 얽매이지 않고 사용

- SQL은 기본적으로 대소문자를 구분하지 않음

- 한 줄 주석은 --를 앞에 붙여 사용하고, 여러 줄 주석은 /* */로 감싸줌

### 문법의 종류

`데이터 정의어 | Data Definition Language`

- 데이터가 저장되는 테이블이나 각종 개체들을 정의하는 데 사용되는 명령

- CREATE, ALTER, DROP, RENAME, TRUNCATE

`데이터 조작어 | Data Manipulation Language`

- DB 내의 데이터를 조작(추출, 생성, 수정, 삭제)하는 명령

- SELECT, INSERT, UPDATE, DELETE

`데이터 제어어 | Data Control Language`

- DB에 접근, 사용할 수 있도록 권한을 주고 회수하는 명령

- GRANT, REVOKE

`트랜잭션 제어어 | Transaction Control Language`

- 작업 단위를 묶어 작업된 결과를 작업단위별로 제어하는 명령어

- COMMIT, ROLLBACK, SAVEPOINT

---

## Data Definition Language

### 개념

- 데이터가 저장되는 테이블이나 각종 개체들을 정의하는 데 사용되는 언어

- 데이터를 담는 그릇을 정의하는 언어

### 객체 유형

`Schema`

- DBMS 특성과 구현환경을 감안한 데이터 구조

`Domain`

- 속성의 데이터 타입과 크기, 제약조건 등을 지정

- 속성이 가질 수 있는 값의 범위

`Table`

- 데이터의 저장 공간

`View`

- 하나 이상의 물리적인 테이블에서 유도되는 가상의 논리 테이블

`Index`

- 검색을 빠르게 하기 위한 데이터 구조

### 조작 방법

`CREATE`

- 생성 명령어

- DB 오브젝트 생성

> 
> 
> 
> #### DB 생성
> 
> 
> 
> 
> ```sql
> -- db 라는 이름으로 생성
> CREATE DATABASE db;
> ```
> 
> 
> 
> 
> #### TABLE 생성
> 
> 
> 
> 
> ```sql
> -- 회원 테이블 생성
> CREATE TABLE 회원(
>     USER_NO INT(11) NOT NULL AUTO_INCREMENT,
>     NAME VARCHAR(50) NOT NULL,
>     AGE TINTINT(4) DEFAULT '0',
>     PRIMARY KEY (USER_NO)
>     );
> ```
> 
> 
> 
> 
> #### INDEX 생성
> 
> 
> 
> 
> ```sql
> -- 회원 테이블에 search_name 이름의 인덱스 생성
> CREATE INDEX search_name
> ON 회원 (name);
> ```
> 
> 
> 
> 
> #### VIEW 생성
> 
> 
> 
> 
> ```sql
> -- 회원 테이블에서 이름과 나이만 가져오는 뷰 생성
> CREATE VIEW v_user
> AS
> 	SELECT name, age FROM 회원
> ;
> ```
> 
> 
> 

`ALTER`

- 변경 명령어

- DB 오브젝트 변경

> 
> 
> 
> #### 속성 추가
> 
> 
> 
> 
> ```sql
> -- 회원 테이블에 ADDR 속성 추가
> ALTER TABLE 회원 ADD ADDR VARCHAR(200) null;
> ```
> 
> 
> 
> 
> #### 속성 변경
> 
> 
> 
> 
> ```sql
> -- 회원 테이블에 AGE 속성 INT로 변경
> ALTER TABLE 회원 MODIFY AGE INT(11);
> ```
> 
> 
> 
> 
> ### 속성 삭제
> 
> 
> 
> 
> ```sql
> -- 회원 테이블에 AGE 속성 삭제
> ALTER TABLE 회원 DROP COLUMN AGE;
> ```
> 
> 
> 
> 
> #### 인덱스 변경
> 
> 
> 
> 
> ```sql
> -- 회원명 인덱스를 성명으로 변경
> ALTER INDEX 회원명 RENAME TO 성명
> -- 인덱스의 속도가 저하되거나 깨졌을 경우 인덱스 재구성
> ALTER INDEX 회원명 REBUILD
> -- 인덱스 비활성화
> ALTER INDEX 회원명 UNUSABLE
> ```
> 
> 
> 

`DROP`

- 삭제 명령어

- DB 오브젝트 삭제

> 
> 
> 
> #### 테이블 삭제
> 
> 
> 
> 
> ```sql
> -- 회원 테이블 삭제
> DROP TABLE 회원;
> ```
> 
> 
> 

`TRUNCATE`

- 데이터 삭제 명령어

- DB 오브젝트 내용 삭제(비우기)

> 
> 
> 
> #### 내용 삭제
> 
> 
> 
> 
> ```sql
> -- 회원 테이블 내용 삭제
> TRUNCATE [TABLE] 회원;
> ```
> 
> 
> 

### 제약 조건 적용

`PRIMARY KEY`

- 테이블의 기본키를 정의

- 기본으로 NOT NULL, UNIQUE 제약이 포함

`FOREIGN KEY`

- 외래키를 정의

- 참조 대상을 테이블이름(열이름)으로 명시

- 참조 무결성 위배 상황 발생 시 처리 방법으로 옵션 지정 가능

- ex) FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE;

`UNIQUE`

- 테이블 내에서 열은 유일한 값을 가져야 함

- 테이블 내에서 동일한 값을 가져서는 안되는 항목에 지정함

- ex) USER_ID VARCHAR(10) UNIQUE NOT NULL

`NOT NULL`

- 테이블 내에서 관련 열의 값은 NULL일 수 없음

- 필수 입력 항목에 대해 제약조건으로 설정

- ex) USER_ID VARCHAR(10) NOT NULL,

`CHECK`

- 개발자가 정의하는 제약조건

- 상황에 따라 다양한 조건 설정 가능

- ex) CONSTRAINT user_jumin CHECK(LENGTH(jumin)=13)

---

## Data Manipulation Language

### 개념

- DB에 대해 데이터 검색, 등록, 삭제, 수정을 위한, DB 언어

- 관계형 DB에 대해 검색 및 업데이트 등의 데이터 조작을 위해 사용

### 조작 방법

`INSERT`

- 테이블의 데이터를 추가

- 컬럼의 순서와 값의 순서가 같아야 해당 컬럼으로 데이터가 추가

```sql
-- 회원 데이터 추가
INSERT INTO 회원 (NAME, AGE)
VALUES ('이민정', '41');
-- 여러 행을 검색하여 추가
INSERT INTO 회원
SELECT NAME, AGE FROM 회원2
```

`SELECT`

- 하나 또는 그 이상의 테이블에서 데이터를 추출하는 SQL의 데이터 조작어

- 사용 키워드
  - WHERE : 조건에 맞는 데이터를 지정
  - GROUP BY : 특정 속성을 그룹으로 만들어서 집계 함수를 사용
  - HAVING : GROUP BY 절에 정의된 조건
  - ORDER BY : 반환되는 열의 순서를 지정

- 논리 연산자 : NOT, AND, OR

`UPDATE`

- 테이블에 있는 데이터를 갱신

- 셀 단위로 갱신이 가능

- WHERE 절을 생략했을 경우 모든 행이 갱신

`DELETE`

- 테이블에 있는 일부 데이터를 직접 삭제

- WHERE 절을 생략했을 경우 모든 행이 삭제

---

## Data Control Language

### 개념

- DB에 접근하거나 객체에 권한을 주는 등의 역할을 하는 언어

- 사용자에게 권한 생성 혹은 권한 삭제 같은 명령어

### 조작 방법

`GRANT`

- DB 사용자에게 권한을 부여하는 명령

> 
> 
> 
> ```sql
> -- GRANT [권한] ON [객체명] TO [사용자 계정] [WITH GRANT OPTION];
> GRANT SELECT ON 사원정보 TO MINJUNG WITH GRANT OPTION;
> -- WITH GRANT OPTION : 지정된 권한을 다른 유저에게 부여할 수 있도록 함
> ```
> 
> 
> 

`REVOKE`

- DB 사용자에게서 권한을 회수하려는 명령

> 
> 
> 
> ```sql
> -- REVOKE [권한] ON [객체명] FROM [사용자 계정] [CASCADE]
> REVOKE SELECT ON 사원번호 FROM MINJUNG CASCADE
> ```
> 
> 
> 

`사용 예시`

> 
> 
> 
> ```sql
> DBA : GRANT SELECT ON 사원정보 TO MINJUNG WITH GRANT OPTION
> U1 : GRANT SELECT ON 사원정보 TO U2
> DBA : REVOKE SELECT ON 사원번호 FROM MINJUNG CASCADE
> ```
> 
> 
> 1. DBA가 U1 사용자에게 SELECT 권한을 주면서 U1 사용자에게 다른 계정에 대한 SELECT 권한을 부여할 수 있도록 WITH GRANT OPTION 추가
> 2. U1 사용자가 U2 사용자에게 SELECT 권한 부여
> 3. DBA가 U1 사용자에게 부여했던 SELECT 권한을 회수하며, U1 사용자가 부여했던 모든 사용자에 대한 권한도 함께 회수
> 
> 

---

## Transaction Control Language

### 개념

- 트랜잭션을 제어하는 명령인 COMMIT과 ROLLBACK만을 따로 분리해서 TCL이라고 표현

### 종류

`COMMIT`

- 트랜잭션 처리가 정상적으로 종료되어 트랜잭션이 수행한 내용을 DB에 반영하는 연산

`ROLLBACK`

- 트랜잭션 처리 중 오류 등의 이유로 변경사항이 취소되고 데이터의 이전 상태로 복구하는 연산

- 관련된 행에 대한 잠금이 풀리고, 다른 사용자들이 행을 조작할 수 있게 됨

`SAVEPOINT`

- 롤백 시 저장점을 정의하여 전체 작업을 롤백하는 것이 아닌 SAVEPOINT 이후의 작업까지만 롤백할 수 있는 기능

---

## 트랜잭션

### 개념

- DB의 상태를 변환시키는 하나의 논리적인 기능을 수행하는 작업 단위

- 한꺼번에 모두 수행되어야 할 연산

### 성질

`원자성 | Atomicity`

- 트랜잭션의 연산은 DB에 모두 반영되든지 아니면 전혀 반영되지 않아야 함

- 트랜잭션 내의 모든 명령은 반드시 완벽히 수행되어야 하며, 모두가 완벽히 수행되지 않고 하나라도 오류가 발생하면 트랜잭션 전부가 취소되어야 함

- Commit과 Rollback 명령어에 의해 보장받음

`일관성 | Consistency`

- 트랜잭션이 그 실행을 성공적으로 완료하면 언제나 일관성 있는 DB상태로 변환

- 시스템이 가지고 있는 고정요소는 트랜잭션 수행 전과 트랜잭션 수행 완료 후의 상태가 같아야 함

`독립성, 격리성 | Isolation`

- 둘 이상의 트랜잭션이 동시에 병행 실행되는 경우 어느 하나의 트랜잭션 실행중에 다른 트랜잭션의 연산이 끼어들 수 없음

- 수행중인 트랜잭션은 완전히 완료될 때까지 다른 트랜잭션에서 수행 결과를 참조할 수 없음

`영속성 | Durability`

- 성공적으로 완료된 트랜잭션의 결과는 시스템이 고장이 나더라도 영구적으로 반영되어야 함

### 상태

`활동 | Active` : 트랜잭션이 실행 중  
`실패 | Failed` : 트랜잭션 실행에 오류가 발생하여 중단  
`철회 | Aborted` : 트랜잭션이 비정상적으로 종료되어 Rollback 연산을 수행  
`부분 완료 | Partially Committed` : 트랜잭션의 마지막 연산까지 실행했지만, Commit 연산이 실행되기 직전  
`완료 | Committed` : 트랜잭션이 성공적으로 종료되어 Commit 연산을 실행한 후  