import styled from "styled-components";
import { useAuthContext } from "@/Providers/AuthProvider";
import useCalendarQuery from "@/Query/useCalendarQuery";
import { useRouter } from "next/router";
import useCalendarMutation from "@/Query/useCalendarMutation";
import { useMutation } from "@tanstack/react-query";
import CalendarNav from "@/components/common/CalendarNav";

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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ItemContainer = styled.form`
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
`;

const ImageEditBtn = styled.button`
  background-color: rgba(93, 111, 176, 0.5);
  color: #ffffff;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  margin: 10px;
  align-content: flex-start;
`;

const SubmitBtn = styled.button`
  background-color: rgba(93, 111, 176, 0.5);
  color: #ffffff;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  margin: 10px;
  align-content: flex-start;
`;

const InviteBtn = styled.button`
  background-color: rgba(93, 111, 176, 0.5);
  color: #ffffff;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  margin: 10px;
  align-content: flex-start;
`;

const InputLabel = styled.label`
  font-size: 15px;
  font-weight: bold;
  margin: 10px;
  color: #ffffff;
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
`;

const Mypage = () => {
  const router = useRouter();
  const { calendarId } = router.query;
  const useAuth = useAuthContext();
  const userId = useAuth?.user?.id;

  const { data: inviteCode, isLoading } =
    useCalendarQuery.useGetCalendarInviteCode(calendarId, userId);
  const code = inviteCode?.inviteCode?.code;

  const { mutate: createInviteCode } = useMutation(
    useCalendarMutation.createCalendarInvite
  );

  const { mutate: deleteInviteCode } = useMutation(
    useCalendarMutation.deleteCalendarInvite
  );
  // get invite code
  // create invite code
  // delete invite code
  // edit user info

  const handleCreateInviteCode = async () => {
    console.log("userId :", userId);
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

  return (
    <>
      <CalendarNav />
      <MypageContainer>
        <EditWrapper>
          <Form>
            <ImageContainer>
              <ImageInput />
              <ImageEditBtn>사진 수정</ImageEditBtn>
            </ImageContainer>
            <ItemContainer>
              <InputContainer>
                <InputBox>
                  <Input type="text" placeholder="아이디" />
                  <Input type="password" placeholder="비밀번호" />
                  <Input type="password" placeholder="비밀번호 확인" />
                </InputBox>
                <InputBox>
                  <Input type="text" placeholder="이름" />
                  <Input type="text" placeholder="이메일" />
                  <Input type="text" placeholder="전화번호" />
                </InputBox>
                <InputBox>
                  {" "}
                  <Input type="text" placeholder="생년월일" />
                  <Input type="text" placeholder="성별" />
                </InputBox>
              </InputContainer>
              <SubmitBtn>회원정보 수정</SubmitBtn>
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
            <InviteBtn onClick={handleCreateInviteCode}>
              초대코드 생성
            </InviteBtn>
            <InviteBtn onClick={handleDeleteInviteCode}>
              초대코드 삭제
            </InviteBtn>
          </InputBox>
        </EtcWrapper>
      </MypageContainer>
    </>
  );
};

export default Mypage;
