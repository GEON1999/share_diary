import { useState } from "react";
import { useForm } from "react-hook-form";
import useCalendarQuery from "@/Query/useCalendarQuery";
import { dehydrate, QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import DiaryTable from "@/components/table/DiaryTable";
import TodoTable from "@/components/table/TodoTable";

const Calendar = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const { date } = router.query;

  // get diary
  const { data, isLoading } = useCalendarQuery.useGetDiary(date);
  // get todo
  const { data: todoData, isLoading: isTodoLoading } =
    useCalendarQuery.useGetTodo(date);

  console.log(todoData, isTodoLoading, data, isLoading);

  const { mutate } = useMutation(useCalendarQuery.postCalender);

  const handleModalOpen = async (date) => {
    setModal(true);
    const dateObj = new Date(date);
    const msDate = dateObj.getTime();
    router.push(`/calendar?date=${msDate}`);
  };

  const handleDiaryOpen = () => router.push(`/calendar/${date}/newDiary`);
  const handletoDoOpen = () => router.push(`/calendar/${date}/newTodo`);

  // 현재 날짜 가져오기
  const currentDate = new Date();

  // 월별 날짜 배열 생성 함수
  const getMonthDates = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const dates = [];

    for (let date = 1; date <= lastDay.getDate(); date++) {
      dates.push(new Date(year, month, date));
    }

    // 첫 번째 날짜가 일요일이 아닌 경우, 이전 달의 일자 표시
    if (firstDay.getDay() !== 0) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const lastDayPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

      for (let date = firstDay.getDay() - 1; date >= 0; date--) {
        dates.unshift(new Date(prevYear, prevMonth, lastDayPrevMonth - date));
      }
    }

    // 마지막 날짜가 토요일이 아닌 경우, 다음 달의 일자 표시
    if (lastDay.getDay() !== 6) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;

      for (let date = 1; date <= 6 - lastDay.getDay(); date++) {
        dates.push(new Date(nextYear, nextMonth, date));
      }
    }

    return dates;
  };

  // 달력 날짜 배열 생성
  const calendarDates = getMonthDates(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {calendarDates.map((date, index) => (
            <tr key={index}>
              <td
                onClick={() => handleModalOpen(date)}
                className={" p-4 hover:bg-white"}
              >
                {date.getDate()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <modal open={modal ? true : undefined} close={modal ? true : undefined}>
        <div
          className={
            "space-y-5 items-center flex flex-col absolute top-[50%] bottom-[50%] left-[30%] right-[50%] w-[500px] h-[600px] bg-white"
          }
        >
          <div className={"flex justify-space text-black mt-3"}>
            <button
              className={"bg-blue-500 p-5 rounded-2xl"}
              onClick={handleDiaryOpen}
            >
              일기
            </button>
            <button
              className={"bg-red-400 p-5 rounded-2xl"}
              onClick={handletoDoOpen}
            >
              일정
            </button>
          </div>
          {isLoading ? null : <DiaryTable diaryData={data?.diary} />}
          {isTodoLoading ? null : <TodoTable todoData={todoData?.todo} />}
        </div>
      </modal>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { date } = ctx.query;
  console.log("query", date);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["DIARY", date], () => {
    return useCalendarQuery.getDiary(date);
  });

  const diaryQuery = queryClient.getQueryData(["DIARY", date]);
  console.log(diaryQuery?.diary[0].user);

  await queryClient.prefetchQuery(["TODO", date ?? null], () => {
    return useCalendarQuery.getTodo(date ?? null);
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Calendar;
