// get todo
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import helper from "@/helper";
import API from "@/API";

// get todo
const getTodo = async (calendarId, date) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + API.GET_TODO(calendarId, date)
  );

  return data;
};

const useGetTodo = (calendarId, date) => {
  return useQuery(["todo", calendarId, date], () => getTodo(calendarId, date));
};

// get todo detail
const getTodoDetail = async ({ calendarId, todoId }) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + API.GET_TODO_DETAIL(calendarId, todoId)
  );

  return data;
};

const useGetTodoDetail = ({ calendarId, todoId }) => {
  return useQuery(["DIARY_DETAIL", calendarId, todoId], () =>
    getTodoDetail({ calendarId, todoId })
  );
};

export default {
  getTodo,
  useGetTodo,
  getTodoDetail,
  useGetTodoDetail,
};
