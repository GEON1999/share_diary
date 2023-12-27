<div align="center">
  <a href="https://share-diary-xi.vercel.app/login">
    <img height="120" src="https://dhgilmy0l2xzq.cloudfront.net/f57d11d6-22da-4322-8799-c82e718361a7-20231227143828.png" />
    <br /><br />
    <a display="block" href="https://share-diary-xi.vercel.app/login">공유형 달력으로 이동</a>
  </a>
</div>

## Index 🙇‍♂️
- ⭐ [Preview](#preview)
- 💥 [Feature](#feature)
- 💥 [Built with](#built-with)


## Preview 

<br />

 ### 1. 로그인 & 회원가입
- passport-local을 통해 로그인 정보를 session에 저장함
- 회원 가입 및 로그인 시 데이터는 planet scalde 의 User table 을 참고함



<hr />

 ### 2. 달력 생성 & 참가 & 삭제
- 달력 이름 입력을 통해 신규 달력 생성 가능
- 특정 달력의 초대코드를 통해 참가 할 경우, 해당 달력에 참가 가능
- 달력 내 권한이 owner인 경우, 해당 달력을 삭제 할 수 있으며, 이외의 권한을 가진 유저는 해당 달력에서 탈퇴할 수 있음


<hr />

 ### 3. 일정 및 기록 작성 & 편집 & 삭제
- 달력 내 특정 날짜를 선택 후, 해당 날짜에 일정 및 기록을 작성 가능함
- 이를 편집 및 삭제 할 수 있음



<hr />

 #### 4. 달력 관리
- 최초 달력 생성 및 참가 시, 회원가입 당시 입력한 이름을 기본 값으로 가지고 있으며, 달력 내 프로필에서 별도 이름 설정이 가능함
- owner의 권한을 가진 유저는 초대코드를 생성 및 제거할 수 있으며, 이를 타인에게 공유하여 참가하게 할 수 있음



<hr />

## Feature (endpoint)

### 0.1.0ver 
```
calednar // list & creat
	-- invite // 초대 코드를 통해 달력 참가 
	-- id
		-- [id] // 캘린더 내 todo 와 diary 들을 전부 불러옴 (ui상 달력 내 diary 혹은 to 가 있는 경우 색으로 표기 해줌)
			-- user // 캘린더 안에서의 프로필 정보를 가져오고, 수정함
			-- invite // 캘린더 내 초대코드를 조회하고, 생성함
				-- del // 캘린더 초대코드를 제거함
			-- date
				-- [date]
					-- diary 특정 날짜의 다이어리 리스트를 불러오고 특정 날짜에 다이어리를 생성함
					-- todo 특정 날짜의 일정 리스트를 불러오고 특정 날짜에 일정을 생성함
			-- diaryId
				-- [diaryId] // 다이어리의 상세 정보를 불러오고 수정함
					-- del // 다이어리를 제거함
			-- todoId
				-- [todoId] // 일정의 상세 정보를 불러오고 수정함
					-- del // 일정을 제거함

users
	-- enter // passport 로 로그인 (비밀 번호 hash 추가 필요)
	-- join // 회원 가입 (비밀 번호 hash 추가 필요)
	-- me // 로그인 된 유저 정보를 가져옴
```

<hr />

## Next update feature

### 0.2.0
- ssr 적용
- 권한 및 보안 관련 작업 일괄 적용
- 기록 작성 페이지 내 이미지 및 텍스트 에디터 추가
- 일정 및 기록 내 댓글 기능 추가
- UI 개선

## Built with

- <a href="./README/NextJs.md">`NextJS`</a>
- <a href="./README/Prisma & PlanetScale.md">`PlanetScale`</a>
- <a href="./README/Prisma & PlanetScale.md">`Prisma`</a>
- <a href="https://styled-components.com">`styled-components`</a>
- <a href="https://www.passportjs.org/">`passport.js`</a>
- <a href="https://www.npmjs.com/package/next-connect">`next-connect`</a>

<br />

> Deploy

- `Vercel`
   
