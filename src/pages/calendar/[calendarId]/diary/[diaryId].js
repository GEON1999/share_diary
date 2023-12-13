import useDiaryQuery from "@/Queries/useDiaryQuery";
import { useRouter } from "next/router";
import styled from "styled-components";
import CalendarNav from "@/components/common/CalendarNav";
import { useForm } from "react-hook-form";
import useCalendarMutation from "@/Queries/useCalendarMutation";
import { useMutation } from "@tanstack/react-query";
import useDiaryMutation from "@/Queries/useDiaryMutation";

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

  const { mutate: updateDiary } = useMutation(useDiaryMutation.putDiary);

  const { register, handleSubmit } = useForm();
  console.log("diaryDetail :", diaryDetail, isLoading);

  const onSubmit = (data) => {
    updateDiary(
      { calendarId, diaryId, data },
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
              <Input
                type="text"
                {...register("content")}
                defaultValue={diaryDetail?.diary?.content}
              />
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
