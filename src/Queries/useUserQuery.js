import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import helper from "@/helper";
import API from "@/API";

// 로그인 유저
const loginUser = async (data) => {
  const { data: result } = await axios.post("/api/users/enter", {
    username: data.id,
    password: data.pw,
  });

  return result;
};

// 유저 회원가입
const joinUser = async (data) => {
  return await axios.post("/api/users/join", data);
};

// 유저 정보 조회
const getUser = async (id, ssrRequestKey) => {
  const opt = { headers: { Auth: ssrRequestKey } };
  const { data } = await axios.get(
    helper.CURRENT_URL() + API.GET_USER(id),
    opt
  );

  return data;
};

const useGetUser = (id) => {
  return useQuery(["USER", id], () => getUser(id));
};

// 우자 정보 수정
const editUser = async ({ userId, formData }) =>
  await axios.post(API.EDIT_USER(userId), formData);

export default {
  loginUser,
  getUser,
  useGetUser,
  joinUser,
  editUser,
};
