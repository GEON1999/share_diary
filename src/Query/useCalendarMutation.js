import axios from "axios";

const createCalendar = async (name) =>
  await axios.post(`/api/calendar`, { name });

export default {
  createCalendar,
};
