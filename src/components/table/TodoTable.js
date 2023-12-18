import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import useCalendarQuery from "@/Queries/useCalendarQuery";
import styled from "styled-components";
import useCalendarMutation from "@/Queries/useCalendarMutation";
import useTodoMutation from "@/Queries/useTodoMutation";

const Diary = styled.div`
  width: 300px;
  height: 100px;
  text-align: left;
  outline: none;
  padding-left: 10px;
  color: #ffffff;
  margin: 25px 0px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
`;

const P = styled.p`
  margin-left: 5px;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 20%;
  color: #ffffff;
  margin-top: 20px;
  background-color: #bd3232;
  margin-left: 5px;
`;

const Writer = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.78);
  margin-left: 5px;
`;

const DiaryTable = ({ todoData }) => {
  const router = useRouter();
  const { calendarId, date } = router.query;

  const { mutate: deleteTodo } = useMutation(useTodoMutation.deleteTodo);

  const handleDiaryDetail = (todoId) => {
    router.push(`/calendar/${calendarId}/todo/${todoId}`);
  };

  const handleDelBtn = (todoId) => {
    deleteTodo(
      { calendarId, todoId },
      {
        onSuccess: (data) => {
          if (data?.data?.isSuccess) {
            alert("삭제되었습니다.");
            router.reload();
          } else {
            alert(data?.data?.message ?? "삭제에 실패했습니다.");
          }
        },
      }
    );
  };

  return (
    <>
      {todoData?.todoList?.map((data) => {
        return (
          <Diary key={data.id} className={"text-black"}>
            <Content onClick={() => handleDiaryDetail(data?.id)}>
              <P>제목 : {data?.title}</P>
              <P>내용 : {data?.content}</P>
              <Writer>작성자 : {data?.name}</Writer>
            </Content>
            <Button onClick={() => handleDelBtn(data?.id)}>삭제</Button>
          </Diary>
        );
      })}
    </>
  );
};

export default DiaryTable;
