import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import helper from "@/helper";

// Get

// get calendar
const getCalender = async (date) => {
  return await axios.get(
    helper.CURRENT_URL() + `/api/calendar/diary?date=${date}`
  );
};

const useGetCalender = (date) => {
  return useQuery(["CALENDAR", date], () => getCalender(date));
};

// get todo
const getTodo = async (date) => {
  return await axios.get(
    helper.CURRENT_URL() + `/api/calendar/todo?date=${date}`
  );
};

const useGetTodo = (date) => {
  return useQuery(["TODO", date], () => getTodo(date));
};

// Post
const postCalender = async ({ data, date }) => {
  console.log(data, date);
  await axios.post(`/api/calendar/${date}/diary`, data);
};

const postTodo = async ({ data, date }) =>
  await axios.post(`/api/calendar/${date}/todo`, data);

export default {
  getCalender,
  useGetCalender,
  postCalender,
  postTodo,
  getTodo,
  useGetTodo,
};
