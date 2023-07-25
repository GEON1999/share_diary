import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import useUserQuery from "@/Query/useUserQuery";
import config from "tailwindcss/defaultConfig";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const { data, error, isLoading } = useUserQuery.useGetUser("test");
  const {
    mutate,
    data: postData,
    isSuccess,
  } = useMutation(useUserQuery.loginUser);
  console.log("postData", postData);
  useEffect(() => {
    postData?.data?.message === "success"
      ? router.push("/calendar")
      : postData?.data?.message === "fail"
      ? alert("로그인 실패")
      : null;
  }, [postData]);
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (data) => {
    mutate(data);
  };

  /*const handleKaKaoLogin = ()  => {
        config.kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/kakao',
        });
    }*/

  const handleJoin = () => router.push("/join");

  return (
    <div className={"w-full p-20"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={
            'flex flex-col space-y-5 "w-full" justify-center content-center items-center mt-40'
          }
        >
          {" "}
          <input
            className={"w-80 rounded text-black"}
            {...register("id", { required: true })}
            type="text"
            placeholder="아이디"
          />
          <input
            className={"w-80 rounded text-black"}
            {...register("pw", { required: true })}
            type="password"
            placeholder="비밀번호"
          />
          <button className={"bg-blue-50 px-3 py-1 rounded-2xl text-black"}>
            login
          </button>
          <button
            onClick={handleJoin}
            className={"bg-blue-50 px-3 py-1 rounded-2xl text-black"}
          >
            Join
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
