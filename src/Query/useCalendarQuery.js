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

// Post
const postCalender = async ({ data, date }) => {
  await axios.post(`/api/calendar/${date}/diary`, data);
};

const postTodo = async ({ data, date }) =>
  await axios.post(`/api/calendar/${date}/todo`, data);

export default {
  getDiary,
  useGetDiary,
  postCalender,
  postTodo,
  getTodo,
  useGetTodo,
};
