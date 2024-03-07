import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import useCalendarQuery from "@/Queries/useCalendarQuery";
import styled from "styled-components";
import useCalendarMutation from "@/Queries/useCalendarMutation";

const Diary = styled.div`
  width: 300px;
  height: 150px;
  text-align: left;
  outline: none;
  padding-left: 10px;
  color: #ffffff;
  margin: 25px 0px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 800px) {
    width: 300px;
    height: 50px;
    margin: 5px 0px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 10px;
  align-items: center;
`;

const Content = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const ImgBox = styled.div`
  width: 150px;
  margin-right: 2px;
  img {
    max-height: 140px;
  }

  @media (max-width: 800px) {
    width: 100px;
    img {
      max-height: 40px;
    }
  }
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
  @media (max-width: 800px) {
    height: 40px;
    margin: 5px 0px;
  }
`;

const Writer = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.78);
  margin-left: 5px;
`;

const DiaryTable = ({ diaryData }) => {
  const router = useRouter();
  const { calendarId, date } = router.query;

  const { mutate: deleteDiary } = useMutation(useCalendarMutation.deleteDiary);

  const handleDiaryDetail = (diaryId) => {
    router.push(`/calendar/${calendarId}/diary/${diaryId}`);
  };

  const handleDelBtn = (diaryId) => {
    deleteDiary(
      { calendarId, diaryId },
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
      {diaryData?.diaryList?.map((data) => {
        return (
          <Diary key={data.id} className={"text-black"}>
            <ContentWrapper onClick={() => handleDiaryDetail(data?.id)}>
              <ImgBox>
                <img src={data?.img ?? "/favicon5.png"} />
              </ImgBox>
              <Content>
                <P>제목 : {data?.title}</P>
                {/* <P>내용 : {data?.content}</P>*/}
                <Writer>작성자 : {data?.name}</Writer>
              </Content>
            </ContentWrapper>
            {/* <Button onClick={() => handleDelBtn(data?.id)}>삭제</Button>*/}
          </Diary>
        );
      })}
    </>
  );
};

export default DiaryTable;
