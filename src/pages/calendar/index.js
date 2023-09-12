import { useState } from "react";
import useCalendarQuery from "@/Query/useCalendarQuery";
import { useRouter } from "next/router";
import TodoTable from "@/components/table/TodoTable";
import styled, { keyframes } from "styled-components";
import DiaryTable from "@/components/table/DiaryTable";
import useDiaryQuery from "@/Query/useDiaryQuery";

const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  height: 620px;
  justify-content: start;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: rgba(59, 59, 59, 0.5);
  border-radius: 30px;
`;

const PluseBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #ffffff;
  margin-top: 20px;
  background-color: #ffffff;
  &:hover {
    img {
      transition: all 0.5s;
      transform: rotate(45deg);
    }
  }
  &:not(:hover) {
    img {
      transition: all 0.5s;
      transform: rotate(0deg); /* hover 해제 시 초기 각도로 돌아가도록 설정 */
    }
  }
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;

const DiaryBtn = styled.button`
  ${fadeInAnimation} 0.5s ease;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  color: #ffff;
  margin-top: 20px;
  background-color: #045cb6;
`;

const TodoBtn = styled.button`
  ${fadeInAnimation} 0.5s ease;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  color: #ffff;
  margin-top: 20px;
  background-color: #205b08;
`;

const ListContainer = styled.div`
  display: flex;
`;

const Calendar = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [isPlusToggle, setIsPlusToggle] = useState(false);
  const { date } = router.query;

  // get diary
  const { data, isLoading } = useDiaryQuery.useGetDiary(date);
  console.log(data, isLoading);
  // get todo
  const { data: todoData, isLoading: isTodoLoading } =
    useCalendarQuery.useGetTodo(date);

  //  const { mutate } = useMutation(useCalendarQuery.postCalender);

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

  const togglePuls = () => {
    setIsPlusToggle(!isPlusToggle);
  };

  return (
    <div>
      <table>
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
        <DiaryContainer>
          <PluseBtn onClick={() => togglePuls()}>
            <img
              src={
                "https://dhgilmy0l2xzq.cloudfront.net/e65578bb-c4e1-4579-af11-0de7e201082a-20230906202159.png"
              }
            />
          </PluseBtn>
          <BtnContainer>
            {isPlusToggle ? (
              <>
                <DiaryBtn onClick={handleDiaryOpen}>일기</DiaryBtn>
                <TodoBtn onClick={handletoDoOpen}>할일</TodoBtn>
              </>
            ) : null}
          </BtnContainer>
          <ListContainer>
            <div>
              {isLoading ? null : <DiaryTable diaryData={data?.diaries} />}
            </div>
            <div>
              {isTodoLoading ? null : <TodoTable todoData={todoData?.todo} />}
            </div>
          </ListContainer>
        </DiaryContainer>
      </modal>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  /* const { date } = ctx.query;
  console.log("query", date);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["DIARY", date], () => {
    return useCalendarQuery.getDiary(date);
  });

  const diaryQuery = queryClient.getQueryData(["DIARY", date]);
  console.log(diaryQuery?.diary[0].user);

  await queryClient.prefetchQuery(["TODO", date ?? null], () => {
    return useCalendarQuery.getTodo(date ?? null);
  });*/

  return {
    props: {
      //dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Calendar;
