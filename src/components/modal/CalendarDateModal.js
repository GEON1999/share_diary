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

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
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

const Title = styled.h1`
  color: #ffffff;
  font-size: 23px;
  margin: 0 auto;
  text-align: center;
`;

const ExitBtn = styled.img`
  position: relative;
  left: 290px;
  top: 10px;
  cursor: pointer;
`;

const CalendarDateModal = ({ onClose }) => {
  const router = useRouter();
  const { query } = router;
  const [isPlusToggle, setIsPlusToggle] = useState(false);
  const { calendarId, date } = query;

  // get diary
  const { data: diaryData, isLoading } = useDiaryQuery.useGetDiary(
    calendarId,
    date
  );

  // get todo
  const { data: todoData, isLoading: isTodoLoading } = useTodoQuery.useGetTodo(
    calendarId,
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
      <ExitBtn
        src={"/exit.png"}
        width={25}
        height={25}
        onClick={onClose}
      ></ExitBtn>
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
  );
};

export default CalendarDateModal;
