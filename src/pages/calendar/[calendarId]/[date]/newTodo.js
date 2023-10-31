import useCalendarQuery from "@/Query/useCalendarQuery";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";

const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  height: 620px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: rgba(59, 59, 59, 0.5);
  border-radius: 30px;
`;

const Input = styled.input`
  width: 400px;
  height: 50px;
  border-radius: 10px;
  border-bottom: 1px solid #000000;
  outline: none;
  padding-left: 10px;
  color: #000000;
  margin: 10px 0px;
`;

const SubmitBtn = styled.button`
  background-color: rgba(25, 25, 112, 0.5);
  color: #ffffff;
  width: 400px;
  height: 50px;
  border-radius: 10px;
  margin-top: 20px;

  &:hover {
    background-color: rgb(25, 25, 112);
    transition: 0.5s;
  }
`;

const NewTodo = () => {
  const router = useRouter();
  const { date } = router.query;

  const { register, handleSubmit } = useForm();
  const { mutate } = useMutation(useCalendarQuery.postTodo);

  const onSubmit = (data) => {
    console.log(data);
    mutate({ data, date: date });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DiaryContainer>
        <Input {...register("content")} />
        <SubmitBtn type={"submit"}>저장</SubmitBtn>
      </DiaryContainer>
    </form>
  );
};

export default NewTodo;
