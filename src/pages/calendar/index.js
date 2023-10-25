import { useEffect, useLayoutEffect, useState } from "react";
import useCalendarQuery from "@/Query/useCalendarQuery";
import { useRouter } from "next/router";
import TodoTable from "@/components/table/TodoTable";
import styled, { keyframes } from "styled-components";
import DiaryTable from "@/components/table/DiaryTable";
import useDiaryQuery from "@/Query/useDiaryQuery";
import Calendar from "@/components/calendar";
import { dehydrate, QueryClient } from "@tanstack/react-query";

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

const Index = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [isPlusToggle, setIsPlusToggle] = useState(false);
  const { date } = router.query;

  // get diary
  const { data, isLoading } = useDiaryQuery.useGetDiary(date);

  // get todo
  const { data: todoData, isLoading: isTodoLoading } =
    useCalendarQuery.useGetTodo(date);

  console.log("todoData", todoData, data);

  //  const { mutate } = useMutation(useCalendarQuery.postCalender);

  const handleModalOpen = async (date) => {
    setModal(true);
    const dateObj = new Date(date);
    const msDate = dateObj.getTime();
    router.push(`/calendar?date=${msDate}`);
  };

  const handleDiaryOpen = () => router.push(`/calendar/${date}/newDiary`);
  const handletoDoOpen = () => router.push(`/calendar/${date}/newTodo`);

  const togglePuls = () => {
    setIsPlusToggle(!isPlusToggle);
  };

  const handleMypageBtn = () => {
    router.push("/mypage");
  };

  const handleDayClick = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    const msDate = date.getTime();
    router.push(`/calendar?date=${msDate}`);
  };

  // 현재 로그인 되어 있는 유저 id 를 가져오고, 그 id 를 통해 diary 및 calendar 의 id 를 가져온다. 해당 id 를 통해 diary 및 calendar 를 가져온다.
  // 가져온 diary 및 calendar 를 통해 해당 날짜에 diary 및 calendar 가 있는지 확인한다.(map 을 통해 확인)
  // diary 및 calendar 가 있다면, diary 및 calendar 를 보여준다.

  return (
    <div>
      <HomeWrapper>
        <Calendar />
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
                {isLoading ? null : <DiaryTable diaryData={data?.diaries} />}
              </div>
              <div>
                {isTodoLoading ? null : <TodoTable todoData={todoData?.todo} />}
              </div>
            </ListContainer>
          </DiaryContainer>
        </modal>
      </HomeWrapper>
      <MypageBtn onClick={handleMypageBtn}>
        <img
          src={
            "https://dhgilmy0l2xzq.cloudfront.net/8c32563a-6301-4bbe-850e-f67384175e6c-20230914204400.png"
          }
        />
      </MypageBtn>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { date } = ctx.query;
  /*console.log("query", date);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["DIARY", date ?? null], () => {
    return useCalendarQuery.getDiary(date ?? null);
  });

  /!*  const diaryQuery = queryClient.getQueryData(["DIARY", date]);
  console.log(diaryQuery?.diary[0].user);*!/

  await queryClient.prefetchQuery(["TODO", date ?? null], () => {
    return useCalendarQuery.getTodo(date ?? null);
  });*/

  return {
    props: {
      //dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Index;
