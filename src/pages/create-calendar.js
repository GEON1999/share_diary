import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import useCalendarQuery from "@/Query/useCalendarQuery";
import useCalendarMutation from "@/Query/useCalendarMutation";
import { useRouter } from "next/router";

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
  background-color: rgba(59, 59, 59, 0.5);
  border-radius: 30px;
  padding: 130px 0;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  border-radius: 10px;
  border-bottom: 1px solid #000000;
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

const CreateCalendar = () => {
  const router = useRouter();
  const { mutate: createCalendar } = useMutation(
    useCalendarMutation.createCalendar
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createCalendar(data.name, {
      onSuccess: (data) => {
        console.log("calendar post data :", data);
        if (data?.data?.isSuccess === true) {
          alert("달력이 생성되었습니다.");
          router.push("/");
        } else {
          alert("달력 생성에 실패하였습니다.");
        }
      },
    });
  };
  return (
    <CreateContainer>
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
          <SubmitBtn className={"bg-blue-50 px-3 py-1 rounded-2xl text-black"}>
            생성
          </SubmitBtn>
        </FormContainer>
      </form>
    </CreateContainer>
  );
};

export default CreateCalendar;
