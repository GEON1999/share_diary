import useDiaryQuery from "@/Query/useDiaryQuery";
import { useRouter } from "next/router";

const DiaryDetail = () => {
  const router = useRouter();
  const { calendarId, date, diaryId } = router.query;
  const { data: diaryDetail, isLoading } = useDiaryQuery.useGetDiaryDetail({
    calendarId,
    date,
    diaryId,
  });
  console.log("diaryDetail :", diaryDetail, isLoading);
  return <div></div>;
};

export default DiaryDetail;
