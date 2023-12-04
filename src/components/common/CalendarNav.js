import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useAuthContext } from "@/Providers/AuthProvider";
import LogoutBtn from "@/components/common/LogoutBtn";

const Nav = styled.nav`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 15px;
  position: absolute;
  padding: 0px 30px;
  top: 0;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  height: 50px;
  border-radius: 15px;
  margin-top: 40px;
  margin-right: 20px;
`;

const CalendarNav = () => {
  const router = useRouter();
  const calendarId = router.query.calendarId;

  return (
    <Nav>
      <Ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {calendarId && (
          <>
            <li>
              <Link href={`/calendar/${calendarId}`}>Calendar</Link>
            </li>
            <li>
              <Link href={`/calendar/${calendarId}/mypage`}>Edit</Link>
            </li>
          </>
        )}
        <li>
          {" "}
          <LogoutBtn />
        </li>
      </Ul>
    </Nav>
  );
};

export default CalendarNav;
