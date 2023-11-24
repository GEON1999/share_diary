import styled from "styled-components";

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: 1000px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: rgba(59, 59, 59, 0.5);
  border-radius: 30px;
`;

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 500px;
  justify-content: center;
  align-items: center;
  background-color: rgba(59, 59, 59, 0.3);
  border-radius: 30px;
`;

const Form = styled.form`
  display: flex;
`;

const ItemContainer = styled.form`
  display: flex;
  align-items: flex-end;
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 250px;
  height: 50px;
  border-radius: 10px;
  border-bottom: 1px solid #000000;
  outline: none;
  padding-left: 10px;
  color: #000000;
  margin: 10px 0px;
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

const InviteBtn = styled.button``;

const Mypage = () => {
  return (
    <MypageContainer>
      <EditWrapper>
        <Form>
          <ImageContainer>
            <ImageInput />
            <ImageEditBtn>사진 수정</ImageEditBtn>
          </ImageContainer>
          <ItemContainer>
            <InputContainer>
              <Input type="text" placeholder="아이디" />
              <Input type="password" placeholder="비밀번호" />
              <Input type="password" placeholder="비밀번호 확인" />
              <Input type="text" placeholder="이름" />
              <Input type="text" placeholder="이메일" />
              <Input type="text" placeholder="전화번호" />
              <Input type="text" placeholder="생년월일" />
              <Input type="text" placeholder="성별" />
            </InputContainer>
            <SubmitBtn>회원정보 수정</SubmitBtn>
          </ItemContainer>
        </Form>
      </EditWrapper>
    </MypageContainer>
  );
};

export default Mypage;
