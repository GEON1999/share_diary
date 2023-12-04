import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import useCalendarQuery from "@/Query/useCalendarQuery";
import styled from "styled-components";

const Todo = styled.p`
  width: 300px;
  height: 50px;
  text-align: left;
  border-bottom: 2px solid #273838;
  outline: none;
  padding-left: 10px;
  color: #ffffff;
  margin: 15px 0px;
`;

const TodoTable = ({ todoData }) => {
  return (
    <>
      {todoData?.map((data) => {
        return (
          <div key={data.id} className={"text-black"}>
            <Todo>{data?.content}</Todo>
          </div>
        );
      })}
    </>
  );
};

export default TodoTable;
