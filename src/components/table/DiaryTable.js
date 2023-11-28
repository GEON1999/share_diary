import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import useCalendarQuery from "@/Query/useCalendarQuery";
import styled from "styled-components";

const Diary = styled.div`
  width: 200px;
  height: 50px;
  text-align: left;
  outline: none;
  padding-left: 10px;
  color: #ffffff;
  margin: 25px 0px;
  cursor: pointer;
`;

const Writer = styled.p`
  font-size: 14px;

  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.78);
  text-align: right;
`;

const DiaryTable = ({ diaryData }) => {
  const router = useRouter();
  const { calendarId, date } = router.query;

  const handleDiaryDetail = (diaryId) => {
    router.push(`/calendar/${calendarId}/diary/${diaryId}`);
  };

  return (
    <>
      {diaryData?.map((data) => {
        return (
          <Diary
            onClick={() => handleDiaryDetail(data?.id)}
            key={data.id}
            className={"text-black"}
          >
            <p>제목 : {data?.title}</p>
            <p>내용 : {data?.content}</p>
            <Writer>작성자 : {data?.user?.name}</Writer>
          </Diary>
        );
      })}
    </>
  );
};

export default DiaryTable;
