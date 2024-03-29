// get todo
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import helper from "@/helper";
import API from "@/API";

// get todo
const getTodo = async (calendarId, userId, date) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + API.GET_TODO(calendarId, date, userId)
  );

  return data;
};

const useGetTodo = (calendarId, userId, date) => {
  return useQuery(["todo", calendarId, userId, date], () =>
    getTodo(calendarId, userId, date)
  );
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
