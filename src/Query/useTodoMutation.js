// post todo
import axios from "axios";

const postTodo = async ({ data, date, calendarId }) => {
  console.log(`/api/calendar/${date}/todo`, data);
  await axios.post(`/api/calendar/${calendarId}/${date}/todo`, data);
};

// put todo
const putTodo = async ({ data, id }) =>
  await axios.put(`/api/calendar/todo/${id}`, data);

// delete todo
const deleteTodo = async ({ calendarId, todoId }) =>
  await axios.post(`/api/calendar/${calendarId}/todo/${todoId}/del`);

export default {
  postTodo,
  putTodo,
  deleteTodo,
};
