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
const getDiaryDetail = async ({ calendarId, diaryId }) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + `/api/calendar/${calendarId}/diary/${diaryId}`
  );

  return data;
};

const useGetDiaryDetail = ({ calendarId, diaryId }) => {
  return useQuery(["DIARY_DETAIL", calendarId, diaryId], () =>
    getDiaryDetail({ calendarId, diaryId })
  );
};

export default {
  getDiary,
  useGetDiary,
  getDiaryDetail,
  useGetDiaryDetail,
};
