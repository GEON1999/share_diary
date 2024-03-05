import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useDiaryMutation from "@/Queries/useDiaryMutation";
import styled from "styled-components";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

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
  padding: 70px 0;

  @media (max-width: 800px) {
    padding: 25px 0;
    height: 510px;
    width: 340px;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 400px;
  height: 40px;
  border-radius: 10px;
  border-bottom: 1px solid #000000;
  outline: none;
  padding-left: 10px;
  color: #000000;
  margin: 10px 0px;

  @media (max-width: 800px) {
    height: 40px;
    width: 290px;
    font-size: 13px;
  }
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

  @media (max-width: 800px) {
    height: 40px;
    width: 290px;
    font-size: 13px;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 20px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 800px) {
    font-size: 15px;
  }
`;

const Label = styled.label`
  color: #ffffff;
  font-size: 14px;
  @media (max-width: 800px) {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const ImageUploadBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0px 20px 0px;
  & > img {
    margin-top: -10px;
    width: 100px;
    height: 100px;
  }

  @media (max-width: 800px) {
    margin: 10px 0px 10px 0px;
  }
`;

const Texteditor = styled.div`
  display: block;
  flex-direction: column;

  @media (max-width: 800px) {
    height: 160px;
    width: 290px;
  }
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
  const [text, setText] = useState();

  const { date, calendarId } = router.query;
  const { register, handleSubmit } = useForm();

  const {
    mutate,
    status,
    data: postData,
  } = useMutation(useDiaryMutation.postDiary);

  const onSubmit = (data) => {
    const formData = { ...data, content: text };
    mutate(
      { data: formData, date: date, calendarId },
      {
        onSuccess: () => {
          notify("success");
          router.push(`/calendar/${calendarId}?date=${date}`);
        },
      }
    );
  };

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <>
      <DiaryContainer>
        <Title>새로운 일기</Title>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder={"제목"} {...register("title")} />
          <div className="form_box">
            <ImageUploadBtn className="upload_wrap">
              <Label>썸네일 추가</Label>
              <img
                src="https://dhgilmy0l2xzq.cloudfront.net/ae6a89a2-e974-4c2a-a7b5-1794a3bf3b86-20240109122208.png"
                alt="upload"
              />
            </ImageUploadBtn>
          </div>
          <Texteditor>
            <Label>내용</Label>
            {ReactQuill && <ReactQuill value={text} onChange={handleChange} />}
          </Texteditor>
          <SubmitBtn type={"submit"}>저장</SubmitBtn>
        </FormContainer>
      </DiaryContainer>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default NewDiary;
