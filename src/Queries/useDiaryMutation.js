// post diary
import axios from "axios";
import API from "@/API";

const postDiary = async ({ data, date, calendarId }) => {
  await axios.post(API.POST_DIARY(calendarId, date), data);
};

// put diary 수정 필요
const putDiary = async ({ calendarId, diaryId, data }) =>
  await axios.post(API.PUT_DIARY(calendarId, diaryId), data);

export default {
  postDiary,
  putDiary,
};
