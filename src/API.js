// 킬린더 생성
const CREATE_CALENDAR = () => "/api/calendar";

// 메인화면 달력 리스트
const GET_CALENDAR_LIST = () => "/api/calendar";

// 캘린더 초대코드 생성
const CREATE_CALENDAR_INVITE = (calendarId) =>
  `/api/calendar/${calendarId}/invite`;

// 캘린더 초대코드 삭제
const DELETE_CALENDAR_INVITE = (calendarId) =>
  `/api/calendar/${calendarId}/invite/del`;

// 초대코드로 캘린더 참가하기
const GET_INVITED_CALENDAR = () => "/api/calendar/invite";

// 다이어리 편집 (안됨)
const PUT_DIARY = (calendarId, diaryId) =>
  `/api/calendar/${calendarId}/diary/${diaryId}`;

// 다이어리 삭제 (안됨)
const DELETE_DIARY = (calendarId, diaryId) =>
  `/api/calendar/${calendarId}/diary/${diaryId}/del`;

// 캘린더 유저 정보 수정
const EDIT_CALENDAR_USER_INFO = (calendarId) =>
  `/api/calendar/${calendarId}/user`;

// 캘린더 상세 정보
const GET_CALENDAR_DETAIL = (calendarId) => `/api/calendar/${calendarId}`;

// 캘린더 초대코드 가져오기
const GET_CALENDAR_INVITE_CODE = (calendarId) =>
  `/api/calendar/${calendarId}/invite`;

// 캘린더 유저 정보 가져오기
const GET_CALENDAR_USER_INFO = (calendarId, userId) =>
  `/api/calendar/${calendarId}/user?userId=${userId}`;

// 다이어리 작성
const POST_DIARY = (calendarId, date) =>
  `/api/calendar/${calendarId}/${date}/diary`;

// 다이어리 정보 가져오기 (안됨)
const GET_DIARY = (calendarId, date) =>
  `/api/calendar/${calendarId}/${date}/diary`;

// 다이어리 상세 정보 가져오기 (안됨)
const GET_DIARY_DETAIL = (calendarId, diaryId) =>
  `/api/calendar/${calendarId}/diary/${diaryId}`;

// 할일 작성
const POST_TODO = (calendarId, date) =>
  `/api/calendar/${calendarId}/${date}/todo`;

// 할일 수정 (안됨)
const PUT_TODO = (calendarId, todoId) =>
  `/api/calendar/${calendarId}/todo/${todoId}`;

// 할일 삭제 (안됨)
const DELETE_TODO = (calendarId, todoId) =>
  `/api/calendar/${calendarId}/todo/${todoId}/del`;

// 할일 정보 가져오기 (안됨)
const GET_TODO = (calendarId, date) =>
  `/api/calendar/${calendarId}/${date}/todo`;

// 할일 상세 정보 가져오기 (안됨)
const GET_TODO_DETAIL = (calendarId, todoId) =>
  `/api/calendar/${calendarId}/todo/${todoId}`;

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
