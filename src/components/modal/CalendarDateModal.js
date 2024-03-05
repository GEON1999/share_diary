import DiaryTable from "@/components/table/DiaryTable";
import TodoTable from "@/components/table/TodoTable";
import styled, { keyframes } from "styled-components";
import useDiaryQuery from "@/Queries/useDiaryQuery";
import useTodoQuery from "@/Queries/useTodoQuery";
import { useRouter } from "next/router";
import { useAuthContext } from "@/Providers/AuthProvider";
import { useState } from "react";

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
  @media (max-width: 800px) {
    height: 470px;
    width: 340px;
    margin-right: 0px;
  }
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

  @media (max-width: 800px) {
    width: 40px;
    height: 40px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin-bottom: 20px;
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const DiaryBtn = styled.button`
  ${fadeInAnimation} 0.5s ease;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  color: #ffff;
  margin-top: 20px;
  background-color: #045cb6;

  @media (max-width: 800px) {
    width: 110px;
    height: 45px;
    font-size: 13px;
  }
`;

const TodoBtn = styled.button`
  ${fadeInAnimation} 0.5s ease;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  color: #ffff;
  margin-top: 20px;
  background-color: #205b08;

  @media (max-width: 800px) {
    width: 110px;
    height: 45px;
    font-size: 13px;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 18px;
  margin: 0 auto;
  text-align: center;
  @media (max-width: 800px) {
    font-size: 13px;
  }
`;

const ExitBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px 0px 0;
`;

const ExitBtn = styled.img`
  cursor: pointer;

  @media (max-width: 800px) {
    left: 145px;
  }
`;

const rotation = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }

`;

const Loading = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: 16px auto;
  animation: ${rotation} 3s linear infinite;
`;

const CalendarDateModal = ({ onClose }) => {
  const router = useRouter();
  const { query } = router;
  const [isPlusToggle, setIsPlusToggle] = useState(false);
  const { calendarId, date } = query;
  const useAuth = useAuthContext();

  // get diary
  const {
    data: diaryData,
    isLoading,
    isFetched,
  } = useDiaryQuery.useGetDiary(calendarId, useAuth.user?.id, date);

  // get todo
  const { data: todoData, isLoading: isTodoLoading } = useTodoQuery.useGetTodo(
    calendarId,
    useAuth.user?.id,
    date
  );

  const handleDiaryOpen = () =>
    router.push(`/calendar/${calendarId}/${date}/newDiary`);
  const handletoDoOpen = () =>
    router.push(`/calendar/${calendarId}/${date}/newTodo`);

  const togglePuls = () => {
    setIsPlusToggle(!isPlusToggle);
  };
  return (
    <DiaryContainer>
      <ExitBox>
        <ExitBtn
          src={"/exit.png"}
          width={25}
          height={25}
          onClick={onClose}
        ></ExitBtn>
      </ExitBox>
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
            <DiaryBtn onClick={handleDiaryOpen}>기록 생성</DiaryBtn>
            <TodoBtn onClick={handletoDoOpen}>일정 생성</TodoBtn>
          </>
        ) : null}
      </BtnContainer>
      <ListContainer>
        <div>
          <Title>기록</Title>
          {isFetched ? <DiaryTable diaryData={diaryData} /> : <Loading />}
        </div>
        <div>
          <Title>일정</Title>
          {isFetched ? <TodoTable todoData={todoData} /> : <Loading />}
        </div>
      </ListContainer>
    </DiaryContainer>
  );
};

export default CalendarDateModal;
