import styled from "styled-components";
import useCalendarQuery from "@/Query/useCalendarQuery";
import { useRouter } from "next/router";
import { useState } from "react";
import AddCalendarModal from "@/components/modal/AddCalendar";

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
  flex-direction: row;
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

const Home = () => {
  const router = useRouter();
  const [addCalendarModal, setAddCalendarModal] = useState(false);
  const { data, isLoading } = useCalendarQuery.useGetCalendarList();

  const handleEnterCalendar = (id) => router.push(`/calendar/${id}`);

  const handleCreateCalendar = () => setAddCalendarModal(true);

  console.log("data :", data, isLoading);

  return (
    <>
      <HomeWrapper>
        <Title>다이어리 목록</Title>
        {!isLoading
          ? data?.calendars?.map((calendar) => {
              return (
                <div key={calendar.id}>
                  <Calendar onClick={() => handleEnterCalendar(calendar.id)}>
                    {calendar.name}
                  </Calendar>
                </div>
              );
            })
          : null}
        <BtnWrapper>
          <Button onClick={handleCreateCalendar}>다이어리 추가</Button>
        </BtnWrapper>
      </HomeWrapper>
      {addCalendarModal ? (
        <AddCalendarModal onClose={() => setAddCalendarModal(false)} />
      ) : null}
    </>
  );
};

export default Home;
