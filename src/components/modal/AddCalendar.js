import styled from "styled-components";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import useCalendarMutation from "@/Queries/useCalendarMutation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuthContext } from "@/Providers/AuthProvider";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  height: 620px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: #ffffff;
  border-radius: 30px;
  padding: 30px 0;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  border-radius: 10px;
  background-color: rgba(188, 188, 208, 0.5);
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
`;

const NavItem = styled.div`
  margin: 0 10px;
  cursor: pointer;
  border-bottom: 2px solid rgba(68, 68, 105, 0.5);
`;

const AddCalendarModal = ({ onClose }) => {
  const router = useRouter();
  const [formSelect, setFormSelect] = useState("create");
  const useAuth = useAuthContext();
  const { mutate: createCalendar } = useMutation(
    useCalendarMutation.createCalendar
  );
  const { mutate: getInvtedCalendar } = useMutation(
    useCalendarMutation.getInvtedCalendar
  );

  const { register, handleSubmit } = useForm();

  const { register: inviteRegister, handleSubmit: inviteHandleSubmit } =
    useForm();

  const onSubmit = (data) => {
    createCalendar(data.name, {
      onSuccess: (data) => {
        if (data?.data?.isSuccess === true) {
          alert("달력이 생성되었습니다.");
          router.reload();
        } else {
          alert(data?.data?.message ?? "달력 생성에 실패하였습니다.");
        }
      },
    });
  };

  const onInviteSubmit = (data) => {
    getInvtedCalendar(
      { code: data.code, userId: useAuth?.user?.id },
      {
        onSuccess: (data) => {
          if (data?.data?.isSuccess === true) {
            alert("달력에 참가하였습니다.");
            router.reload();
          } else {
            alert(data?.data?.message ?? "달력 참가에 실패하였습니다.");
          }
        },
      }
    );
  };

  const formChancher = (form) => {
    setFormSelect(form);
  };

  return (
    <Backdrop>
      <CreateContainer>
        <Header>
          <Nav>
            <NavItem onClick={() => formChancher("create")}>달력 생성</NavItem>
            <NavItem onClick={() => formChancher("invite")}>
              달력 참가하기
            </NavItem>
          </Nav>
          <img src={"/exit.png"} width={25} height={25} onClick={onClose}></img>
        </Header>
        {formSelect === "create" ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormContainer
              className={
                'flex flex-col space-y-5 "w-full" justify-center content-center items-center mt-40'
              }
            >
              {" "}
              <Input
                className={"w-80 rounded text-black"}
                {...register("name", { required: true })}
                type="text"
                placeholder="달력 이름"
              />
              <SubmitBtn
                className={"bg-blue-50 px-3 py-1 rounded-2xl text-black"}
              >
                생성
              </SubmitBtn>
            </FormContainer>
          </form>
        ) : formSelect === "invite" ? (
          <form onSubmit={inviteHandleSubmit(onInviteSubmit)}>
            <FormContainer
              className={
                'flex flex-col space-y-5 "w-full" justify-center content-center items-center mt-40'
              }
            >
              {" "}
              <Input
                className={"w-80 rounded text-black"}
                {...inviteRegister("code", { required: true })}
                type="text"
                placeholder="초대코드"
              />
              <SubmitBtn
                className={"bg-blue-50 px-3 py-1 rounded-2xl text-black"}
              >
                참가하기
              </SubmitBtn>
            </FormContainer>
          </form>
        ) : null}
      </CreateContainer>
      {/*<ContentContainer>
        <Input></Input>
      </ContentContainer>*/}
    </Backdrop>
  );
};

export default AddCalendarModal;
