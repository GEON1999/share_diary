// get diary
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import helper from "@/helper";
import API from "@/API";

// get diary
const getDiary = async (calendarId, userId, date) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + API.GET_DIARY(calendarId, date, userId)
  );

  return data;
};

const useGetDiary = (calendarId, userId, date) => {
  return useQuery(["DIARY", calendarId, userId, date], () =>
    getDiary(calendarId, userId, date)
  );
};

// get diary detail
const getDiaryDetail = async (calendarId, diaryId, ssrRequestKey = null) => {
  const opt = { headers: { Auth: ssrRequestKey } };
  const { data } = await axios.get(
    helper.CURRENT_URL() + API.GET_DIARY_DETAIL(calendarId, diaryId),
    opt
  );

  return data;
};

const useGetDiaryDetail = ({ calendarId, diaryId }) => {
  return useQuery(["DIARY_DETAIL", calendarId, diaryId], () =>
    getDiaryDetail(calendarId, diaryId)
  );
};

export default {
  getDiary,
  useGetDiary,
  getDiaryDetail,
  useGetDiaryDetail,
};
