import useUserQuery from "@/Queries/useUserQuery";
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
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: rgba(59, 59, 59, 0.5);
  border-radius: 30px;

  @media (max-width: 800px) {
    padding: 80px 0;
    height: 510px;
    width: 340px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  border-radius: 10px;
  border-bottom: 1px solid #000000;
  outline: none;
  padding-left: 10px;
  color: #000000;
  @media (max-width: 800px) {
    height: 40px;
    width: 290px;
    font-size: 13px;
  }
`;

const SubmitBtn = styled.button`
  background-color: rgba(25, 25, 112, 0.5);
  color: #ffffff;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  margin-top: 40px;
  @media (max-width: 800px) {
    height: 40px;
    width: 290px;
    font-size: 13px;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 30px;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
  @media (max-width: 800px) {
    font-size: 20px;
    font-weight: 600;
  }
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
          <Title>회원가입</Title>{" "}
          <Input
            className={"w-80 rounded text-black"}
            {...register("id", { required: true })}
            type="text"
            placeholder="아이디"
          />
          <Input
            {...register("name", { required: true })}
            type="text"
            placeholder="이름"
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
          <SubmitBtn type="submit">join</SubmitBtn>
        </FormContainer>
      </form>
    </JoinContainer>
  );
};

Join.notAuthPage = true;

export default Join;
