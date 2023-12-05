// get todo
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import helper from "@/helper";

// get todo
const getTodo = async (calendarId, todoId) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + `/api/calendar/${calendarId}/${todoId}/todo`
  );

  return data;
};

const useGetTodo = (calendarId, todoId) => {
  return useQuery(["todo", calendarId, todoId], () =>
    getTodo(calendarId, todoId)
  );
};

// get todo detail
const getTodoDetail = async ({ calendarId, todoId }) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + `/api/calendar/${calendarId}/todo/${todoId}`
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
