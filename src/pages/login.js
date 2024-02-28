import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useUserQuery from "@/Queries/useUserQuery";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useAuthContext } from "@/Providers/AuthProvider";

/*<input
  className={"w-80 rounded text-black"}
  {...register("id", { required: true })}
  type="text"
  placeholder="아이디"
/>;*/
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  height: 620px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: rgba(59, 59, 59, 0.5);
  border-radius: 30px;

  @media (max-width: 600px) {
    height: 470px;
    width: 340px;
  }
`;

const Input = styled.input`
  width: 400px;
  height: 50px;
  border-radius: 10px;
  border-bottom: 1px solid #000000;
  outline: none;
  padding-left: 10px;
  color: #000000;
  margin: 10px 0px;

  @media (max-width: 600px) {
    height: 40px;
    width: 290px;
    font-size: 13px;
  }
`;

const LoginBtn = styled.button`
  background-color: rgba(25, 25, 112, 0.5);
  color: #ffffff;
  width: 400px;
  height: 50px;
  border-radius: 10px;
  margin-top: 20px;

  &:hover {
    background-color: rgb(25, 25, 112);
    transition: 0.5s;
  }

  @media (max-width: 600px) {
    margin-top: 40px;
    height: 40px;
    width: 290px;
    font-size: 13px;
  }
`;

const JoinBtn = styled.button`
  background-color: rgba(93, 111, 176, 0.5);
  color: #ffffff;
  width: 400px;
  height: 50px;
  border-radius: 10px;
  margin: 10px;
  &:hover {
    background-color: rgb(93, 111, 176);
    transition: 0.5s;
  }

  @media (max-width: 600px) {
    height: 40px;
    width: 290px;
    font-size: 13px;
  }
`;

const Login = () => {
  const router = useRouter();
  const useAuth = useAuthContext();
  const { data, error, isLoading } = useUserQuery.useGetUser("test");
  const {
    mutate,
    data: postData,
    isSuccess,
  } = useMutation(useUserQuery.loginUser);

  /*useEffect(() => {
    postData?.message === "success"
      ? router.push("/calendar")
      : postData?.data?.message === "fail"
      ? alert("로그인 실패")
      : null;
  }, [postData]);*/
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (data) => {
    if (data.name === "" || data.password === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    await useAuth.login(data.username, data.password);
    /*if (resultData.success) {
      router.push("/");
    } else {
      alert(resultData?.msg);
    }*/
  };

  /*const handleKaKaoLogin = ()  => {
        config.kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/kakao',
        });
    }*/

  const handleJoin = () => router.push("/join");

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LoginContainer>
          {" "}
          <Input
            inputColor="red"
            type={"text"}
            placeholder={"아이디"}
            {...register("username", { required: true })}
          />
          <Input
            type={"password"}
            placeholder={"비밀번호"}
            {...register("password", { required: true })}
          />
          <LoginBtn type={"submit"}>로그인</LoginBtn>
          <JoinBtn type={"button"} onClick={handleJoin}>
            회원가입
          </JoinBtn>
        </LoginContainer>
      </form>
    </Wrapper>
  );
};

Login.layout = "login";
Login.notAuthPage = true;

export default Login;
