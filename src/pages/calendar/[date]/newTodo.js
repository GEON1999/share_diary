import useCalendarQuery from "@/Query/useCalendarQuery";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const NewTodo = () => {
  const router = useRouter();
  const { date } = router.query;

  const { register, handleSubmit } = useForm();
  const { mutate } = useMutation(useCalendarQuery.postTodo);

  const onSubmit = (data) => {
    console.log(data);
    mutate({ data, date: date });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={
          "text-black flex flex-col w-3/4 justify-center items-center space-y-3"
        }
      >
        <input
          {...register("content")}
          className={"w-full border-2 border-black"}
        />
        <button className={"bg-blue-500 p-5 rounded-2xl"} type={"submit"}>
          저장
        </button>
      </div>
    </form>
  );
};

export default NewTodo;
