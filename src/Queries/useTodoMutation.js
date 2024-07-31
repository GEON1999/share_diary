// post todo
import axios from "axios";
import API from "@/API";

const postTodo = async ({ data, date, calendarId }) =>
  await axios.post(API.POST_TODO(calendarId, date), data);

// put todo 수정 필요
const putTodo = async ({ data, calendarId, todoId }) =>
  await axios.post(API.PUT_TODO(calendarId, todoId), data);

// delete todo
const deleteTodo = async ({ calendarId, todoId }) =>
  await axios.post(API.DELETE_TODO(calendarId, todoId));

export default {
  postTodo,
  putTodo,
  deleteTodo,
};
