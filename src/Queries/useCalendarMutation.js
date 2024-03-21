import axios from "axios";
import API from "@/API";
import helper from "@/helper";

const createCalendar = async (data) =>
  await axios.post(API.CREATE_CALENDAR(), data);

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
  await axios.post(API.EDIT_CALENDAR_USER_INFO(calendarId), formData);

const deleteCalendar = async ({ calendarId, userId }) =>
  await axios.post(API.DELETE_CALENDAR(calendarId, userId));

// 이미지 업로드
const useUploadImage = async (file) => {
  const formData = new FormData();
  await formData.append("file", file);
  const { data } = await axios.post(
    helper.CURRENT_URL() + API.POST_IMAGE(),
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
};

// 캘린더 디테일 수정
const editCalendarDetail = async ({ calendarId, formData }) =>
  await axios.post(API.EDIT_CALENDAR_DETAIL(calendarId), formData);

export default {
  createCalendar,
  createCalendarInvite,
  deleteCalendarInvite,
  getInvtedCalendar,
  deleteDiary,
  editCalendarUserInfo,
  deleteCalendar,
  useUploadImage,
  editCalendarDetail,
};
