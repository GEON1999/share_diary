// get diary
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import helper from "@/helper";
import API from "@/API";

// get diary
const getDiary = async (calendarId, date) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + API.GET_DIARY(calendarId, date)
  );

  return data;
};

const useGetDiary = (calendarId, date) => {
  return useQuery(["DIARY", calendarId, date], () =>
    getDiary(calendarId, date)
  );
};

// get diary detail
const getDiaryDetail = async ({ calendarId, diaryId }) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + API.GET_DIARY_DETAIL(calendarId, diaryId)
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
