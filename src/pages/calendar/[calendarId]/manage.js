import { useRouter } from "next/router";
import { useAuthContext } from "@/Providers/AuthProvider";
import useCalendarQuery from "@/Queries/useCalendarQuery";
import helper from "@/helper";
import { dehydrate, QueryClient, useMutation } from "@tanstack/react-query";
import router from "../../../../libs/server/router";
import styled from "styled-components";
import CalendarNav from "@/components/common/CalendarNav";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useCalendarMutation from "@/Queries/useCalendarMutation";

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  height: 800px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 30px;

  @media (max-width: 800px) {
    margin-top: 10px;
    height: 500px;
    width: 340px;
  }
`;

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 550px;
  justify-content: center;
  align-items: center;
  background-color: rgba(59, 59, 59, 0.3);
  border-radius: 30px;
  margin-bottom: 10px;

  @media (max-width: 800px) {
    padding: 5px 0;
    height: 320px;
    width: 340px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputBox = styled.div`
  display: flex;
`;

const Input = styled.input`
  width: 250px;
  height: 50px;
  border-radius: 10px;
  border-bottom: 1px solid #000000;
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

const InviteInput = styled.input`
  width: 250px;
  height: 50px;
  border-radius: 10px;
  border-bottom: 1px solid #000000;
  outline: none;
  padding-left: 10px;
  color: #000000;
  margin: 10px 5px;
  background-color: rgba(238, 238, 241, 0.93);
  cursor: pointer;

  @media (max-width: 800px) {
    height: 40px;
    width: 100px;
    font-size: 13px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageInput = styled.img`
  background-color: rgba(192, 194, 213, 0.93);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 10px;
  cursor: pointer;

  @media (max-width: 800px) {
    width: 130px;
    height: 130px;
  }
`;

const ImageEditBtn = styled.button`
  background-color: rgba(93, 111, 176, 0.5);
  color: #ffffff;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  margin: 10px;
  align-content: flex-start;

  @media (max-width: 800px) {
    height: 40px;
    width: 190px;
    font-size: 13px;
  }
`;

const SubmitBtn = styled.button`
  background-color: rgba(93, 111, 176, 0.5);
  color: #ffffff;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  margin: 10px;
  align-content: flex-start;

  @media (max-width: 800px) {
    height: 40px;
    width: 190px;
    font-size: 13px;
  }
`;

const InviteBtn = styled.button`
  background-color: rgba(93, 111, 176, 0.5);
  color: #ffffff;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  margin: 10px;
  align-content: flex-start;

  @media (max-width: 800px) {
    height: 40px;
    width: 90px;
    font-size: 13px;
  }
`;

const InputLabel = styled.label`
  font-size: 15px;
  font-weight: bold;
  margin: 10px;
  color: #ffffff;

  @media (max-width: 800px) {
    font-size: 13px;
  }
`;

const EtcWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 280px;
  justify-content: center;
  align-items: center;
  background-color: rgba(59, 59, 59, 0.3);
  border-radius: 30px;

  @media (max-width: 800px) {
    padding: 10px 0;
    height: 190px;
    width: 340px;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 23px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 800px) {
    font-size: 18px;
    font-weight: 700;
    margin-top: 5px;
    margin-bottom: 3px;
    background: rgba(201, 190, 190, 0.9);
    padding: 2px 4px 2px 4px;
    border-radius: 5px;
  }
`;

const UserWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const User = styled.div`
  width: 400px;
  margin: 10px 0 10px 0;
  padding: 20px 0 20px 0;
  border: 1px solid rgba(255, 255, 255, 0);
  color: rgba(0, 0, 0, 0.8);
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background-color: #5d6fb0;
    color: #fff;
  }
  @media (max-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 200px;
    font-size: 15px;
  }
`;
const DeleteBtn = styled.button`
  width: 100px;
  height: 70px;
  border-radius: 10px;
  color: #ffffff;
  background-color: #bd3232;
  margin-left: 5px;

  @media (max-width: 800px) {
    width: 60px;
    height: 40px;
    font-size: 15px;
  }
`;

const Manage = () => {
  const router = useRouter();
  const { query } = router;
  const { calendarId, date } = query;

  const useAuth = useAuthContext();
  const { data: calendarData, isLoading: isCalendarLoading } =
    useCalendarQuery.useGetCalendarDetail(
      calendarId ?? null,
      helper.queryToString({ userId: useAuth?.user?.id })
    );

  const { data: calendarRole } = useCalendarQuery.useGetCalendarPermission(
    calendarId,
    useAuth?.user?.id
  );

  const { data: calendarUser, isLoading } =
    useCalendarQuery.useGetCalendarPermissionList(calendarId);

  console.log(
    "calendarData :",
    calendarData,
    calendarRole,
    calendarUser,
    isCalendarLoading,
    isLoading
  );

  const [image, setImage] = useState(calendarData?.calendar?.img ?? "");

  const userRole = calendarRole?.permission?.role;

  if (userRole !== "OWNER") {
    return null;
  }

  const { mutate: editCalendar } = useMutation(
    useCalendarMutation.editCalendarDetail
  );

  const { mutate: uploadImage } = useMutation(
    useCalendarMutation.useUploadImage
  );

  const { register, handleSubmit } = useForm();

  const editCalendarProfile = (data) => {
    const formData = { ...data, img: image };
    console.log("formData :", formData);

    editCalendar(
      { calendarId, formData },
      {
        onSuccess: (data) => {
          if (data?.data?.isSuccess === true) {
            alert("달력 정보가 수정되었습니다.");
            router.reload();
          } else {
            alert("달력 정보 수정에 실패했습니다.");
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
    <>
      <CalendarNav userRole={userRole} />
      <MypageContainer>
        <EditWrapper>
          <Title>달력 프로필</Title>
          <Form onSubmit={handleSubmit(editCalendarProfile)}>
            <ImageContainer>
              <input
                id="img_upload"
                className="hidden"
                onInput={handleImage}
                accept=".jpg, .png, .bmp, .gif, .svg, .webp"
                type="file"
              />
              <ImageInput src={image ? image : ""} onClick={handleImageBtn} />
            </ImageContainer>
            <ItemContainer>
              <Input
                defaultValue={calendarData?.calendar?.name ?? ""}
                {...register("name")}
                placeholder="이름"
              />
              <SubmitBtn type="submit">달력 정보 수정</SubmitBtn>
            </ItemContainer>
          </Form>
        </EditWrapper>
        <EtcWrapper>
          <Title>유저 리스트</Title>
          {calendarUser?.permissions?.map((user) => {
            return (
              <UserWrapper key={user?.id}>
                <User>
                  {user?.user?.name} / {user?.role}
                </User>
                <DeleteBtn>삭제</DeleteBtn>
              </UserWrapper>
            );
          })}
        </EtcWrapper>
      </MypageContainer>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const { req, res, query } = ctx;
  const queryClient = new QueryClient();

  await router.run(req, res);
  const userId = req.user?.id ?? null;
  const { date, calendarId } = query;

  const calendarQuery = helper.queryToString({ userId });

  await queryClient.prefetchQuery(
    ["CALENDAR_DETAIL", calendarId ?? null, calendarQuery],
    () => {
      return useCalendarQuery.getCalendarDetail(
        calendarId ?? null,
        calendarQuery,
        process.env.AXIOS_AUTHORIZATION_SECRET
      );
    }
  );

  await queryClient.prefetchQuery(
    ["GET_CALENDAR_PERMISSION", calendarId, userId],
    () => {
      return useCalendarQuery.getCalendarPermission(
        calendarId,
        userId,
        process.env.AXIOS_AUTHORIZATION_SECRET
      );
    }
  );

  await queryClient.prefetchQuery(
    ["GET_CALENDAR_PERMISSION_LIST", calendarId],
    () => {
      return useCalendarQuery.getCalendarPermissionList(
        calendarId,
        process.env.AXIOS_AUTHORIZATION_SECRET
      );
    }
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Manage;
