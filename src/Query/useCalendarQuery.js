import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import helper from "@/helper";

// Diary Query

/*// get diary
const getDiary = async (date) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + `/api/calendar/diaries?date=${date}`
  );
  return data;
};

const useGetDiary = (date) => {
  return useQuery(["DIARY", date], () => getDiary(date));
};

// get diary detail
const getDiaryDetail = async (diaryId) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + `/api/calendar/diary/${diaryId}`
  );

  return data;
};

const useGetDiaryDetail = (diaryId) => {
  return useQuery(["DIARY", diaryId], () => getDiaryDetail(diaryId));
};*/

// Post Diary

/*// post diary
const postDiary = async ({ data, date }) =>
  await axios.post(`/api/calendar/diary?date=${date}`, data);

// put diary
const putDiary = async ({ data, id }) =>
  await axios.put(`/api/calendar/diary/${id}`, data);*/

// Todo Query
// get todo
const getTodo = async (date) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + `/api/calendar/todo?date=${date}`
  );

  return data;
};

const useGetTodo = (date) => {
  return useQuery(["TODO", date], () => getTodo(date));
};

// post todo
const postTodo = async ({ data, date }) =>
  await axios.post(`/api/calendar/${date}/todo`, data);

// get calendar list
const getCalendarList = async () => {
  const { data } = await axios.get(helper.CURRENT_URL() + `/api/calendar`);

  return data;
};

const useGetCalendarList = () => {
  return useQuery(["CALENDAR_LIST"], () => getCalendarList());
};

// get calendar detail
const getCalendarDetail = async (calendarId, query) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + `/api/calendar/${calendarId}?${query}`
  );

  return data;
};

const useGetCalendarDetail = (calendarId, query) => {
  return useQuery(["CALENDAR_DETAIL", query], () =>
    getCalendarDetail(calendarId, query)
  );
};

export default {
  postTodo,
  getTodo,
  useGetTodo,
  getCalendarList,
  useGetCalendarList,
  getCalendarDetail,
  useGetCalendarDetail,
};
