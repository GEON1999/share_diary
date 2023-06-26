import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getCalender = async () => {
  return await axios.get(
    "https://calendarific.com/api/v2/countries?api_key=1bc38079b033b1795c171707d12f2adb2d465551"
  );
};

const useGetCalender = () => {
  return useQuery(["CALENDAR"], getCalender);
};

export default {
  useGetCalender,
};
