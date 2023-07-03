import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import helper from "@/helper";

// Get

// get calendar
const getDiary = async (date) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + `/api/calendar/diary?date=${date}`
  );
  return data;
};

const useGetDiary = (date) => {
  return useQuery(["DIARY", date], () => getDiary(date));
};

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

// get diary detail
const getDiaryDetail = async (date, diaryId) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + `/api/calendar/${date}/diary/${diaryId}`
  );

  return data;
};

const useGetDiaryDetail = (date, diaryId) => {
  return useQuery(["DIARY_DETAIL", date, diaryId], () =>
    getDiaryDetail(date, diaryId)
  );
};

// Post
const postDiary = async ({ data, date }) => {
  await axios.post(`/api/calendar/${date}/diary`, data);
};

const postTodo = async ({ data, date }) =>
  await axios.post(`/api/calendar/${date}/todo`, data);

export default {
  getDiary,
  useGetDiary,
  postDiary,
  postTodo,
  getTodo,
  useGetTodo,
  getDiaryDetail,
  useGetDiaryDetail,
};
