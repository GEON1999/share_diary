import axios from "axios";
import API from "@/API";

const createCalendar = async (name) =>
  await axios.post(API.CREATE_CALENDAR(), { name });

const createCalendarInvite = async ({ calendarId, userId }) =>
  await axios.post(API.CREATE_CALENDAR_INVITE(calendarId), { userId: userId });

const deleteCalendarInvite = async ({ calendarId, userId }) =>
  await axios.post(API.DELETE_CALENDAR_INVITE(calendarId), {
    userId: userId,
  });

const getInvtedCalendar = async ({ code, userId }) =>
  await axios.post(API.GET_INVITED_CALENDAR(), { code: code, userId: userId });

const deleteDiary = async ({ calendarId, diaryId }) =>
  await axios.post(API.DELETE_DIARY(calendarId, diaryId));

const editCalendarUserInfo = async ({ calendarId, formData }) =>
  await axios.post(API.EDIT_CALENDAR_USER_INFO(calendarIdz), formData);

export default {
  createCalendar,
  createCalendarInvite,
  deleteCalendarInvite,
  getInvtedCalendar,
  deleteDiary,
  editCalendarUserInfo,
};