import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import useCalendarQuery from "@/Query/useCalendarQuery";
import styled from "styled-components";

const Diary = styled.div`
  width: 300px;
  height: 50px;
  text-align: left;
  border-bottom: 2px solid #273838;
  outline: none;
  padding-left: 10px;
  color: #ffffff;
  margin: 15px 0px;
`;

const DiaryTable = ({ diaryData }) => {
  return (
    <>
      {diaryData?.map((data) => {
        return (
          <Diary key={data.id} className={"text-black"}>
            <p>제목 : {data?.title}</p>
            <p>내용 : {data?.content}</p>
          </Diary>
        );
      })}
    </>
  );
};

export default DiaryTable;
