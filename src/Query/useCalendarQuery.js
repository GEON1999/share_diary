import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Get
const getCalender = async (date) => {
  return await axios.get(`/api/calendar?date=${date}`);
};

const useGetCalender = (date) => {
  return useQuery(["CALENDAR", date], () => getCalender(date));
};

// Post
const postCalender = async (data) => {
  console.log("postData", data);
  const { diary } = await axios.post("/api/calendar", data);
  if (diary) {
    return { diary };
  }
};

export default {
  useGetCalender,
  postCalender,
};
