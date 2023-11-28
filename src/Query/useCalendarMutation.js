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

export default {
  createCalendar,
  createCalendarInvite,
  deleteCalendarInvite,
  getInvtedCalendar,
};
