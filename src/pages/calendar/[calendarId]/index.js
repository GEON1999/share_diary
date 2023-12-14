import { useEffect, useLayoutEffect, useState } from "react";
import useCalendarQuery from "@/Queries/useCalendarQuery";
import { useRouter } from "next/router";
import TodoTable from "@/components/table/TodoTable";
import styled, { keyframes } from "styled-components";
import DiaryTable from "@/components/table/DiaryTable";
import useDiaryQuery from "@/Queries/useDiaryQuery";
import Calendar from "@/components/calendar";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import router from "../../../../libs/server/router";
import helper from "@/helper";
import { useAuthContext } from "@/Providers/AuthProvider";
import CalendarNav from "@/components/common/CalendarNav";
import useTodoQuery from "@/Queries/useTodoQuery";

const HomeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  height: 620px;
  justify-content: start;
  align-items: center;
  position: relative;
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
  width: 101px;
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
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const MypageBtn = styled.button`
  position: absolute;
  top: 25px;
  right: 25px;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: rgba(201, 190, 190, 0.5);
  margin-top: 20px;
  padding: 5px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 23px;
  margin: 0 auto;
  text-align: center;
`;

const Index = () => {
  const router = useRouter();
  const { query } = router;
  const useAuth = useAuthContext();
  const [modal, setModal] = useState(false);
  const [isPlusToggle, setIsPlusToggle] = useState(false);
  const { calendarId, date } = query;

  const { data: calendarData, isLoading: isCalendarLoading } =
    useCalendarQuery.useGetCalendarDetail(
      calendarId ?? null,
      helper.queryToString({ userId: useAuth?.user?.id, date: date })
    );

  // get diary
  const { data: diaryData, isLoading } = useDiaryQuery.useGetDiary(
    calendarId,
    date
  );
  console.log("diaryData :", diaryData);

  // get todo
  const { data: todoData, isLoading: isTodoLoading } = useTodoQuery.useGetTodo(
    calendarId,
    date
  );

  console.log("todoData :", todoData);

  //  const { mutate } = useMutation(useCalendarQuery.postCalender);

  const handleModalOpen = async (date) => {
    setModal(true);
    const dateObj = new Date(date);
    const msDate = dateObj.getTime();
    router.push(`/calendar?date=${msDate}`);
  };

  const handleDiaryOpen = () =>
    router.push(`/calendar/${calendarId}/${date}/newDiary`);
  const handletoDoOpen = () =>
    router.push(`/calendar/${calendarId}/${date}/newTodo`);

  const togglePuls = () => {
    setIsPlusToggle(!isPlusToggle);
  };

  // 현재 로그인 되어 있는 유저 id 를 가져오고, 그 id 를 통해 diary 및 calendar 의 id 를 가져온다. 해당 id 를 통해 diary 및 calendar 를 가져온다.
  // 가져온 diary 및 calendar 를 통해 해당 날짜에 diary 및 calendar 가 있는지 확인한다.(map 을 통해 확인)
  // diary 및 calendar 가 있다면, diary 및 calendar 를 보여준다.

  return (
    <div>
      <CalendarNav />
      <HomeWrapper>
        <Calendar calendarId={calendarId} calendarData={calendarData} />
        <modal
          open={modal === true ? true : false}
          close={modal ? true : undefined}
        >
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
                <Title>일기</Title>
                {isLoading ? null : <DiaryTable diaryData={diaryData?.diary} />}
              </div>
              <div>
                <Title>할일</Title>
                {isTodoLoading ? null : <TodoTable todoData={todoData?.todo} />}
              </div>
            </ListContainer>
          </DiaryContainer>
        </modal>
      </HomeWrapper>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { req, res, query } = ctx;

  await router.run(req, res);
  const userId = req.user?.id ?? null;
  const { date, calendarId } = query;
  console.log("userId :", userId);
  const queryClient = new QueryClient();

  const calendarQuery = helper.queryToString({ userId: userId, date: date });

  await queryClient.prefetchQuery(
    ["CALENDAR_DETAIL", calendarId ?? null, calendarQuery],
    () => {
      return useCalendarQuery.getCalendarDetail(
        calendarId ?? null,
        calendarQuery
      );
    }
  );

  const calendarData = queryClient.getQueryData([
    "CALENDAR_DETAIL",
    calendarId,
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Index;
