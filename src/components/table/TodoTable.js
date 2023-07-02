import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import useCalendarQuery from "@/Query/useCalendarQuery";

const TodoTable = ({ todoData }) => {
  return (
    <>
      {todoData?.map((data) => {
        return (
          <div key={data.id} className={"text-black"}>
            <p>내용 : {data?.content}</p>
          </div>
        );
      })}
    </>
  );
};

export default TodoTable;
