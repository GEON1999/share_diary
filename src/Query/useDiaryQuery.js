// get diary
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import helper from "@/helper";

const getDiary = async (date) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + `/api/calendar/diaries?date=${date}`
  );
  return data;
};

const useGetDiary = (date) => {
  return useQuery(["DIARY", date], () => getDiary(date));
};

// get diary detail
const getDiaryDetail = async (diaryId) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + `/api/calendar/diary/${diaryId}`
  );

  return data;
};

const useGetDiaryDetail = (diaryId) => {
  return useQuery(["DIARY_DETAIL", diaryId], () => getDiaryDetail(diaryId));
};

export default {
  getDiary,
  useGetDiary,
  getDiaryDetail,
  useGetDiaryDetail,
};
