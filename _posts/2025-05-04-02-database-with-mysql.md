---
title: 02. Relation Data Model-Example
date: 2025-05-04
categories: [ Database With MySQL ]
tags: [ Database, MySQL ]
layout: post
---

# Relation Data Model

## example

### 관계 데이터 모델의 릴레이션

1. 릴레이션은 릴레이션 스키마와 릴레이션 인스턴스로 구성
2. ~~릴레이션 스키마를 외연(extension)이라고 함~~
3. 릴레이션 스키마는 정적인 성질
4. 릴레이션 인스턴스는 동적인 성질

> 스키마(내포), 인스턴스(외연)

### 릴레이션의 특징

1. 중복된 튜플이 존재
2. 튜플 간의 순서가 정의됨
3. 속성 간의 순서가 정의됨
4. 모든 속성값은 원자값

> 1. 모든 튜플은 서로 값이 달라야 함
> 2. 튜플의 순서가 달라도 같은 릴레이션
> 3. 속성의 순서가 달라도 릴레이션 스키마는 같음
> 4. 각 속성의 값은 도메인에 정의된 값만 가지며 그 값은 모두 단일 값

### 하나의 속성이 가질 수 있는 값을 총칭하는 단어

1. 튜플
2. 릴레이션
3. 도메인
4. 엔티티

> 1. 릴레이션의 행
> 2. 테이블
> 3. 속성이 가질 수 있는 값의 집합
> 4. 테이블

### 외래키에 대한 설명

1. 릴레이션 R1에 속한 속성 집합 FK가 다른 릴레이션 R2의 기본키인 것
2. 외래키와 기본키가 정의된 도메인은 다를 수 있음
3. 외래키는 NULL 값을 가질 수 없음
4. 둘 이상의 후보키 중에서 하나를 선정하여 대표로 삼은 키

> 1. 다른 릴레이션의 기본키를 참조하는 속성
> 2. 참조하고(외래키) 참조되는(기본키) 양쪽 릴레이션의 도메인은 서로 같아야 함
> 3. NULL 값과 중복값 등이 허용
> 4. 기본키에 대한 설명

### 제약조건 정의

Q. 한 릴레이션의 기본키를 구성하는 어떠한 속성값도 NULL 값이나 중복값을 가질 수 없다는 것을 의미하는 제약조건
> A. 개체 무결성 제약조건

### 관계대수 연산자

Q. 릴레이션에서 특정 속성에 해당하는 열을 선택하는 데 사용하며, 릴레이션의 수직적 부분집합을 반환하는 관계대수 연산자
> A. projection

### 릴레이션 C가 릴레이션 A(X, Y)와 B(Y, Z)를 자연조인한 결과일 때 다음 중 옳은 설명

1. C의 카디날리티는 A의 카디날리티보다 많음
2. C의 카디날리티는 A의 카디날리티보다 적음
3. C의 차수는 A의 차수보다 많음
4. C의 차수는 A의 차수보다 적음
5. 모두 틀림

> 카디날리티는 도메인에 따라 변경될 수 있고 차수는 중복을 막기 위해 두 번째 속성을 제거한 결과를 반환하여 두 릴레이션의 차수의 합-1의 수가 도출

### 관계형 데이터베이스에 대한 설명

1. 기본키 속성이 복합 속성인 경우 그 속성의 일부 요소 속성에서 NULL 값을 가질 수 있음
2. 슈퍼키는 후보키가 되기 위한 필요충분조건
3. 릴레이션 R이 릴레이션 S를 참조하는 경우 R의 외래키가 S의 기본키가 아닌 후보키 중 하나를 참조해야 함
4. 테이블에 튜플 삽입 시 엔티티 무결성 혹은 키 제약조건, 도메인 제약조건, 참조 무결성 제약조건이 위배될 수 있음

> 1. 기본키는 NULL 값을 가질 수 없음
> 2. 필요조건은 맞지만 충분조건은 아님(유일성은 만족하지만 최소성을 충족하지 못함)
> 3. 기본키를 참조해야함

### 관계형 데이터베이스 릴레이션의 특성

1. 한 릴레이션에는 동일한 값을 가지는 튜플이 두 개 이상 존재할 수 없음
2. 한 릴레이션에서 한 속성의 값은 모두 같은 도메인에 속해야 함
3. 한 릴레이션에서 튜플의 순서는 중요하지 않음
4. 한 릴레이션에서 속성의 순서는 중요하지 않음
5. 한 릴레이션에서 속성은 다중 값을 포함할 수 있음

> **5.** 각 속성의 값은 도메인에 정의된 값만 가지며 그 값은 모두 단일 값을 가짐

### 릴레이션 스키마와 무결성 제약조건에 대한 설명

1. 스키마에는 무결성 제약조건이 포함
2. 스키마는 데이터베이스 상태와 마찬가지로 변경될 수 있음
3. 참조 무결성 제약조건은 두 릴레이션의 연관된 튜플들 사이의 무결성 유지와 관련이 있음
4. 한 릴레이션에 외래키가 여러 개 존재할 수 있음
5. 외래키도 기본키의 구성요소가 될 수 있음

> **2.** 데이터베이스 상태(인스턴스)의 경우 자주 변경될 수 있으나 스키마의 경우 일반적으로 잘 변경되지 않음(변경은 가능)

### 키 설정 1

* 사원(주민등록번호, 사원번호, 사원이름, 주소, 생년월일) 릴레이션이 존재
* 기본키는(사원이름, 생년월일)이고, 그 밖의 대체키 1은 주민등록번호, 대체키 2는 사원번호

Q. (주민등록번호, 주소)는 후보키인가?
> A. 주민등록번호는 후보키(대체키 1)이므로 주소를 추가하면 최소성을 위배함(슈퍼키는 가능)

Q. 사원번호는 슈퍼키인가?
> A.유일하게 식별가능하며 중복될 수 없는 값이므로 슈퍼키 가능

Q. 생년월일은 NULL 값을 가질 수 있는가?
> A. 기본키로 사용하고 있으므로 불가능

Q. 주소는 NULL 값을 가질 수 있는가?
> A. 후보키로 사용하지 않고 있어 가능(일반 속성)

### 키 설정 2

| **R** |    |    |     | **S** |    |    |
|:-----:|:--:|:--:|-----|-------|----|----|
|   A   | B  | C  |     | C     | D  | E  |
|  a1   | b1 | c1 |     | c1    | d2 | e1 |
|  a2   | b1 | c1 |     | c1    | d1 | e2 |
|  a3   | b1 | c2 |     | c2    | d3 | e3 |
|  a4   | b2 | C3 |     | C3    | d3 | e3 |

Q. 릴레이션 R과 S의 후보키
> A. 릴레이션 R은 A, 릴레이션 S는 {C, D}, {C, E}

Q. 릴레이션 R과 S의 가장 적합한 기본키
> A. 릴레이션 R은 A, 릴레이션 S는 {C, D} 혹은 {C, E}

### 관계대수식의 결과 1

| **R** |    |    |     | **S** |    |    |
|:-----:|:--:|:--:|-----|-------|----|----|
|   A   | B  | C  |     | C     | D  | E  |
|  a1   | b1 | c1 |     | c1    | d2 | e1 |
|  a2   | b1 | c1 |     | c1    | d1 | e2 |
|  a3   | b1 | c2 |     | c2    | d3 | e3 |
|  a4   | b2 | c4 |     | c5    | d3 | e3 |

Q. **σ** A=a2 (R)
> A.
>
> |   A   |  B  |  C  |
> | :---: | :-: | :-: |
> |  a2   | b1  | c1  |

Q. **π** A, B (R)
> A.
>
> |   A   |  B  |
> | :---: | :-: |
> |  a1   | b1  |
> |  a2   | b1  |
> |  a3   | b1  |
> |  a4   | b2  |

Q. **π** A, B (**σ** A=a2 (R))
> A.
>
> |   A   |  B  |
> | :---: | :-: |
> |  a2   | b1  |

Q. R X S
> A.
>
> | A  | B  | C  | C  | D  | E  |
> |:--:|:--:|:--:|:--:|:--:|:--:|
> | a1 | b1 | c1 | c1 | d2 | e1 |
> | a1 | b1 | c1 | c1 | d1 | e2 |
> | a1 | b1 | c1 | c2 | d3 | e3 |
> | a1 | b1 | c1 | c5 | d3 | e3 |
> | a2 | b1 | c1 | c1 | d2 | e1 |
> | a2 | b1 | c1 | c1 | d1 | e2 |
> | a2 | b1 | c1 | c2 | d3 | e3 |
> | a2 | b1 | c1 | c5 | d3 | e3 |
> | a3 | b1 | c2 | c1 | d2 | e1 |
> | a3 | b1 | c2 | c1 | d1 | e2 |
> | a3 | b1 | c2 | c2 | d3 | e3 |
> | a3 | b1 | c2 | c5 | d3 | e3 |
> | a4 | b2 | c4 | c1 | d2 | e1 |
> | a4 | b2 | c4 | c1 | d1 | e2 |
> | a4 | b2 | c4 | c2 | d3 | e3 |
> | a4 | b2 | c4 | c5 | d3 | e3 |

Q. R ⋈ R.C = S.C S
> A.
>
> | A  | B  | C  | D  | E  |
> |:--:|:--:|:--:|:--:|:--:|
> | a1 | b1 | c1 | d2 | e1 |
> | a1 | b1 | c1 | d1 | e2 |
> | a2 | b1 | c1 | d2 | e1 |
> | a2 | b1 | c1 | d1 | e2 |
> | a3 | b1 | c2 | d3 | e3 |

Q. R ⟕ R.C = S.C S
> A.
>
> | A  | B  | C  |  D   |  E   |
> |:--:|:--:|:--:|:----:|:----:|
> | a1 | b1 | c1 |  d2  |  e1  |
> | a1 | b1 | c1 |  d1  |  e2  |
> | a2 | b1 | c1 |  d2  |  e1  |
> | a2 | b1 | c1 |  d1  |  e2  |
> | a3 | b1 | c2 |  d3  |  e3  |
> | a4 | b2 | c4 | NULL | NULL |

Q. R ⟖ R.C = S.C S
> A.
>
> |   A  |  B   | C  | D  | E  |
> |:----:|:----:|:--:|:--:|:--:|
> |  a1  |  b1  | c1 | d2 | e1 |
> |  a1  |  b1  | c1 | d1 | e2 |
> |  a2  |  b1  | c1 | d2 | e1 |
> |  a2  |  b1  | c1 | d1 | e2 |
> |  a3  |  b1  | c2 | d3 | e3 |
> | NULL | NULL | c5 | d3 | e3 |

Q. R ⟗ R.C = S.C S
> A.
>
> |  A   |   B  | C  |   D  |   E  |
> |:----:|:----:|:--:|:----:|:----:|
> |  a1  |  b1  | c1 |  d2  |  e1  |
> |  a1  |  b1  | c1 |  d1  |  e2  |
> |  a2  |  b1  | c1 |  d2  |  e1  |
> |  a2  |  b1  | c1 |  d1  |  e2  |
> |  a3  |  b1  | c2 |  d3  |  e3  |
> |  a4  |  b2  | c4 | NULL | NULL |
> | NULL | NULL | c5 |  d3  |  e3  |

Q. πC (R) ∪ πC (S)
> A.
>
> | C  |
> |:--:|
> | c1 |
> | c2 |
> | c4 |
> | c5 |

Q. πC (R) ∩ πC (S)
> A.
>
> | C  |
> |:--:|
> | c1 |
> | c2 |

### 관계대수식의 결과 2

**Customer**

| id |  name  | age | gender | jobid | cityid |
|:--:|:------:|:---:|:------:|:-----:|:------:|
| 1  |  John  | 25  |  Male  |   1   |   2    |
| 2  |  Sara  | 20  | Female |   3   |   3    |
| 3  | Victor | 31  |  Male  |   2   |   4    |
| 4  |  Jane  | 27  | Female |   1   |   2    |

**Job**

| jobid |  jobname   |
|:-----:|:----------:|
|   1   |  Engineer  |
|   2   | Programmer |
|   3   | Developer  |
|   4   |    DBA     |

**City**

| cityid |   cityname    |
|:------:|:-------------:|
|   1    |    Boston     |
|   2    |   New York    |
|   3    | San Francisco |
|   4    |    Toronto    |

Q. **π**name (**σ**age > 25 (Customer))
> A.
>
> |  name  |
> |:------:|
> | Victor |
> |  Jane  |


Q. **σ**id > 2 v age = 31 (Customer)
> A.
>
> | id |  name  | age | gender | jobid | cityid |
> |:--:|:------:|:---:|:------:|:-----:|:------:|
> | 3  | Victor | 31  |  Male  |   2   |   4    |
> | 4  |  Jane  | 27  | Female |   1   |   2    |

Q. **σ**Customer.jobid = Job.jobid (Customer X Job)
> A.
>
> | id |  name  | age | gender | jobid | cityid | jobid |  jobname   |
> |:--:|:------:|:---:|:------:|:-----:|:------:|:-----:|:----------:|
> | 1  |  John  | 25  |  Male  |   1   |   2    |   1   |  Engineer  |
> | 2  |  Sara  | 20  | Female |   3   |   3    |   3   | Developer  |
> | 3  | Victor | 31  |  Male  |   2   |   4    |   2   | Programmer |
> | 4  |  Jane  | 27  | Female |   1   |   2    |   1   |  Engineer  |

Q. Customer X Job X City
> A.
> 4 X 4 X 4의 64개 튜플 생성(조합 가능한 모든 조합)

Q. **π**name, gender (**σ**cityname="Boston" (Customer X City))
> A.
>
> |  name  | gender |
> |:------:|:------:|
> |  John  |  Male  |
> |  Sara  | Female |
> | Victor |  Male  |
> |  Jane  | Female |

### 관계대수식의 결과 3

조건 1. R(A, B)에는 r개의 튜플, S(B, C)에는 s개의 튜플  
조건 2. 결과가 가질 수 있는 최소와 최대의 튜플 개수

Q. R X S
> A. r x s 개 고정

Q. R X R
> A. r x r 개 고정

Q. πA, C (R X S)
> A. 최소 1, 최대 r x s

Q. πB (R) ∪ πB (S)
> A. 최소 1, 최대 r + s

Q. πB (R) - (πB (R) - πB (S))
> A. 최소 0, 최대 r == s

### 관계대수식 표현 1

학생(<u>학번</u>, 이름, 전공, 학년)  
수강(<u>과목코드</u>, <u>학번</u>, 수강학기, 성적)  
과목(<u>과목코드</u>, 과목이름, 강의실, 요일, 담당교수)

Q. 과목코드가 1234이고 성적이 A인 모든 학생의 학번
> A.
>
> ```sql
> π학번 (σ과목코드='1234' ∧ 성적='A' (수강))
> ```

Q. 과목코드가 1234인 과목을 등록한 학생의 이름과 전공
> A.
>
> ```sql
> π이름, 전공 (
>   학생 ⨝ 학생.학번 = 수강.학번 (
>     σ과목코드='1234' (수강)
>   )
> )
> ```


Q. 과목코드가 1234인 과목에 등록하지 않은 학생의 이름(단, 모든 학생이 수강신청에 참여했다고 가정)
> A.
>
> ```sql
> π이름 (학생)
> −
> π이름 (
>   학생 ⨝ 학생.학번 = 수강.학번 (
>     σ과목코드='1234' (수강)
>   )
> )
> ```

Q. 모든 과목에 등록한 학생의 이름
> A.
>
> ```sql
> π이름 (
>   학생 ⨝ 학생.학번 = 수강.학번 (
>     π학번 (
>       수강 ÷ π과목코드(과목)
>     )
>   )
> )
> ```

### 관계대수식 표현 2

극장(<u>극장번호</u>, 극장이름, 위치)  
상영장(<u>극장번호</u>, <u>상영관번호</u>, 영화제목, 가격, 좌석수)  
예약(<u>극장번호</u>, <u>상영관번호</u>, <u>고객번호</u>, 좌석번호, 날짜)  
고객(<u>고객번호</u>, 이름, 주소)

Q. 각 테이블에서 외래키

> A.
>
> | 테이블 |     외래키     |    참조 대상 테이블     |
> |:---:|:-----------:|:----------------:|
> | 상영관 |    극장번호     |     극장(극장번호)     |
> | 예약  | 극장번호, 상영관번호 | 상영관(극장번호, 상영관번호) |
> | 예약  |    고객번호     |     고객(고객번호)     |

Q. 관계대수식이 나타내는 릴레이션

1. π극장번호(σ가격 > 6000 (상영관))
> A. 가격이 6000원을 초과하는 영화를 상영하는 극장의 번호

2. σ극장.극장번호 = 상영관.극장번호 (극장 X 상영관)
> A. 극장과 상영관을 극장번호 기준으로 조인한 결과(자연조인과 동일한 효과)

3. π극장이름(극장 ⨝ 극장.극장번호 = 상영관.극장번호(σ가격 > 6000 (상영관)))
> A. 가격이 6000원 초과인 영화를 상영하는 극장의 이름

4. 고객 ⟕ (σ날짜 > '20240101' (예약))
> A. 2024년 1월 1일 이후 예약이 있는 고객은 예약 정보 포함, 없는 고객도 포함된 왼쪽 외부조인 결과

5. π고객이름.극장번호 (예약 ⨝ 예약.고객번호 = 고객.고객번호 고객) ÷ π극장번호 (σ위치 = '강남' (극장))
> 강남에 위치한 모든 극장에 예약한 고객의 이름과 극장번호(나눗셈 연산이므로 **모든 강남 극장을 예약한 고객**을 구함)

#### Q. 다음 물음에 대한 관계대수식

1. 모든 극장의 이름과 위치
> A.
>
> ```sql
> π극장이름, 위치 (극장)
> ```

2. 가격이 7000원 이하인 영화제목
> A.
>
> ```sql
> π영화제목 (σ가격 ≤ 7000 (상영관))
> ```

3. 모든 고객의 이름과 주소
> A.
>
> ```sql
> π이름, 주소 (고객)
> ```

4. '강남'에 위치한 극장에서 상영 중인 영화제목
> A.
>
> ```sql
> π영화제목 (
>   상영관 ⨝ 상영관.극장번호 = 극장.극장번호 (
>     σ위치 = '강남' (극장)
>   )
> )
> ```

5. '강남'에 위치한 극장에서 예약한 고객의 이름
> A.
>
> ```sql
> π이름 (
>   고객 ⨝ 고객.고객번호 = 예약.고객번호 (
>     예약 ⨝ 예약.극장번호 = 극장.극장번호 (
>       σ위치 = '강남' (극장)
>     )
>   )
> )
> ```

### 관계대수식 표현 3

Salesperson(<u>name</u>, age, salary)  
Order(<u>number</u>, custname, salesperson, amount)  
Customer(<u>name</u>, city, industrytype)

* custname과 salesperson은 각각 Customer.name과 Salesperson.name을 참조하는 외래키

Q. 다음 물음에 대한 관계대수식

1. 모든 판매원(Salesperson)의 이름
> A.
>
> ```sql
> πname(Salesperson)
> ```

2. 고객 '홍길동'의 주문을 수주한 판매원의 이름
> A.
>
> ```sql
> πsalesperson(σcustname = '홍길동'(Order))
> ```
>
> 또는 판매원 릴레이션에서 이름을 직접 가져오려면
>
> ```sql
> πname(Salesperson ⨝ Salesperson.name = Order.salesperson (σcustname = '홍길동'(Order)))
> ```

3. 주문이 있는 판매원의 이름
> A.
>
> ```sql
> πsalesperson(Order)
> ```
>
> 또는 확장형(판매원 릴레이션 기준)
>
> ```sql
> πname(Salesperson ⨝ Salesperson.name = Order.salesperson (Order))
> ```

4. 주문이 없는 판매원의 이름
> A.
>
> ```sql
> πname(Salesperson)
> −
> πsalesperson(Order)
> ```

5. 고객 '홍길동'의 주문을 수주한 판매원의 나이
> A.
>
> ```sql
> πage(Salesperson ⨝ Salesperson.name = Order.salesperson (σcustname = '홍길동'(Order)))
> ```

6. 나이가 25세인 판매원에게 주문한 고객의 city 값
> A.
>
> ```sql
> πcity(
>   Customer ⨝ Customer.name = Order.custname (
>     Order ⨝ Order.salesperson = Salesperson.name (
>       σage = 25(Salesperson)
>     )
>   )
> )
> ```

7. 판매원의 이름과 그 판매원에게 주문한 고객의 이름(단, 주문이 없는 판매원도 포함)
> A.
>
> 외부조인 사용 (왼쪽 외부조인)
>
> ```sql
> πSalesperson.name, Order.custname (
>   Salesperson ⟕ Salesperson.name = Order.salesperson (Order)
> )
> ```

### 관계대수식 표현 4

Employee(empno, name, phoneno, address, sex, position, deptno)  
Department(deptno, deptname, manager)  
Project(projno, projname, deptno)  
Works(empno, projno, hours-worked)

* 한 사원이 여러 프로젝트에서 일할 수 있고, 한 프로젝트에서 여러 사원이 일할 수 있다.
* hours-worked 속성은 각 사원이 각 프로젝트에서 일한 시간
* Department의 manager 속성에는 empno 값이 저장되어 있다고 가정

Q. 각 릴레이션에서 기본키

> A.
>
> |    릴레이션    |       기본키       |
> |:----------:|:---------------:|
> |  Employee  |      empno      |
> | Department |     deptno      |
> |  Project   |     projno      |
> |   Works    | (empno, projno) |


Q. 릴레이션 간의 관계를 살펴보고 외래키 찾기

> A.
>
> |    릴레이션    |   외래키   |     참조 대상 릴레이션     |
> |:----------:|:-------:|:------------------:|
> |  Employee  | deptno  | Department(deptno) |
> | Department | manager |  Employee(empno)   |
> |  Project   | deptno  | Department(deptno) |
> |   Works    |  empno  |  Employee(empno)   |
> |   Works    | projno  |  Project(projno)   |

Q. 다음 물음에 대한 관계대수식

1. 모든 직원의 이름
> A.
>
> ```sql
> πname(Employee)
> ```

2. 여자 직원의 이름
> A.
>
> ```sql
> πname(σsex = 'F'(Employee))
> ```

3. 팀장(manager)의 이름과 주소
> A.
>
> ```sql
> πname, address (
>   Employee ⨝ Employee.empno = Department.manager (Department)
> )
> ```

4. IT 부서(Department)에서 일하는 직원의 이름과 주소
> A.
>
> ```sql
> πname, address (
>   Employee ⨝ Employee.deptno = Department.deptno (
>     σdeptname = 'IT'(Department)
>   )
> )
> ```

5. '미래'프로젝트에서 일하는 직원의 이름
> A.
>
> ```sql
> πname (
>   Employee ⨝ Employee.empno = Works.empno (
>     Works ⨝ Works.projno = Project.projno (
>       σprojname = '미래'(Project)
>     )
>   )
> )
> ```

### 관계대수식 표현 5

Passenger(<u>pid</u>, pname, pgender, pcity)  
Agency(<u>aid</u>, aname, acity)  
Flight(<u>fid</u>, fdate, time, src, dest)  
Booking(<u>pid</u>, <u>aid</u>, <u>fid</u>, fdate)

Q. '제주'(dest)로 가는 항공편에 대한 정보

> A.
>
> ```sql
> σdest = '제주'(Flight)
> ```

Q. '김포'(src)에서 '제주'(dest)로 가는 항공편에 대한 정보

> A.
>
> ```sql
> σsrc = '김포' ∧ dest = '제주'(Flight)
> ```

Q. pid가 100번인 고객에 대하여 fdate가 01/01/2024 이후 탑승한 비행기 번호(fid)

> A.
>
> ```sql
> πfid(σpid = 100 ∧ fdate > '2024-01-01'(Booking))
> ```

Q. 예약을 한 적이 있는 고객의 이름(pname)

> A.
>
> ```sql
> πpname(Passenger ⨝ Passenger.pid = Booking.pid(Booking))
> ```

Q. 예약을 한 적이 없는 고객의 이름(pname)

> A.
>
> ```sql
> πpname(Passenger) − πpname(Passenger ⨝ Passenger.pid = Booking.pid(Booking))
> ```

Q. pid가 100번인 고객이 사는 도시(pcity)와 같은 도시(acity)에 있는 여행사 이름(aname)

> A.
>
> ```sql
> πaname(
>   Agency ⨝ acity = (
>     πpcity(σpid = 100(Passenger))
>   )
> )
> ```

Q. 01/01/2024 ~ 01/30/2024 기간에 16:00(time)이후 출발하는 비행기에 대한 정보

> A.
>
> ```sql
> σfdate ≥ '2024-01-01' ∧ fdate ≤ '2024-01-30' ∧ time > '16:00'(Flight)
> ```

Q. pid가 100번인 고객이 예약을 한 적이 없는 여행사 이름(aname)

> A.
>
> ```sql
> πaname(Agency) − πaname(
>   Agency ⨝ Agency.aid = Booking.aid(
>     σpid = 100(Booking)
>   )
> )
> ```

Q. '마당여행사'(aname)를 통하여 예약을 진행한 남자(pgender) 승객에 대한 정보

> A.
>
> ```sql
> Passenger ⨝ Passenger.pid = Booking.pid(
>   Booking ⨝ Booking.aid = Agency.aid(
>     σaname = '마당여행사'(Agency)
>   )
> ) ⨝ σpgender = 'M'(Passenger)
> ```
>
> 또는
>
> ```sql
> σpgender = 'M'(
> Passenger ⨝ Booking ⨝ Agency
>   where aname = '마당여행사'
> )
> ```
