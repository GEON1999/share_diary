import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// 로그인 유저
const loginUser = async (data) => {
  return await axios.post("/api/users/enter", data);
};

// 유저 회원가입
const joinUser = async (data) => {
  return await axios.post("/api/users/join", data);
};

// 유저 정보 조회
const getUser = async (username) => await axios.get(`/api/users/${username}`);

const useGetUser = (username) => {
  return useQuery(["USER", username], () => getUser(username));
};

export default {
  loginUser,
  useGetUser,
  joinUser,
};
