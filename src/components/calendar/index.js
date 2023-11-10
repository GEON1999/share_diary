import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  height: 620px;
  justify-content: start;
  align-items: center;
  position: relative;
  z-index: 100;
  background-color: rgba(59, 59, 59, 0.5);
  border-radius: 30px;
  margin-right: 100px;
`;

const SelectContainer = styled.div`
  display: flex;
  margin: 20px 0px 20px 0px;
`;

const WeekContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeekDay = styled.div`
  width: 80px;
  height: 50px;
`;

const DayContainer = styled.div`
  display: flex;
`;

const Day = styled.td`
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  border-radius: 40%;
  background-color: ${({ isHighlighted, isDiary }) =>
    isHighlighted === true
      ? "#5BB0D3FF"
      : isDiary === true
      ? "#3940be"
      : "transparent"};
  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
`;

const generateCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  let day = 1;
  const calendar = [];

  for (let i = 0; i < 6; i++) {
    // 6 rows for each week
    const week = [];
    for (let j = 0; j < 7; j++) {
      // 7 columns for each day of the week
      if (i === 0 && j < startingDay) {
        week.push(null); // Empty cell for days before the 1st of the month
      } else if (day <= daysInMonth) {
        week.push(day);
        day++;
      } else {
        week.push(null); // Empty cell for days after the last day of the month
      }
    }
    calendar.push(week);
  }

  return calendar;
};

const Calendar = ({ calendarId, calendarData }) => {
  const router = useRouter();
  const date = router.query.date;
  const clickedDate = date ? new Date(parseInt(date)) : null;
  const clickedDay = clickedDate ? clickedDate.getDate() : null;

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const calendar = generateCalendar(year, month);

  useEffect(() => {
    document.title = `Calendar - ${year}-${month + 1}`;
  }, [year, month]);

  const handleClickDate = (day) => {
    const ms = new Date(year, month, day).getTime();
    router.push(`/calendar/${calendarId}/?date=${ms}`);
  };

  const calendarDateArr = calendarData?.calendar?.diaries?.map((diary) => {
    return diary.date;
  });

  console.log("calendarDateArr :", calendarDateArr);

  return (
    <CalendarContainer>
      <SelectContainer>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          min="1900"
          max="2100"
        />
        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {i + 1}월
            </option>
          ))}
        </select>
      </SelectContainer>
      <div>
        <table>
          <thead>
            <tr>
              <th>일</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
            </tr>
          </thead>
          <tbody>
            {calendar.map((week, index) => (
              <tr key={index}>
                {week.map((day, dayIndex) => {
                  const ms = new Date(year, month, day).getTime();
                  console.log("ms :", ms);
                  if (calendarDateArr?.includes(String(ms))) {
                    return (
                      <Day
                        isHighlighted={clickedDay === day ? true : false}
                        onClick={() => handleClickDate(day)}
                        key={dayIndex}
                        isDiary={true}
                      >
                        {day ? day : ""}
                      </Day>
                    );
                  } else {
                    return (
                      <Day
                        isHighlighted={clickedDay === day ? true : false}
                        onClick={() => handleClickDate(day)}
                        key={dayIndex}
                      >
                        {day ? day : ""}
                      </Day>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
          {/* {calendar.map((week, index) => (
              <tr key={index}>
                {week.map((day, dayIndex) => {
                  const ms = new Date(year, month, day).getTime();
                  return (
                    <Day
                      isHighlighted={clickedDay === day ? true : false}
                      onClick={() => handleClickDate(day)}
                      key={dayIndex}
                    >
                      {day ? day : ""}
                    </Day>
                  );
                })}
              </tr>
            ))}*/}
        </table>
      </div>
    </CalendarContainer>
  );
};

export default Calendar;
