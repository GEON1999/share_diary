import useUserQuery from "@/Queries/useUserQuery";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import useCalendarMutation from "@/Queries/useCalendarMutation";
import {
  FormContainer,
  Input,
  Title,
  FormWrapper,
  UserProfile,
  ProfileInput,
  MidnightBlueBtn,
} from "@/styles/GlobalStyles";

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
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper
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
          <UserProfile size={"m"}>
            {image ? (
              <ProfileInput onClick={handleImageBtn} src={image} alt="user" />
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
          <MidnightBlueBtn size={"s"} type="submit">
            가입하기
          </MidnightBlueBtn>
        </FormWrapper>
      </form>
    </FormContainer>
  );
};

Join.notAuthPage = true;

export default Join;
