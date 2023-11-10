import useCalendarQuery from "@/Query/useCalendarQuery";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useDiaryMutation from "@/Query/useDiaryMutation";
import styled from "styled-components";
import { toast, Toaster } from "react-hot-toast";
import { useEffect } from "react";

const DiaryContainer = styled.div`
  width: 640px;
  height: 620px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: rgba(59, 59, 59, 0.5);
  border-radius: 30px;
  padding: 130px 0;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
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

const Title = styled.h1`
  color: #ffffff;
  font-size: 23px;
  margin: 0 auto;
  text-align: center;
`;

const notify = (status) => {
  status === "success"
    ? toast.success("일기가 저장되었습니다.")
    : status === "error"
    ? toast.error("일기 저장에 실패했습니다.")
    : status === "loading"
    ? toast.loading("일기를 저장하는 중입니다.")
    : null;
};

const NewDiary = () => {
  const router = useRouter();
  const { date, calendarId } = router.query;
  const { register, handleSubmit } = useForm();

  const {
    mutate,
    status,
    data: postData,
  } = useMutation(useDiaryMutation.postDiary);

  const onSubmit = (data) => {
    console.log(data);
    mutate(
      { data, date: date, calendarId },
      {
        onSuccess: () => {
          notify("success");
          router.push(`/calendar/${calendarId}?${date}`);
        },
      }
    );
  };

  return (
    <>
      <DiaryContainer>
        <Title>새로운 일기</Title>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          {" "}
          <Input {...register("title")} />
          <Input {...register("content")} />
          <SubmitBtn type={"submit"}>저장</SubmitBtn>
        </FormContainer>
      </DiaryContainer>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default NewDiary;
