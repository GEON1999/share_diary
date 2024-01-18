import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import helper from "@/helper";
import API from "@/API";

// get calendar list
const getCalendarList = async (userId, ssrRequestKey = null) => {
  const opt = { headers: { Auth: ssrRequestKey } };
  console.log("url:", helper.CURRENT_URL() + API.GET_CALENDAR_LIST(userId));
  const { data } = await axios.get(
    helper.CURRENT_URL() + API.GET_CALENDAR_LIST(userId),
    opt
  );

  return data;
};

const useGetCalendarList = (userId) => {
  return useQuery(["CALENDAR_LIST", userId], () => getCalendarList(userId));
};

// get calendar detail
const getCalendarDetail = async (calendarId, query, ssrRequestKey = null) => {
  const opt = { headers: { Auth: ssrRequestKey } };
  const { data } = await axios.get(
    helper.CURRENT_URL() + API.GET_CALENDAR_DETAIL(calendarId, query),
    opt
  );

  return data;
};

const useGetCalendarDetail = (calendarId, query) => {
  console.log("calendarId :", calendarId, query);
  return useQuery(["CALENDAR_DETAIL", calendarId ?? null, query], () =>
    getCalendarDetail(calendarId ?? null, query)
  );
};

const getCalendarInviteCode = async (calendarId, userId) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + API.GET_CALENDAR_INVITE_CODE(calendarId, userId)
  );

  return data;
};

const useGetCalendarInviteCode = (calendarId, userId) => {
  return useQuery(["CALENDAR_INVITE_CODE", calendarId, userId], () =>
    getCalendarInviteCode(calendarId, userId)
  );
};

const getCalendarUserInfo = async (calendarId, userId) => {
  const { data } = await axios.get(
    helper.CURRENT_URL() + API.GET_CALENDAR_USER_INFO(calendarId, userId)
  );

  return data;
};

const useGetCalendarUserInfo = (calendarId, userId) => {
  return useQuery(["CALENDAR_USER_INFO", calendarId, userId], () =>
    getCalendarUserInfo(calendarId, userId)
  );
};

export default {
  getCalendarList,
  useGetCalendarList,
  getCalendarDetail,
  useGetCalendarDetail,
  getCalendarInviteCode,
  useGetCalendarInviteCode,
  getCalendarUserInfo,
  useGetCalendarUserInfo,
};
