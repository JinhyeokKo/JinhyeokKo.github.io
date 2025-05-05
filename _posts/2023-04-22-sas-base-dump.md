---
title: SAS BASE DUMP
date: 2023-04-22
categories: [통계]
tags: [SAS]
layout: post
---

Q1. this question will use data set sashelp.shoes.

Write a SAS program that will:
1. Read sashelp.shoes as input.
2. Create the SAS data Set work.sortedshoes.
3. Sort the sashelp.shoes data set:
      First by variable product in descending order.
      Second by variable sales in ascending order.
      Run the program and answer the following questions:

A1.

```null
Data work.sortedshoes;
set sashelp.shoes;
run;

proc sort data=sashelp.shoes out=work.sortedshoes;
by descending product sales;
run;

proc print data =work.sortedshoes;
run;
```

Q4. The following SAS program is submitted:

```null
data WORK.TEMP;
Char1='0123456789';
Char2=substr(Char1,3,4);
run;
```

What is the Value of Char2?

A4. 2345

```null
data WORK.TEMP;
Char1='0123456789';
Char2=substr(Char1,3,4);
run;

proc print data=WORK.TEMP;
run;
```

Q6. The following SAS program is subnitted:

```null
data work.test;
revenue2010=4.5;
revenue2011=1.5;
revenue2012=3.5;
run;

data work.test1;
set Work.test;
total=sum(of Reve:);
run;
```

What value will SAS assign to Total?

A6. 9.5

```null
data work.test;
revenue2010=4.5;
revenue2011=1.5;
revenue2012=3.5;
run;

data work.test1;
set Work.test;
total=sum(of Reve:);
run;

proc print data=work.test1;
run;
```

Q8. In this try create new dataset as Test from SAShelp.class.
      Sort the data based on sex.
      Keep the observations only age 14 above.
      Rename the variable in test age as test_age.

A8.

```null
Data work.Test;
Set sashelp.class;
run;

proc sort data=sashelp.class out=Test;
by sex;
where age>14;
run;

proc print data=Test (rename=(age=Test_age));
run;
```

Q9. In the given Program:

```null
Proc contents data=sashelp.clas varnum;
Run;
```

Which The following statement is true for the varnum statment:
A. Varnum is used for keep the variable.
B. Varnum used to display the Variable in Creation order of dataset.
C. There is no use of Varnum in the program.
D. Varnum used to sort the character Variable.

A9. B

Q10. This question will use input data set sashelp.class.

Write a SAS program that will:
create data set work.Test
In this program, complete the following tasks, in the following order:
      1. Create 2 new variables weight as V1 and Height as V2 once done drop height and weight from work.Test
      2. Make the V1 and V2 to the integer values.
      3. Divide V1 by V2 and assign the new Value to V3 as integer value.

       Q1. How many variables in the work.Test dataset?
      Q2. What is the value for observation 12 for the V3 Variable?
      Q3. What will be the total of v3 variable when sex is female with age above 12?

A10.       Q1. 6       Q2. 1       Q3. 6

```null
Data work.Test;
set sashelp.class;
	V1=weight;
	V2=height;
	V1=floor(V1);
	V2=floor(V2);
	V3=floor(V1/V2);
	drop height weight;
run;

proc print data=work.Test;
run;
```

Q11. Which program diplays a listing of all data sets in the sashelp library?
A. proc contents lib = sashelp.all; run;
B. proc contents data = sashelp.all; run;
C. proc contents lib = sashelp._all_; run;
D. proc contents data = sashelp._all_; run;

A11. D

Q12. Try run below datasets and answer the following:

       Q1. How many observations (row) are in Final dataset?
      Q1. How many observations (row) are in Final dataset when"If a;"?
      Q1. How many observations (row) are in Final dataset when"If b;"?
      Q1. How many observations (row) are in Final dataset when"If a and b;"?
      Q1. How many observations (row) are in Final dataset when"If a=b;"?
      Q1. How many observations (row) are in Final dataset when"If a and not b;"?
      Q1. How many observations (row) are in Final dataset when"If not a;"?

```null
DATA dads;
INPUT famid name $ inc;
CARDS;
2 Art 22000
1 Bill 30000
3 Paul 25000
5 Paul 25000
6 Jhon 40000
;
RUN;

DATA faminc;
INPUT famid faminc96 faminc97 faminc98;
CARDS;
3 75000 76000 77000
1 40000 40500 41000
2 45000 45400 45800
4 45000 45400 45800
;
run;

proc sort data=dads out=dad;
by famid;
run;

proc sort data=faminc out=fam;
by famid;
run;

DATA final;
	merge dad (in=a) fam(in=b);
	BY famid;
Run;
PROC PRINT DATA=Final;
RUN;
```

A12.

```null
DATA final;
	merge dad (in=a) fam(in=b);
	BY famid;
IF " ";
Run;
PROC PRINT DATA=Final;
RUN;
```

A1. 6
A2. 5 `if a;`
A3. 4 `if b;`
A4. 3 `if a and b;`
A5. 3 `if a = b;`
A6. 2 `if a and not b;`
A7. 1 `if b and not a;`