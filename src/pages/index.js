import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import axios from "axios";
import calendar from "@/pages/api/calendar";
import useCalendarQuery from "@/Query/useCalendarQuery";
import useUserQuery from "@/Query/useUserQuery";

const inter = Inter({ subsets: ["latin"] });

// 달력 만들기
const Home = () => {
  // 달력 상세페이지 상태
  const [detail, setDetail] = useState(false);
const {data, isLoaidng} = useUserQuery.useGetUser('phgst@naver.com')
  console.log('data',data)
/*  const { data, isLoading } = useCalendarQuery.useGetCalender();
  console.log(data);*/

  // 달력 상세페이지 핸들러
  const handleDetail = () => {
    setDetail(true);
  };

  return (
    // 달력 컨테이너 박스
    <div className="flex items-center justify-center space-x-5">
      {/*달력 컨테이너*/}
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {/*달력 헤더*/}
        <div className="flex items-center justify-between mb-4 space-x-3">
          <div className="flex items-center">
            <button className="p-1 mr-2 rounded-full hover:bg-gray-100">
              <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                ></path>
              </svg>
            </button>
            <div className="text-lg font-bold text-gray-400">
              <span>2023년 6월</span>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-1 rounded-full hover:bg-gray-100">
              <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L12.17 12z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {/*달력 바디*/}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="grid grid-cols-7 gap-2 border-b-2 border-b-neutral-500">
            <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-gray-500 rounded-full cursor-pointer hover:bg-gray-100">
              <span>일</span>
            </div>
            <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-gray-500 rounded-full cursor-pointer hover:bg-gray-100">
              <span>월</span>
            </div>
            <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-gray-500 rounded-full cursor-pointer hover:bg-gray-100">
              <span>화</span>
            </div>
            <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-gray-500 rounded-full cursor-pointer hover:bg-gray-100">
              <span>수</span>
            </div>
            <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-gray-500 rounded-full cursor-pointer hover:bg-gray-100">
              <span>목</span>
            </div>
            <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-gray-500 rounded-full cursor-pointer hover:bg-gray-100">
              <span>금</span>
            </div>
            <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-gray-500 rounded-full cursor-pointer hover:bg-gray-100">
              <span>토</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 mt-2">
            {[
              28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
              16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1,
              2, 3, 4, 5, 6, 7,
            ].map((day, index) => (
              <div
                onClick={handleDetail}
                key={index}
                className="flex items-center justify-center w-8 h-8 text-xs font-medium text-gray-500 rounded-full cursor-pointer hover:bg-gray-100"
              >
                <span>{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*달력 상세 페이지*/}
      {/*화면에 표시되는 달력의 날짜를 클릭하면 상세 페이지가 나타납니다.*/}
      {detail && (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-5">
          <div>
            <h3 className="text-gray-300">Today was the Best day ever!!!</h3>
          </div>
          <Image src="/smile.png" alt="emoji" width={50} height={50} />
          <div className="felx flex-col w-80">
            <div className="flex flex-col items-start space-y-2">
              <div className="flex text-sm space-x-2 items-center">
                <p className="rounded-2xl bg-gray-600 px-2 py-1 w-20 text-center">
                  Title
                </p>
                <p>1st anniversary</p>
              </div>
              <div className="flex text-sm space-x-2 items-center ">
                <p className="rounded-2xl bg-gray-600 px-2 py-1 w-24 text-center">
                  Content
                </p>
                <p>Just awesome day! Me and Biju went to Jeju</p>
              </div>
            </div>
          </div>
          {/*달력 상세 페이지 종료 버튼*/}
          <button
            onClick={() => setDetail(false)}
            className="px-2 py-1 rounded-full bg-gray-800 text-gray-100 hover:bg-gray-700 mt-5"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
