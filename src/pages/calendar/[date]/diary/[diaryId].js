import { useRouter } from "next/router";
import useCalendarQuery from "@/Query/useCalendarQuery";

const DiaryDetail = () => {
  const router = useRouter();
  const { date, diaryId } = router.query;
  const { data, isLoading } = useCalendarQuery.useGetDiaryDetail(date, diaryId);
  const diary = data?.diary;
  console.log(data, isLoading);
  return (
    <div className={"text-black"}>
      <input defaultValue={diary?.title} />
      <input defaultValue={diary?.content} />
      <input defaultValue={diary?.user?.name} />
      <p className={"text-white"}>{diary?.createdAt}</p>
    </div>
  );
};

export default DiaryDetail;
