// post todo
import axios from "axios";
import API from "@/API";

const postTodo = async ({ data, date, calendarId }) =>
  await axios.post(API.POST_TODO(calendarId, date), data);

// put todo 수정 필요
const putTodo = async ({ data, id }) => await axios.put(API.PUT_TODO(id), data);

// delete todo
const deleteTodo = async ({ calendarId, todoId }) =>
  await axios.post(API.DELETE_TODO, { calendarId, todoId });

export default {
  postTodo,
  putTodo,
  deleteTodo,
};
