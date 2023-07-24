import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import useCalendarQuery from "@/Query/useCalendarQuery";

const DiaryTable = ({ diaryData }) => {
  return (
    <>
      {diaryData?.map((data) => {
        return (
          <div key={data.id} className={"text-black"}>
            <p>제목 : {data?.title}</p>
            <p>내용 : {data?.content}</p>
            <p>작성자 : {data?.user?.name}</p>
            <p>작성일 : {data?.createdAt}</p>
          </div>
        );
      })}
    </>
  );
};

export default DiaryTable;
