import useUserQuery from "@/Queries/useUserQuery";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Login from "@/pages/login";
import useCalendarMutation from "@/Queries/useCalendarMutation";

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  height: 700px;
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

const UserProfile = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-top: 130px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.8);
  background-color: #fff;

  @media (max-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100px;
    font-size: 15px;
  }
`;

const ImageInput = styled.img`
  background-color: #fff;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  cursor: pointer;

  @media (max-width: 800px) {
    width: 100px;
    height: 100px;
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
  const [image, setImage] = useState(null);

  const { mutate: uploadImage } = useMutation(
    useCalendarMutation.useUploadImage
  );

  const onSubmit = async (data) => {
    if (data.pw !== data.pwConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const fomrData = { ...data, img: image };
    mutate(fomrData, {
      onSuccess: (data) => {
        if (data?.data?.isSuccess === true) {
          router.push("/login");
        } else {
          alert("회원가입에 실패하였습니다.");
        }
      },
    });
  };

  const handleImage = async (e) => {
    await uploadImage(e.target.files[0], {
      onSuccess: async (data) => {
        setImage(data.url);
      },
    });
  };

  const handleImageBtn = () => {
    document.getElementById("img_upload").click();
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
          <input
            id="img_upload"
            className="hidden"
            onInput={handleImage}
            accept=".jpg, .png, .bmp, .gif, .svg, .webp"
            type="file"
          />{" "}
          <Title>회원가입</Title>{" "}
          <UserProfile>
            {image ? (
              <ImageInput onClick={handleImageBtn} src={image} alt="user" />
            ) : (
              <svg
                onClick={handleImageBtn}
                xmlns="http://www.w3.org/2000/svg"
                className="svg-icon"
                viewBox="0 0 1024 1024"
                version="1.1"
              >
                <path d="M512 597.994667q108.010667 0 225.002667 46.997333t116.992 123.008l0 85.994667-684.010667 0 0-85.994667q0-76.010667 116.992-123.008t225.002667-46.997333zM512 512q-69.994667 0-120-50.005333t-50.005333-120 50.005333-121.002667 120-51.008 120 51.008 50.005333 121.002667-50.005333 120-120 50.005333z" />
              </svg>
            )}
          </UserProfile>
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
