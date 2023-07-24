// post diary
import axios from "axios";

const postDiary = async ({ data, date }) =>
  await axios.post(`/api/calendar/diary?date=${date}`, data);

// put diary
const putDiary = async ({ data, id }) =>
  await axios.put(`/api/calendar/diary/${id}`, data);

export default {
  postDiary,
  putDiary,
};
