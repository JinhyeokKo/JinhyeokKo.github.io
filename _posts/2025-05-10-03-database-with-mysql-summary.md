---
title: 03. SQL Basics-Summary
date: 2025-05-10
categories: [ Database With MySQL ]
tags: [ Summary ]
layout: post
---

# SQL Basics

## summary

### MySQL 기본 명령어

| 기능                              | 명령어                         |
|:--------------------------------|:----------------------------|
| mySQL 접속<br/>(윈도 cmd 창에서 사용 가능) | mysql -u [username] -p;     |
| 데이터베이스 선택                       | use [database];             |
| 데이터베이스 보기                       | show database;              |
| 데이터베이스 생성                       | create database [database]; |
| 테이블 보기                          | show tables;                |
| 종료                              | exit;                       |

### SQL

* Structured Query Language
* 1970년대 후반 IBM이 SEQUEL(Structured English QUEry Language)라는 이름으로 개발한 관계형 데이터베이스 언어
* 이후 1986년 ANSI(American National Standards Institute)에 의해 관계형 데이터베이스 표준 언어로 승인
* 비절차적(non-procedural)인 언어로, 데이터를 조회하거나 조작하는 데 필요한 조건을 기술하지만 어떻게 데이터를 찾고 처리하는지와 같은 실행 절차를 직접 명시하지 않음

### SQL과 일반 프로그래밍 언어 차이점

* SQL은 프로그래밍 언어가 아닌 데이터 부속어(data sublanguage)

| 구분  | SQL                  | 일반 프로그래밍 언어       |
|:----|:---------------------|:------------------|
| 용도  | DB에서 데이터를 추출하여 문제 해결 | 모든 문제 해결          |
| 입출력 | 입력과 출력 모두 테이블        | 모든 형태의 입출력 가능     |
| 번역  | DBMS                 | Compiler          |
| 문법  | SELECT * FROM Table  | int main () {...} |

### SQL의 기능에 따른 구분

**데이터 정의어(DDL)**

* Data Definition Language
* 테이블이나 관계의 구조를 생성하는 데 사용
* CREATE, ALTER, DROP 문

**데이터 조작어(DML)**

* Data Manipulation Language
* 테이블에 데이터를 검색, 삽입, 수정, 삭제할 때 사용
* SELECT, INSERT, DELETE, UPDATE 문
* SELECT 문은 데이터를 조회하는 명령어라 하여 특별히 질의어(query)라고 부름

**데이터 제어어(DCL)**

* Data Control Language
* 데이터의 사용 권한을 관리하는 데 사용
* GRANT, REVOKE 문

### 데이터 조작어

#### SELECT 문

> { } 는 필수, [ ] 는 선택, \| 는 선택 가능한 문법들 중 하나 사용 가능

**기본형**

```sql
SELECT [ ALL | DISTINCT ] 속성이름
FROM 테이블 이름
[ WHERE 검색조건 ]
[ GROUP BY 속성 이름 ]
[ HAVING 검색조건 ]
[ ORDER BY 속성이름 [ ASC | DES ] ]
```

**상세형**

```sql
SELECT
    [ ALL | DISTINCT ]
    [ 테이블이름.]{ *(asterisk) | 속성이름 [ [ AS ] 속성이름별칭 ] }
[ FROM
    { 테이블이름 [ AS 테이블이름별칭 ] }
    [ INNER JOIN | LEFT [ OUTER ] JOIN | RIGHT [ OUTER ] JOIN
    { 테이블이름 [ ON 검색조건 ] } ]
[ WHERE 검색조건 ]
[ GROUP BY { 속성이름, [ ..., n ] } ]
[ HAVING 검색조건 ]
[ 질의 UNION 질의 | 질의 UNION ALL 질의 ]
[ ORDER BY { 속성이름 [ASC | DESC ], [ ..., n ] } ]
```

**WHERE 조건**

* 조건에 맞는 검색을 할 때 사용
* 조건으로 사용할 수 있는 술어(predicate)에는 비교, 범위, 집합, 패턴, NULL 로 구분

| 술어   | 연산자                  | 사용 예                                     |
|:-----|:---------------------|:-----------------------------------------|
| 비교   | =, <>, <, <=, >, >=  | price < 3000                             |
| 범위   | BETWEEN              | price BETWEEN 1000 AND 2000              |
| 집합   | IN, NOT IN           | price IN (1000, 2000, 3000)              |
| 패턴   | LIKE                 | fruit LIKE 'banana'                      |
| NULL | IS NULL, IS NOT NULL | price IS NULL                            |
| 복합조건 | AND, OR, NOT         | (price < 2000) AND (fruit LIKE 'banana') |

**LIKE와 같이 사용 가능한 와일드 문자**

| 와일드 문자 | 의미                   | 사용 예                               |
|:-------|:---------------------|:-----------------------------------|
| %      | 0개 이상의 문자열과 일치       | `%바나나%` : 바나나를 포함하는 문자열            |
| [ ]    | 1개의 문자와 일치           | `[0-3]%` : 0-3 사이 숫자로 시작하는 문자열     |
| [^]    | 1개의 문자와 불일치          | `[^0-3]%` : 0-3 사이 숫자로 시작하지 않는 문자열 |
| _      | 특정 위치에 있는 1개의 문자와 일치 | `_나%` : 두 번쨰 위치에 '나'가 들어가는 문자열     |

#### 집계함수와 GROUP BY

**집계 함수**

* aggregate function
* 테이블의 각 열에 대해 계산하는 함수
* SUM, AVG, MIN, MAX, COUNT

**GROUP BY**

* 속성의 공통 값에 따라 그룹을 만드는 데 사용하는 명령
* GROUP BY를 사용해 튜플을 그룹으로 묶으면 `SELECT` 절에서는 GROUP BY 에서 사용한 `속성`과 `집계 함수`만 나올 수 있음

**HAVING**

* GROUP BY 절의 결과에 나타나는 그룹을 제한하는 역할
* HAVING 절은 반드시 GROUP BY 절과 함께 작성해야 하고 WHERE 절보다 뒤에 나와야 함
* `검색조건`에는 SUM, AVG, MAX, MIN, COUNT와 같은 `집계함수`가 와야 함

#### 두 개 이상의 테이블을 이용한 SQL 질의

**조인**

* 한 테이블의 행을 다른 테이블의 행에 연결하여 두 개 이상의 테이블을 결합하는 연산
* 두 테이블을 아무런 조건 없이 SELECT 시키면 관계대수의 카티션 프로덕트 연산

**동등조인**

* 동등 조건에 의하여 테이블을 조인하는 것
* 대부분의 조인을 이야기 함
* 내부조인이라고도 함

**부속질의**

* subquery
* SELECT 문의 WHERE 절에 또 다른 테이블 결과를 이용하기 위해 다시 SELECT 문을 괄호로 묶는 것
* 질의가 중첩되어 있다는 의미에서 중첩질의(nested query)라고도 함

**상관 부속질의**

* correlated subquery
* 상위 부속질의와 하위부속질의가 독립적이지 않고 상위 부속질의의 튜플을 이용하여 하위 부속질의를 계산하는 질의

**튜플 변수**

* tuple variable
* FROM 절의 테이블 이름 뒤에 테이블의 다른 이름을 붙여주는 것
* 테이블 이름이 길거나 하나의 SQL 문에 동일한 테이블을 두 번 이상 사용해야 할 때 사용

**집합 연산**

* SQL에서 집합 연산은 합집합을 UNION으로 나타냄
* MySQL에는 MINUS, INTERSECT 연산자가 없음
* MINUS 연산자는 NOT IN, NOT EXISTS, LEFT OUTER JOIN으로 대신 나타내고, INTERSECT 연산은 JOIN 또는 IN 연산으로 대신함

**EXISTS**

* 상관 부속질의문 형식
* 원래 단어에서 의미하는 것과 같이 조건에 맞는 튜플이 존재하면 결과에 포함
* 부속질의문의 어떤 행이 조건에 만족하면 참
* 반면 NOT EXISTS는 부속질의문의 모든 행이 조건에 만족하지 않을 때만 참

### 데이터 정의어

#### CREATE

* 테이블을 구성하고, 속성과 속성에 관한 제약을 정의하며, 기본키 및 외래키를 정의

> 대문자는 키워드, { } 안의 내용은 반복 가능, [ ] 은 선택적 사용, | 는 1개 선택

```sql
CREATE TABLE 테이블이름
    ( { 속성이름 데이터타입
        [ NULL | NOT NULL | UNIQUE | DEFAULT 기본값 | CHECK 체크조건 ]
        }
        [ PRIMARY KEY 속성이름 ]
        [ FOREIGN KEY 속성이름 REFERENCES 테이블이름(속성이름) ]
            [ ON DELETE { CASCADE | SET NULL } ]
    )
```

| 키워드         | 설명                    |
|:------------|:----------------------|
| NOT NULL    | NULL 값을 허용하지 않은 제약    |
| UNIQUE      | 유일한 값에 대한 제약          |
| DEFAULT     | 기본값 설정                |
| CHECK       | 값에 대한 조건을 부여          |
| PRIMARY KEY | 기본키 지정                |
| FOREIGN KEY | 외래키 지정                |
| ON DELETE   | 튜플 삭제 시 외래키 속성에 대한 동작 |

> ON DELETE 옵션으로는 CASCADE, SET NULL 이 있으며, 명시하지 않으면 RESTRICT(NO ACTION)

#### ALTER

* 생성된 테이블의 속성과 속성에 관한 제약을 변경하며, 기본키 및 외래키를 변경

```sql
ALTER TABLE 테이블이름
    [ ADD 속성이름 데이터타입 ]
    [ DROP COLUMN 속성이름 ]
    [ MODIFY 속성이름 데이터타입 ]
    [ RENAME 테이블 이름 ]
    [ ALTER COLUMN 속성이름 데이터타입 ]
    [ ALTER COLUMN 속성이름 [ NULL | NOT NULL ] ]
    [ ADD PRIMARY KEY(속성이름) ]
    [ [ADD | DROP ] 제약이름 ]
```

#### DROP

* 테이블의 구조와 데이터를 삭제(데이터만 삭제하려면 DELETE 문)

```sql
DROP TABLE 테이블이름
```

### 데이터 조작어

#### INSERT

```sql
INSERT INTO 테이블이름[ (속성리스트) ]
    VALUES (값리스트);
```

#### UPDATE

```sql
UPDATE 테이블이름
SET 속성이름 = 값
[ WHERE <검색조건> ];
```

#### DELETE

```sql
DELETE FROM 테이블이름
[ WHERE 검색조건 ];
```
