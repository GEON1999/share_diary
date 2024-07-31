import useDiaryQuery from "@/Queries/useDiaryQuery";
import { useRouter } from "next/router";
import styled from "styled-components";
import CalendarNav from "@/components/common/CalendarNav";
import { useForm } from "react-hook-form";
import useCalendarMutation from "@/Queries/useCalendarMutation";
import { useMutation } from "@tanstack/react-query";
import useDiaryMutation from "@/Queries/useDiaryMutation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

const DiaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  height: 620px;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgba(59, 59, 59, 0.5);
  border-radius: 30px;
  padding-bottom: 50px;
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  border-radius: 10px;
  border-bottom: 1px solid #000000;
  outline: none;
  padding-left: 10px;
  color: #000000;
  margin: 10px 0px;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.button`
  background-color: rgba(25, 25, 112, 0.5);
  color: #ffffff;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  margin-top: 20px;
  transition: 0.3s;
  &:hover {
    background-color: rgba(25, 25, 112, 0.8);
  }
`;

const Label = styled.label`
  color: #ffffff;
  font-size: 14px;
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
`;

const Texteditor = styled.div`
  display: block;
  flex-direction: column;
  margin-bottom: 20px;
`;

const DiaryDetail = () => {
  const router = useRouter();

  const { calendarId, diaryId } = router.query;
  const {
    data: diaryDetail,
    isLoading,
    refetch,
  } = useDiaryQuery.useGetDiaryDetail({
    calendarId,
    diaryId,
  });
  const [text, setText] = useState(diaryDetail?.diary?.constructor ?? "");

  useEffect(() => {
    !isLoading && setText(diaryDetail?.diary?.content ?? "");
  }, [isLoading]);

  const { mutate: updateDiary } = useMutation(useDiaryMutation.putDiary);

  const { register, handleSubmit } = useForm();
  console.log("diaryDetail :", diaryDetail, isLoading);

  const onSubmit = (data) => {
    const formData = { ...data, content: text };
    updateDiary(
      { calendarId, diaryId, data: formData },
      {
        onSuccess: (data) => {
          if (data?.data?.isSuccess === true) {
            alert("수정되었습니다.");
            refetch();
          } else {
            alert(data?.data?.message ?? "수정에 실패하였습니다.");
          }
        },
      }
    );
  };

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <>
      <CalendarNav />
      <Container>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <DiaryWrapper>
              <Title>일기 수정</Title>
              <Input
                type="text"
                {...register("title")}
                defaultValue={diaryDetail?.diary?.title}
              />
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
                {ReactQuill && (
                  <ReactQuill value={text} onChange={handleChange} />
                )}
              </Texteditor>
              <span>작성자 : {diaryDetail?.diary?.user?.name}</span>
              <Button type={"submit"}>수정</Button>
            </DiaryWrapper>
          </form>
        )}
      </Container>
    </>
  );
};

export default DiaryDetail;
