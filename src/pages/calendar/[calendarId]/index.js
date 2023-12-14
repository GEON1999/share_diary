import { useEffect, useLayoutEffect, useState } from "react";
import useCalendarQuery from "@/Queries/useCalendarQuery";
import { useRouter } from "next/router";
import TodoTable from "@/components/table/TodoTable";
import styled, { keyframes } from "styled-components";
import DiaryTable from "@/components/table/DiaryTable";
import useDiaryQuery from "@/Queries/useDiaryQuery";
import Calendar from "@/components/calendar";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import router from "../../../../libs/server/router";
import helper from "@/helper";
import { useAuthContext } from "@/Providers/AuthProvider";
import CalendarNav from "@/components/common/CalendarNav";
import useTodoQuery from "@/Queries/useTodoQuery";

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
  const useAuth = useAuthContext();
  const { calendarId, date } = query;

  const { data: calendarData, isLoading: isCalendarLoading } =
    useCalendarQuery.useGetCalendarDetail(
      calendarId ?? null,
      helper.queryToString({ userId: useAuth?.user?.id, date: date })
    );

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

  await router.run(req, res);
  const userId = req.user?.id ?? null;
  const { date, calendarId } = query;
  console.log("userId :", userId);
  const queryClient = new QueryClient();

  const calendarQuery = helper.queryToString({ userId: userId, date: date });

  await queryClient.prefetchQuery(
    ["CALENDAR_DETAIL", calendarId ?? null, calendarQuery],
    () => {
      return useCalendarQuery.getCalendarDetail(
        calendarId ?? null,
        calendarQuery
      );
    }
  );

  const calendarData = queryClient.getQueryData([
    "CALENDAR_DETAIL",
    calendarId,
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Index;
