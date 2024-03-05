import { useAuthContext } from "@/Providers/AuthProvider";
import styled from "styled-components";

const Btn = styled.button`
  width: 80px;
  height: 30px;
  color: #fff;
  border-radius: 40px;
  background-color: #bd3232;
  position: absolute;
  right: 20px;
  top: 30px;
  @media (max-width: 800px) {
    font-size: 13px;
    right: 5px;
  }
`;

const LogoutBtn = () => {
  const useAuth = useAuthContext();
  const handleLogout = () => useAuth.logout();

  return <Btn onClick={handleLogout}>로그아웃</Btn>;
};

export default LogoutBtn;
