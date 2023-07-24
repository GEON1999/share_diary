import { useRouter } from "next/router";
import useCalendarQuery from "@/Query/useCalendarQuery";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useDiaryQuery from "@/Query/useDiaryQuery";
import useDiaryMutation from "@/Query/useDiaryMutation";

const DiaryDetail = () => {
  const router = useRouter();
  const { diaryId } = router.query;
  const { data, isLoading } = useDiaryQuery.useGetDiaryDetail(diaryId);
  const diary = data?.diary;
  console.log(data, isLoading);
  const { mutate } = useMutation(useDiaryMutation.putDiary);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    mutate({ data, id: diaryId });
  };

  return (
    <div className={"text-black"}>
      {isLoading ? null : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*ssr 적용 필요 defaultvalue 가 적용되지 않음(랜더링 중에 value 값을 적용)*/}
          <input
            {...register("title", {
              value: diary?.title,
            })}
          />
          <input
            {...register("content", {
              value: diary?.content,
            })}
          />
          <p className={"text-white"}>{diary?.user?.name}</p>
          <p className={"text-white"}>{diary?.createdAt}</p>
          <button type={"submit"} className={"bg-white mr-3"}>
            수정
          </button>
          <button className={"bg-white"}>뒤로가기</button>
        </form>
      )}
    </div>
  );
};

export default DiaryDetail;