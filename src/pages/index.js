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
import useUserQuery from "@/Queries/useUserQuery";
import { useForm } from "react-hook-form";
import helper from "@/helper";

const RootContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
`;

const HomeWrapper = styled.div`
  width: 1100px;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(245, 245, 245, 0.84);
  border-radius: 15px;
`;

const HomeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr); /* 높이를 2개의 동일한 행으로 고정 */
  gap: 80px;
`;

const UserProfileWrapper = styled.div`
  width: 600px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(245, 245, 245, 0.84);
  border-radius: 15px;
`;

const UserProfile = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin-top: 130px;
  margin-bottom: 50px;
  color: rgba(0, 0, 0, 0.8);
  background-color: #fff;

  @media (max-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    width: 150px;
    font-size: 15px;
  }
`;

const ImageInput = styled.img`
  background-color: #fff;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  cursor: pointer;

  @media (max-width: 800px) {
    width: 150px;
    height: 150px;
  }
`;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddBtn = styled.button`
  display: inline-block;
  width: 250px;
  height: 250px;
  background: linear-gradient(#fff 0 0), linear-gradient(#fff 0 0), #000;
  background-position: center;
  background-size: 50% 4px, 4px 50%; /*thickness = 2px, length = 50% (25px)*/
  background-repeat: no-repeat;
  border-radius: 50%;
  margin-top: 10px;
  @media (max-width: 800px) {
    width: 150px;
    height: 150px;
    font-size: 15px;
    background-size: 50% 2px, 2px 50%; /*thickness = 2px, length = 50% (25px)*/
  }
`;

const SettingBtn = styled.button`
  display: inline-block;
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 510px;
  @media (max-width: 800px) {
    width: 30px;
    height: 30px;
  }
`;

const Calendar = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 125px;
  margin: 10px 0;
  color: rgba(0, 0, 0, 0.8);
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #5d6fb0;
    color: #fff;
  }
  @media (max-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    width: 150px;
    font-size: 15px;
  }
`;

const Name = styled.h1`
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 20px;
  text-align: center;
  @media (max-width: 800px) {
    font-size: 23px;
    font-weight: 600;
    border-bottom: 1px solid black;
  }
`;

const CalendarSelect = styled.select`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 20px;
  @media (max-width: 800px) {
    width: 150px;
    height: 30px;
    font-size: 15px;
  }
`;

const TodoWrapper = styled.div`
  height: 350px;
  overflow-y: scroll;
  //스크롤바 숨기기
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Todos = styled.div`
  display: flex;
  font-size: 20px;
  margin: 5px 0px;
  justify-content: center;
  align-items: center;
  width: 500px;

  @media (max-width: 800px) {
    font-size: 15px;
  }
`;

const Todo = styled.div`
  text-align: right;
  width: 350px;
`;

const CalDate = styled.div`
  text-align: right;
  width: 150px;
`;

const DeleteBtn = styled.button`
  width: 100px;
  height: 70px;
  border-radius: 10px;
  color: #ffffff;
  background-color: #bd3232;
  margin-left: 5px;

  @media (max-width: 800px) {
    width: 80px;
    height: 50px;
    font-size: 15px;
  }
`;

const Home = () => {
  const router = useRouter();
  const useAuth = useAuthContext();
  const [addCalendarModal, setAddCalendarModal] = useState(false);
  const { data, isLoading, refetch } = useCalendarQuery.useGetCalendarList(
    useAuth?.user?.id ?? null
  );
  const { data: userData, isLoading: userLoading } = useUserQuery.useGetUser(
    useAuth?.user?.id ?? null
  );
  console.log("userData :", userData, data);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const date = today.getTime();

  const { register, handleSubmit, watch } = useForm();

  const selectedId = watch("calendar"); // react-hook-form의 watch 함수로 현재 선택된 값을 가져옵니다.
  const selectedCalendar = data?.calendars?.find(
    (calendar) => calendar.calendar.id === parseInt(selectedId)
  );
  const selectedCalendarTodos = selectedCalendar?.calendar?.todos;
  console.log("selectedCalendarTodos :", selectedCalendarTodos);

  const { mutate: deleteCalendar } = useMutation(
    useCalendarMutation.deleteCalendar
  );

  const handleEnterCalendar = (id) =>
    router.push(`/calendar/${id}?date=${date}`);

  const handleCreateCalendar = () => setAddCalendarModal(true);

  const handleMypage = () => router.push(`/mypage?userId=${useAuth?.user?.id}`);

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
      <RootContainer>
        {" "}
        <HomeWrapper>
          <HomeGrid>
            <AddBtn onClick={handleCreateCalendar} />

            {!isLoading
              ? data?.calendars?.map((calendar) => {
                  return (
                    <CalendarWrapper key={calendar?.calendar?.id}>
                      <Calendar
                        onClick={() =>
                          handleEnterCalendar(calendar?.calendar?.id)
                        }
                        src={calendar?.calendar?.img ?? "/favicon5.png"}
                      />
                      {calendar?.calendar?.name}
                      {/* <DeleteBtn
                    onClick={() => handleDeleteCalendar(calendar?.calendar?.id)}
                  >
                    {calendar?.role === "OWNER" ? "삭제" : "탈퇴"}
                  </DeleteBtn>*/}
                    </CalendarWrapper>
                  );
                })
              : null}
          </HomeGrid>
        </HomeWrapper>
        <UserProfileWrapper>
          <SettingBtn onClick={handleMypage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 50 50"
            >
              <path d="M 22.205078 2 A 1.0001 1.0001 0 0 0 21.21875 2.8378906 L 20.246094 8.7929688 C 19.076509 9.1331971 17.961243 9.5922728 16.910156 10.164062 L 11.996094 6.6542969 A 1.0001 1.0001 0 0 0 10.708984 6.7597656 L 6.8183594 10.646484 A 1.0001 1.0001 0 0 0 6.7070312 11.927734 L 10.164062 16.873047 C 9.583454 17.930271 9.1142098 19.051824 8.765625 20.232422 L 2.8359375 21.21875 A 1.0001 1.0001 0 0 0 2.0019531 22.205078 L 2.0019531 27.705078 A 1.0001 1.0001 0 0 0 2.8261719 28.691406 L 8.7597656 29.742188 C 9.1064607 30.920739 9.5727226 32.043065 10.154297 33.101562 L 6.6542969 37.998047 A 1.0001 1.0001 0 0 0 6.7597656 39.285156 L 10.648438 43.175781 A 1.0001 1.0001 0 0 0 11.927734 43.289062 L 16.882812 39.820312 C 17.936999 40.39548 19.054994 40.857928 20.228516 41.201172 L 21.21875 47.164062 A 1.0001 1.0001 0 0 0 22.205078 48 L 27.705078 48 A 1.0001 1.0001 0 0 0 28.691406 47.173828 L 29.751953 41.1875 C 30.920633 40.838997 32.033372 40.369697 33.082031 39.791016 L 38.070312 43.291016 A 1.0001 1.0001 0 0 0 39.351562 43.179688 L 43.240234 39.287109 A 1.0001 1.0001 0 0 0 43.34375 37.996094 L 39.787109 33.058594 C 40.355783 32.014958 40.813915 30.908875 41.154297 29.748047 L 47.171875 28.693359 A 1.0001 1.0001 0 0 0 47.998047 27.707031 L 47.998047 22.207031 A 1.0001 1.0001 0 0 0 47.160156 21.220703 L 41.152344 20.238281 C 40.80968 19.078827 40.350281 17.974723 39.78125 16.931641 L 43.289062 11.933594 A 1.0001 1.0001 0 0 0 43.177734 10.652344 L 39.287109 6.7636719 A 1.0001 1.0001 0 0 0 37.996094 6.6601562 L 33.072266 10.201172 C 32.023186 9.6248101 30.909713 9.1579916 29.738281 8.8125 L 28.691406 2.828125 A 1.0001 1.0001 0 0 0 27.705078 2 L 22.205078 2 z M 23.056641 4 L 26.865234 4 L 27.861328 9.6855469 A 1.0001 1.0001 0 0 0 28.603516 10.484375 C 30.066026 10.848832 31.439607 11.426549 32.693359 12.185547 A 1.0001 1.0001 0 0 0 33.794922 12.142578 L 38.474609 8.7792969 L 41.167969 11.472656 L 37.835938 16.220703 A 1.0001 1.0001 0 0 0 37.796875 17.310547 C 38.548366 18.561471 39.118333 19.926379 39.482422 21.380859 A 1.0001 1.0001 0 0 0 40.291016 22.125 L 45.998047 23.058594 L 45.998047 26.867188 L 40.279297 27.871094 A 1.0001 1.0001 0 0 0 39.482422 28.617188 C 39.122545 30.069817 38.552234 31.434687 37.800781 32.685547 A 1.0001 1.0001 0 0 0 37.845703 33.785156 L 41.224609 38.474609 L 38.53125 41.169922 L 33.791016 37.84375 A 1.0001 1.0001 0 0 0 32.697266 37.808594 C 31.44975 38.567585 30.074755 39.148028 28.617188 39.517578 A 1.0001 1.0001 0 0 0 27.876953 40.3125 L 26.867188 46 L 23.052734 46 L 22.111328 40.337891 A 1.0001 1.0001 0 0 0 21.365234 39.53125 C 19.90185 39.170557 18.522094 38.59371 17.259766 37.835938 A 1.0001 1.0001 0 0 0 16.171875 37.875 L 11.46875 41.169922 L 8.7734375 38.470703 L 12.097656 33.824219 A 1.0001 1.0001 0 0 0 12.138672 32.724609 C 11.372652 31.458855 10.793319 30.079213 10.427734 28.609375 A 1.0001 1.0001 0 0 0 9.6328125 27.867188 L 4.0019531 26.867188 L 4.0019531 23.052734 L 9.6289062 22.117188 A 1.0001 1.0001 0 0 0 10.435547 21.373047 C 10.804273 19.898143 11.383325 18.518729 12.146484 17.255859 A 1.0001 1.0001 0 0 0 12.111328 16.164062 L 8.8261719 11.46875 L 11.523438 8.7734375 L 16.185547 12.105469 A 1.0001 1.0001 0 0 0 17.28125 12.148438 C 18.536908 11.394293 19.919867 10.822081 21.384766 10.462891 A 1.0001 1.0001 0 0 0 22.132812 9.6523438 L 23.056641 4 z M 25 17 C 20.593567 17 17 20.593567 17 25 C 17 29.406433 20.593567 33 25 33 C 29.406433 33 33 29.406433 33 25 C 33 20.593567 29.406433 17 25 17 z M 25 19 C 28.325553 19 31 21.674447 31 25 C 31 28.325553 28.325553 31 25 31 C 21.674447 31 19 28.325553 19 25 C 19 21.674447 21.674447 19 25 19 z"></path>
            </svg>
          </SettingBtn>
          <UserProfile>
            {" "}
            {userData?.user?.img ? (
              <ImageInput src={userData?.user?.img} alt="user" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="svg-icon"
                viewBox="0 0 1024 1024"
                version="1.1"
              >
                <path d="M512 597.994667q108.010667 0 225.002667 46.997333t116.992 123.008l0 85.994667-684.010667 0 0-85.994667q0-76.010667 116.992-123.008t225.002667-46.997333zM512 512q-69.994667 0-120-50.005333t-50.005333-120 50.005333-121.002667 120-51.008 120 51.008 50.005333 121.002667-50.005333 120-120 50.005333z" />
              </svg>
            )}
          </UserProfile>
          <Name>{userData?.user?.name}</Name>
          <CalendarSelect
            onChange={(e) => {
              console.log(e);
            }}
            {...register("calendar")}
          >
            <option value="0" disabled>
              달력을 골라주세요
            </option>
            {data?.calendars?.map((calendar) => {
              return (
                <option
                  onClick={() => console.log(calendar?.calendar?.todos)}
                  key={calendar?.calendar?.id}
                  value={calendar?.calendar?.id}
                >
                  {calendar?.calendar?.name}
                </option>
              );
            })}
          </CalendarSelect>
          <TodoWrapper>
            {selectedCalendarTodos?.length <= 0 ? (
              <Todos>일주일간 일정이 없습니다.</Todos>
            ) : (
              selectedCalendarTodos?.map((todo) => {
                const date = helper.formatDateToMMDD(parseInt(todo.date));

                return (
                  <Todos className="space-x-3" key={todo?.id}>
                    <Todo>{todo?.title}</Todo>
                    <CalDate className="text-right">{date}</CalDate>
                  </Todos>
                );
              })
            )}
          </TodoWrapper>
        </UserProfileWrapper>
      </RootContainer>

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

  await Promise.all([
    await queryClient.prefetchQuery(["USER", userId], () => {
      return useUserQuery.getUser(
        userId,
        process.env.AXIOS_AUTHORIZATION_SECRET
      );
    }),
    await queryClient.prefetchQuery(["CALENDAR_LIST", userId], () => {
      return useCalendarQuery.getCalendarList(
        userId,
        process.env.AXIOS_AUTHORIZATION_SECRET
      );
    }),
  ]);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

export default Home;
