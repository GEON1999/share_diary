import useUserQuery from "@/Query/useUserQuery";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Login from "@/pages/login";

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  height: 620px;

  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: rgba(59, 59, 59, 0.5);
  border-radius: 30px;
  padding: 130px 0;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  border-radius: 10px;
  border-bottom: 1px solid #000000;
  outline: none;
  padding-left: 10px;
  color: #000000;
  margin: 10px 0px;
`;

const SubmitBtn = styled.button`
  background-color: rgba(25, 25, 112, 0.5);
  color: #ffffff;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  margin-top: 20px;
`;

const Join = () => {
  const router = useRouter();
  const { mutate, data } = useMutation(useUserQuery.joinUser);
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (data) => {
    if (data.pw !== data.pwConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    mutate(data, {
      onSuccess: (data) => {
        if (data?.data?.isSuccess === true) {
          router.push("/login");
        } else {
          alert("회원가입에 실패하였습니다.");
        }
      },
    });
  };

  useEffect(() => {
    if (data?.data?.isSuccess === true) {
      router.push("/calendar");
    }
  }, [data]);

  console.log("data", data);

  /*const handleKaKaoLogin = ()  => {
          config.kakao.Auth.authorize({
              redirectUri: 'http://localhost:3000/kakao',
          });
      }*/

  return (
    <JoinContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer
          className={
            'flex flex-col space-y-5 "w-full" justify-center content-center items-center mt-40'
          }
        >
          {" "}
          <Input
            className={"w-80 rounded text-black"}
            {...register("id", { required: true })}
            type="text"
            placeholder="아이디"
          />
          <Input
            className={"w-80 rounded text-black"}
            {...register("pw", { required: true })}
            type="password"
            placeholder="비밀번호"
          />
          <Input
            className={"w-80 rounded text-black"}
            {...register("pwConfirm", { required: true })}
            type="password"
            placeholder="비밀번호 재확인"
          />
          <SubmitBtn className={"bg-blue-50 px-3 py-1 rounded-2xl text-black"}>
            join
          </SubmitBtn>
        </FormContainer>
      </form>
    </JoinContainer>
  );
};

Join.notAuthPage = true;

export default Join;
