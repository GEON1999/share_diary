// post diary
import axios from "axios";

const postDiary = async ({ data, date }) => {
  console.log(`/api/calendar/${date}/diary`, data);
  await axios.post(`/api/calendar/${date}/diary`, data);
};

// put diary
const putDiary = async ({ data, id }) =>
  await axios.put(`/api/calendar/diary/${id}`, data);

export default {
  postDiary,
  putDiary,
};
