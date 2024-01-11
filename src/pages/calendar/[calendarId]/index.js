import { useRouter } from "next/router";
import styled from "styled-components";
import Calendar from "@/components/calendar";
import CalendarNav from "@/components/common/CalendarNav";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import router from "../../../../libs/server/router";
import helper from "@/helper";
import useCalendarQuery from "@/Queries/useCalendarQuery";
import { useAuthContext } from "@/Providers/AuthProvider";

const HomeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

const Index = () => {
  const router = useRouter();
  const { query } = router;
  const { calendarId, date } = query;

  const useAuth = useAuthContext();
  const { data: calendarData, isLoading: isCalendarLoading } =
    useCalendarQuery.useGetCalendarDetail(
      calendarId ?? null,
      helper.queryToString({ userId: useAuth?.user?.id })
    );

  console.log("calendarData :", calendarData, isCalendarLoading);

  //  const { mutate } = useMutation(useCalendarQuery.postCalender);

  return (
    <div>
      <CalendarNav />
      <HomeWrapper>
        <Calendar calendarId={calendarId} calendarData={calendarData} />
      </HomeWrapper>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { req, res, query } = ctx;
  const queryClient = new QueryClient();

  await router.run(req, res);
  const userId = req.user?.id ?? null;
  const { date, calendarId } = query;

  const calendarQuery = helper.queryToString({ userId });

  await queryClient.prefetchQuery(
    ["CALENDAR_DETAIL", calendarId ?? null, calendarQuery],
    () => {
      return useCalendarQuery.getCalendarDetail(
        calendarId ?? null,
        calendarQuery,
        process.env.AXIOS_AUTHORIZATION_SECRET
      );
    }
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Index;
