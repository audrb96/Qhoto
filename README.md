# 📷 qhoto

![qhoto-logo](/uploads/a7e4d7a0f9e4f7ab200f83224ef65b30/qhoto-logo.png)

## 💝 Quest, Photo, Daily 💝 <br>

### 매일 똑같은 하루를 보내는 당신!

### 매일 다른 종류의 퀘스트로 본인의 일상을 공유하세요!

### 이제 똑같은 하루는 그만멈추고 재미와 함께 갓생을 살아보세요. 🤩

> **저희 앱 Qhoto에서는 매일, 매주, 매달**<br>
> **건강, 환경, 이색등 다양한 테마의 퀘스트를 제공하여 매일 똑같은 하루가 아닌 즐거운 추억을 제공해줍니다.**<br>**본인의 퀘스트 클리어 사진과 영상을 다른 사람과 공유해보세요!** <br>**서로 공유하다보면 당신의 인생은 ✨갓생✨ 이 되어있을겁니다.**

🙋‍♂️팀장 박명규

👨‍👩‍👦‍👦팀원 김상현, 김정아, 박영준, 유경훈, 정형진

## 📱 Wireframe

[Figma](https://www.figma.com/file/aFFFni2Q5Q9Myu0sxVAQme/qhoto?node-id=0%3A1&t=Am2MciN9gJYOk3wV-1)<br>
![figma](/uploads/bd718c2fcf2f641c14cd5ec059fcaa64/image.png)

## 📏 ERD

![image](/uploads/16fa73c35c48fee6576f0eb6c3ab973f/image.png)

## Software Architecture

![아키텍쳐](/uploads/2b2c320cbe213066acdd5231b96d15b3/아키텍쳐.jpg)

## Convention

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
[태그]<space>제목<space>(Jira Issue 링크)
ex) [FEAT] Add login (https://ssafy.atlassian.net/browse/S07P31A707-9)
```

- [template.md](http://template.md/) (MR 날릴때)

```java
## ⛅️ 내용

> 이 PR의 작업 요약 여기에 작성

## 🎸 특이사항

> 리뷰시 참고할만한 내용, 주의깊게 봐줬으면 하는 내용 여기에 작성

## 🎸 테스트

> 어떻게 테스트 할 수 있을까요? 여기에 작성
```

- Branch

```java
master
ㄴdevelop
		ㄴbackend_dev
			ㄴfeature/api/login
		ㄴfrontend_dev
			ㄴfeature/fe/register
```

- feature/api/login
- feature/fe/register

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
