import axios from "axios";

const createCalendar = async (name) =>
  await axios.post(`/api/calendar`, { name });

const createCalendarInvite = async ({ calendarId, userId }) =>
  await axios.post(`/api/calendar/${calendarId}/invite`, { userId: userId });

const deleteCalendarInvite = async ({ calendarId, userId }) =>
  await axios.post(`/api/calendar/${calendarId}/invite/del`, {
    userId: userId,
  });

const getInvtedCalendar = async ({ code, userId }) =>
  await axios.post(`/api/calendar/invite`, { code: code, userId: userId });

const putDiary = async ({ calendarId, diaryId, data }) =>
  await axios.post(`/api/calendar/${calendarId}/diary/${diaryId}`, data);

const deleteDiary = async ({ calendarId, diaryId }) =>
  await axios.post(`/api/calendar/${calendarId}/diary/${diaryId}/del`);

export default {
  createCalendar,
  createCalendarInvite,
  deleteCalendarInvite,
  getInvtedCalendar,
  putDiary,
  deleteDiary,
};
