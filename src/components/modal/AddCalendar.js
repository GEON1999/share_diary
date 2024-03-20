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

  @media (max-width: 800px) {
    height: 470px;
    width: 340px;
    margin-right: 0px;
  }
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
  margin-top: 20px;

  @media (max-width: 800px) {
    height: 40px;
    width: 290px;
    font-size: 13px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  align-items: center;

  @media (max-width: 800px) {
    font-size: 13px;
  }
`;

const Nav = styled.nav`
  display: flex;
`;

const NavItem = styled.div`
  margin: 0 10px;
  cursor: pointer;
  padding: 4px 8px 4px 8px;
  border-radius: 6px;
  display: flex;

  &:hover {
    background-color: rgba(213, 212, 212, 0.9);
    transition: 0.5s;
  }

  &.active {
    background-color: rgba(164, 164, 190, 0.9);
    color: white;
    transition: 0.5s;
  }

  //border-bottom: 3px solid rgba(68, 68, 105, 0.5);
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
            <NavItem
              className={formSelect === "create" ? "active" : null}
              onClick={() => formChancher("create")}
            >
              달력 생성
            </NavItem>
            <NavItem
              className={formSelect === "invite" ? "active" : null}
              onClick={() => formChancher("invite")}
            >
              달력 참가하기
            </NavItem>
          </Nav>
          <button
            type="button"
            onClick={onClose}
            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
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
