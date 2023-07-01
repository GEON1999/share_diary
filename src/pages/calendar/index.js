import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import axios from "axios";
import calendar from "@/pages/api/calendar";
import useCalendarQuery from "@/Query/useCalendarQuery";
import useUserQuery from "@/Query/useUserQuery";
import Calendar from "@/components/Calendar";

const inter = Inter({ subsets: ["latin"] });

// 달력 만들기
const Home = () => {
  /*  // 달력 상세페이지 상태
    const [detail, setDetail] = useState(false);
  const {data, isLoaidng} = useUserQuery.useGetUser('phgst@naver.com')
    console.log('data',data)
  /!*  const { data, isLoading } = useCalendarQuery.useGetCalender();
    console.log(data);*!/

    // 달력 상세페이지 핸들러
    const handleDetail = () => {
      setDetail(true);
    };*/

  return (
      <Calendar/>
  )
}

  export default Home
