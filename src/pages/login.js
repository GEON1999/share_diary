import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useUserQuery from "@/Queries/useUserQuery";
import { useRouter } from "next/router";
import { useAuthContext } from "@/Providers/AuthProvider";
import {
  Wrapper,
  Title,
  Input,
  FormContainer,
  MidnightBlueBtn,
  SlateBlue,
} from "@/styles/GlobalStyles";

const Login = () => {
  const router = useRouter();
  const useAuth = useAuthContext();
  const {
    mutate,
    data: postData,
    isSuccess,
  } = useMutation(useUserQuery.loginUser);

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (data) => {
    if (data.name === "" || data.password === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    await useAuth.login(data.username, data.password);
    /*if (resultData.success) {
      router.push("/");
    } else {
      alert(resultData?.msg);
    }*/
  };

  /*const handleKaKaoLogin = ()  => {
        config.kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/kakao',
        });
    }*/

  const handleJoin = () => router.push("/join");

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <Title>로그인</Title>{" "}
          <Input
            inputColor="red"
            type={"text"}
            placeholder={"아이디"}
            {...register("username", { required: true })}
          />
          <Input
            type={"password"}
            placeholder={"비밀번호"}
            {...register("password", { required: true })}
          />
          <MidnightBlueBtn size={"l"} type={"submit"}>
            로그인
          </MidnightBlueBtn>
          <SlateBlue size={"l"} type={"button"} onClick={handleJoin}>
            회원가입
          </SlateBlue>
        </FormContainer>
      </form>
    </Wrapper>
  );
};

Login.layout = "login";
Login.notAuthPage = true;

export default Login;
