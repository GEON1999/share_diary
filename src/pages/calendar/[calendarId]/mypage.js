import styled from "styled-components";
import { useAuthContext } from "@/Providers/AuthProvider";
import useCalendarQuery from "@/Queries/useCalendarQuery";
import { useRouter } from "next/router";
import useCalendarMutation from "@/Queries/useCalendarMutation";
import { dehydrate, QueryClient, useMutation } from "@tanstack/react-query";
import CalendarNav from "@/components/common/CalendarNav";
import { useForm } from "react-hook-form";
import router from "../../../../libs/server/router";
import helper from "@/helper";

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

  @media (max-width: 600px) {
    margin-top: 10px;
    height: 600px;
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

  @media (max-width: 600px) {
    padding: 20px 0;
    height: 510px;
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

  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
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

const ImageInput = styled.div`
  background-color: rgba(192, 194, 213, 0.93);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 10px;

  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

const EtcWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 180px;
  justify-content: center;
  align-items: center;
  background-color: rgba(59, 59, 59, 0.3);
  border-radius: 30px;

  @media (max-width: 600px) {
    padding: 20px 0;
    height: 150px;
    width: 340px;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 23px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    background: rgba(201, 190, 190, 0.9);
    padding: 2px 4px 2px 4px;
    border-radius: 5px;
  }
`;

const Mypage = () => {
  const router = useRouter();
  const { calendarId } = router.query;
  const useAuth = useAuthContext();
  const userId = useAuth?.user?.id;

  const { data: inviteCode, isLoading } =
    useCalendarQuery.useGetCalendarInviteCode(calendarId, userId);
  const code = inviteCode?.inviteCode?.code;

  const { data: userInfo, refetch } = useCalendarQuery.useGetCalendarUserInfo(
    calendarId,
    userId
  );

  const { mutate: createInviteCode } = useMutation(
    useCalendarMutation.createCalendarInvite
  );

  const { mutate: deleteInviteCode } = useMutation(
    useCalendarMutation.deleteCalendarInvite
  );

  const { mutate: editUserInfo } = useMutation(
    useCalendarMutation.editCalendarUserInfo
  );

  const { register, handleSubmit } = useForm();

  const handleCreateInviteCode = async () => {
    createInviteCode(
      { calendarId, userId },
      {
        onSuccess: (data) => {
          if (data?.data?.isSuccess === true) {
            alert("초대 코드가 생성되었습니다.");
            router.reload();
          } else {
            alert(data?.data?.message ?? "초대 코드 생성에 실패하였습니다.");
          }
        },
      }
    );
  };

  const handleDeleteInviteCode = async () => {
    deleteInviteCode(
      { calendarId, userId },
      {
        onSuccess: (data) => {
          if (data?.data?.isSuccess === true) {
            alert("초대 코드가 삭제되었습니다.");
            router.reload();
          } else {
            alert(data?.data?.message ?? "초대 코드 삭제에 실패하였습니다.");
          }
        },
      }
    );
  };

  const copyToClipboard = (e) => {
    const textToCopy = e.target.value;

    if (window.location.protocol === "https:" && navigator.clipboard) {
      // https 에서만 가능
      navigator.clipboard.writeText(textToCopy);
    } else {
      // 구형 브라우저 대응
      const textField = document.createElement("textarea");
      textField.innerText = textToCopy;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
    }

    alert("초대코드가 복사되었습니다.");
  };

  const editUserProfile = (formData) => {
    if (!formData.name) {
      alert("이름을 입력해주세요.");
      return;
    }
    editUserInfo(
      { calendarId, formData },
      {
        onSuccess: (data) => {
          if (data?.data?.isSuccess === true) {
            alert("회원정보가 수정되었습니다.");
            refetch();
          } else {
            alert(data?.data?.message ?? "회원정보 수정에 실패하였습니다.");
          }
        },
      }
    );
  };

  return (
    <>
      <CalendarNav />
      <MypageContainer>
        <EditWrapper>
          <Title>`{userInfo?.calendar?.name ?? ""}` 달력 프로필</Title>
          <Form onSubmit={handleSubmit(editUserProfile)}>
            <ImageContainer>
              <ImageInput />
              <ImageEditBtn type="button">사진 수정</ImageEditBtn>
            </ImageContainer>
            <ItemContainer>
              <Input
                placeholder="이름"
                defaultValue={userInfo?.userProfile?.name ?? ""}
                {...register("name")}
              />
              <SubmitBtn type="submit">회원정보 수정</SubmitBtn>
            </ItemContainer>
          </Form>
        </EditWrapper>
        <EtcWrapper>
          <InputLabel>초대 코드</InputLabel>
          <InputBox>
            {isLoading ? null : (
              <InviteInput
                onClick={(e) => copyToClipboard(e)}
                type="text"
                readOnly
                placeholder="초대 코드"
                value={code}
              />
            )}
            <InviteBtn type="button" onClick={handleCreateInviteCode}>
              초대코드 생성
            </InviteBtn>
            <InviteBtn type="button" onClick={handleDeleteInviteCode}>
              초대코드 삭제
            </InviteBtn>
          </InputBox>
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
  const { calendarId } = query;

  await queryClient.prefetchQuery();

  await queryClient.prefetchQuery(
    ["CALENDAR_INVITE_CODE", calendarId ?? null, userId],
    () => {
      return useCalendarQuery.getCalendarInviteCode(
        calendarId ?? null,
        userId,
        process.env.AXIOS_AUTHORIZATION_SECRET
      );
    }
  );

  await queryClient.prefetchQuery(
    ["CALENDAR_USER_INFO", calendarId ?? null, userId],
    () => {
      return useCalendarQuery.getCalendarUserInfo(
        calendarId ?? null,
        userId,
        process.env.AXIOS_AUTHORIZATION_SECRET
      );
    }
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Mypage;
