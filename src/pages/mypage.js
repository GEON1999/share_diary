import { useRouter } from "next/router";
import useUserQuery from "@/Queries/useUserQuery";
import { dehydrate, QueryClient, useMutation } from "@tanstack/react-query";
import router from "../../libs/server/router";
import useCalendarQuery from "@/Queries/useCalendarQuery";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useCalendarMutation from "@/Queries/useCalendarMutation";

const RootContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
`;

const UserProfileWrapper = styled.form`
  width: 800px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(245, 245, 245, 0.84);
  border-radius: 15px;
`;

const UserProfile = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin-top: 130px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.8);
  background-color: #fff;

  @media (max-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    width: 150px;
    font-size: 15px;
  }
`;

const ImageInput = styled.img`
  background-color: #fff;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  cursor: pointer;

  @media (max-width: 800px) {
    width: 150px;
    height: 150px;
  }
`;

const Name = styled.h1`
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 20px;
  text-align: center;
  @media (max-width: 800px) {
    font-size: 23px;
    font-weight: 600;
    border-bottom: 1px solid black;
  }
`;

const Input = styled.input`
  width: 250px;
  height: 50px;
  border-radius: 5px;

  outline: none;
  padding-left: 10px;
  color: #000000;
  margin: 10px 5px;

  @media (max-width: 800px) {
    height: 40px;
    width: 290px;
    font-size: 13px;
  }
`;

const SubmitBtn = styled.button`
  background-color: rgb(97, 117, 119);
  color: #ffffff;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  margin: 10px;
  align-content: flex-start;

  @media (max-width: 800px) {
    height: 40px;
    width: 190px;
    font-size: 13px;
  }
`;

const Mypage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: userData, isLoading: userLoading } = useUserQuery.useGetUser(
    Number(userId) ?? null
  );

  const { mutate: editUser } = useMutation(useUserQuery.editUser);

  const { mutate: uploadImage } = useMutation(
    useCalendarMutation.useUploadImage
  );

  const [image, setImage] = useState(userData?.user?.img ?? "");
  console.log("image :", userData, userLoading);

  const { register, handleSubmit } = useForm();

  const userEdit = (data) => {
    const formData = { ...data, img: image };
    console.log("formData :", formData);

    editUser(
      { userId, formData },
      {
        onSuccess: (data) => {
          if (data?.data?.isSuccess === true) {
            alert("수정되었습니다.");
          } else {
            alert("수정에 실패하였습니다.");
          }
        },
      }
    );
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

  return (
    <RootContainer>
      <UserProfileWrapper onSubmit={handleSubmit(userEdit)}>
        <input
          id="img_upload"
          className="hidden"
          onInput={handleImage}
          accept=".jpg, .png, .bmp, .gif, .svg, .webp"
          type="file"
        />{" "}
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
          {...register("name")}
          placeholder={"이름"}
          defaultValue={userData?.user?.name}
        />
        <SubmitBtn>수정</SubmitBtn>
      </UserProfileWrapper>
    </RootContainer>
  );
};

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const queryClient = new QueryClient();

  await router.run(req, res);
  const userId = req?.user?.id ?? null;

  await queryClient.prefetchQuery(["USER", userId], () => {
    return useUserQuery.getUser(userId, process.env.AXIOS_AUTHORIZATION_SECRET);
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

export default Mypage;
