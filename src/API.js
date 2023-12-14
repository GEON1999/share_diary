// 킬린더 생성
const CREATE_CALENDAR = () => "/api/calendar";

// 메인화면 달력 리스트
const GET_CALENDAR_LIST = () => "/api/calendar";

// 캘린더 초대코드 생성
const CREATE_CALENDAR_INVITE = (calendarId) =>
  `/api/calendar/id/${calendarId}/invite`;

// 캘린더 초대코드 삭제
const DELETE_CALENDAR_INVITE = (calendarId) =>
  `/api/calendar/id/${calendarId}/invite/del`;

// 초대코드로 캘린더 참가하기
const GET_INVITED_CALENDAR = () => "/api/calendar/invite";

// 다이어리 편집
const PUT_DIARY = (calendarId, diaryId) =>
  `/api/calendar/id/${calendarId}/diaryId/${diaryId}`;

// 다이어리 삭제
const DELETE_DIARY = (calendarId, diaryId) =>
  `/api/calendar/id/${calendarId}/diaryId/${diaryId}/del`;

// 캘린더 유저 정보 수정
const EDIT_CALENDAR_USER_INFO = (calendarId) =>
  `/api/calendar/id/${calendarId}/user`;

// 캘린더 상세 정보
const GET_CALENDAR_DETAIL = (calendarId) => `/api/calendar/id/${calendarId}`;

// 캘린더 초대코드 가져오기
const GET_CALENDAR_INVITE_CODE = (calendarId, userId) =>
  `/api/calendar/id/${calendarId}/invite${userId ? `?userId=${userId}` : ""}`;

// 캘린더 유저 정보 가져오기
const GET_CALENDAR_USER_INFO = (calendarId, userId) =>
  `/api/calendar/id/${calendarId}/user${userId ? `?userId=${userId}` : ""}`;

// 다이어리 작성
const POST_DIARY = (calendarId, date) =>
  `/api/calendar/id/${calendarId}/date/${date}/diary`;

// 다이어리 정보 가져오기
const GET_DIARY = (calendarId, date) =>
  `/api/calendar/id/${calendarId}/date/${date}/diary`;

// 다이어리 상세 정보 가져오기
const GET_DIARY_DETAIL = (calendarId, diaryId) =>
  `/api/calendar/id/${calendarId}/diaryId/${diaryId}`;

// 할일 작성
const POST_TODO = (calendarId, date) =>
  `/api/calendar/id/${calendarId}/date/${date}/todo`;

// 할일 수정
const PUT_TODO = (calendarId, todoId) =>
  `/api/calendar/id/${calendarId}/todoId/${todoId}`;

// 할일 삭제
const DELETE_TODO = (calendarId, todoId) =>
  `/api/calendar/id/${calendarId}/todoId/${todoId}/del`;

// 할일 정보 가져오기
const GET_TODO = (calendarId, date) =>
  `/api/calendar/id/${calendarId}/date/${date}/todo`;

// 할일 상세 정보 가져오기
const GET_TODO_DETAIL = (calendarId, todoId) =>
  `/api/calendar/id/${calendarId}/todoId/${todoId}`;

export default {
  CREATE_CALENDAR,
  CREATE_CALENDAR_INVITE,
  DELETE_CALENDAR_INVITE,
  GET_INVITED_CALENDAR,
  PUT_DIARY,
  DELETE_DIARY,
  EDIT_CALENDAR_USER_INFO,
  GET_CALENDAR_LIST,
  GET_CALENDAR_DETAIL,
  GET_CALENDAR_INVITE_CODE,
  GET_CALENDAR_USER_INFO,
  POST_DIARY,
  GET_DIARY,
  GET_DIARY_DETAIL,
  POST_TODO,
  PUT_TODO,
  DELETE_TODO,
  GET_TODO,
  GET_TODO_DETAIL,
};
