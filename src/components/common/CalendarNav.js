import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import LogoutBtn from "@/components/common/LogoutBtn";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/Providers/AuthProvider";

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

const A = styled.a`
  padding: 4px 8px 4px 8px;
  border-radius: 5px;
  &.active {
    background: white;
  }
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  height: 50px;
  border-radius: 15px;
  margin-top: 40px;
  margin-right: 50px;

  @media (max-width: 800px) {
    font-size: 13px;
    width: 100%;
  }
`;

const CalendarNav = ({ userRole }) => {
  const router = useRouter();
  const useAuth = useAuthContext();
  const pathName = router?.pathname.split("/");
  const lastPath = pathName[pathName.length - 1];

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
              <Link href={`/calendar/${calendarId}`}>
                <A className={lastPath === "[calendarId]" ? "active" : ""}>
                  Calendar
                </A>
              </Link>
            </li>
            <li>
              <Link href={`/calendar/${calendarId}/mypage`}>
                <A className={lastPath === "mypage" ? "active" : ""}>Edit</A>
              </Link>
            </li>
            {userRole === "OWNER" && (
              <li>
                <Link href={`/calendar/${calendarId}/manage`}>
                  <A className={lastPath === "manage" ? "active" : ""}>
                    Manage
                  </A>
                </Link>
              </li>
            )}
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
