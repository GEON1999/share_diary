// get diary
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import helper from "@/helper";

// get diary
const getDiary = async (calendarId, diaryId) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + `/api/calendar/${calendarId}/${diaryId}/diary`
  );

  return data;
};

const useGetDiary = (calendarId, diaryId) => {
  return useQuery(["DIARY", calendarId, diaryId], () =>
    getDiary(calendarId, diaryId)
  );
};

// get diary detail
const getDiaryDetail = async ({ calendarId, date, diaryId }) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() +
      `/api/calendar/${calendarId}/${date}/diary/${diaryId}`
  );

  console.log("data :", data);
  return data;
};

const useGetDiaryDetail = ({ calendarId, date, diaryId }) => {
  return useQuery(["DIARY_DETAIL", date], () =>
    getDiaryDetail({ calendarId, date, diaryId })
  );
};

export default {
  getDiary,
  useGetDiary,
  getDiaryDetail,
  useGetDiaryDetail,
};
