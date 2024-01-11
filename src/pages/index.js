import styled from "styled-components";
import useCalendarQuery from "@/Queries/useCalendarQuery";
import { useRouter } from "next/router";
import { useState } from "react";
import AddCalendarModal from "@/components/modal/AddCalendar";
import CalendarNav from "@/components/common/CalendarNav";
import LogoutBtn from "@/components/common/LogoutBtn";
import useCalendarMutation from "@/Queries/useCalendarMutation";
import { dehydrate, QueryClient, useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/Providers/AuthProvider";
import router from "../../libs/server/router";

const HomeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

const CalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 105px;
`;

const Calendar = styled.div`
  width: 400px;
  margin: 10px 0 10px 0;
  padding: 20px 0 20px 0;
  border: 1px solid rgba(255, 255, 255, 0);
  color: rgba(0, 0, 0, 0.8);
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background-color: #5d6fb0;
    color: #fff;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.button`
  width: 200px;
  height: 60px;
  color: #fff;
  border-radius: 40px;
  background-color: #5177b8;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 20px;
  margin: 5px;
`;

const BtnWrapper = styled.div`
  display: flex;
`;

const DeleteBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 10px;
  color: #ffffff;
  background-color: #bd3232;
  margin-left: 5px;
`;

const Home = () => {
  const router = useRouter();
  const useAuth = useAuthContext();
  const [addCalendarModal, setAddCalendarModal] = useState(false);
  const { data, isLoading, refetch } = useCalendarQuery.useGetCalendarList(
    useAuth?.user?.id ?? null
  );

  const { mutate: deleteCalendar } = useMutation(
    useCalendarMutation.deleteCalendar
  );

  const handleEnterCalendar = (id) => router.push(`/calendar/${id}`);

  const handleCreateCalendar = () => setAddCalendarModal(true);

  const handleDeleteCalendar = (calendarId) => {
    deleteCalendar(
      { calendarId, userId: useAuth?.user?.id },
      {
        onSuccess: (data) => {
          if (data?.data?.isSuccess === true) {
            alert("달력이 삭제되었습니다.");
            refetch();
          } else {
            alert(data?.data?.message ?? "달력 삭제에 실패하였습니다.");
          }
        },
      }
    );
  };

  return (
    <>
      <LogoutBtn />
      <HomeWrapper>
        <Title>달력 목록</Title>
        {!isLoading
          ? data?.calendars?.map((calendar) => {
              return (
                <CalendarWrapper key={calendar?.calendar?.id}>
                  <Calendar
                    onClick={() => handleEnterCalendar(calendar?.calendar?.id)}
                  >
                    {calendar?.calendar?.name}
                  </Calendar>
                  <DeleteBtn
                    onClick={() => handleDeleteCalendar(calendar?.calendar?.id)}
                  >
                    {calendar?.role === "OWNER" ? "달력 삭제" : "달력 탈퇴"}
                  </DeleteBtn>
                </CalendarWrapper>
              );
            })
          : null}
        <BtnWrapper>
          <Button onClick={handleCreateCalendar}>달력 추가</Button>
        </BtnWrapper>
      </HomeWrapper>
      {addCalendarModal ? (
        <AddCalendarModal onClose={() => setAddCalendarModal(false)} />
      ) : null}
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const queryClient = new QueryClient();

  await router.run(req, res);
  const userId = req?.user?.id ?? null;

  await queryClient.prefetchQuery(["CALENDAR_LIST", userId], () => {
    return useCalendarQuery.getCalendarList(
      userId,
      process.env.AXIOS_AUTHORIZATION_SECRET
    );
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

export default Home;
