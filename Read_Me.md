## Read Me

### JIRA

- STORY: 사용자 입장에서 작성하는 거

  - 사용자가 서비스 사용 흐름을 STORY로 적어 놓고 TASK를 이에 묶어놓기

- TASK

  - 기능

  - 앞에 태그 붙이기

    `[태그]<space>제목`

    - [TEAM] : 팀 회의
    - [BE] : 백엔드
    - [FE] : 프론트엔드
    - [DOCS]: 문서 작성
    - [STUDY]: 개인 학습

### GIT

- 태그 종류
  - `FEAT` : 새로운 기능 추가
  - `FIX` : 버그 수정
  - `DOCS` : 문서 수정
  - `STYLE` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
  - `REFACTOR` : 코드 리펙토링
  - `TEST` : 테스트 코드, 리펙토링 테스트 코드 추가
  - `CHORE` : 빌드 업무 수정, 패키지 매니저 수정
- 형식

```java
[태그]<space>제목<space>(Jira Issue 번호)
ex) [FEAT] Add login (S07P21A705-21)
```

- [template.md](http://template.md/) (MR 날릴때)

```java
## ⛅️ 내용> 이 PR의 작업 요약 여기에 작성

## 🎸 특이사항> 리뷰시 참고할만한 내용, 주의깊게 봐줬으면 하는 내용 여기에 작성

## 🎸 테스트> 어떻게 테스트 할 수 있을까요? 여기에 작성
```

- Branch

```java
master
ㄴdev
		ㄴbackend
			ㄴbe_feat/login
		ㄴfrontend
			ㄴfe_feat/register
```

- fe_feature/login
- be_feature/

### **BE**

- 변수명 :

  camelCase

  - 카멜케이스

- 클래스명 :

  PascalCase

  - 카멜케이스 & 첫글자 대문자
  - DTO명
    - rest method 따라가기
    - 맨 마지막 url 따라가기
    - 겹치면 앞에 url까지 쓰기

### **FE**

- 파일명: 소문자

- CSS :

  kebab-case

  - 케밥케이스

### **DB**

- table: **snake_case**
- column
  - **snake_case:** 소문자&스네이크케이스
  - **primary key → id (Long, auto increment)**
  - full length → **column 명**