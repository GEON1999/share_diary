import useUserQuery from "@/Query/useUserQuery";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Join = () => {
  const router = useRouter();
  const { mutate, data } = useMutation(useUserQuery.joinUser);
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (data) => {
    if (data.pw !== data.pwConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    mutate(data);
  };

  useEffect(() => {
    if (data?.data?.isSuccess === true) {
      router.push("/calendar");
    }
  }, [data]);

  console.log("data", data);

  /*const handleKaKaoLogin = ()  => {
          config.kakao.Auth.authorize({
              redirectUri: 'http://localhost:3000/kakao',
          });
      }*/

  return (
    <div className={"w-full p-20"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={
            'flex flex-col space-y-5 "w-full" justify-center content-center items-center mt-40'
          }
        >
          {" "}
          <input
            className={"w-80 rounded text-black"}
            {...register("id", { required: true })}
            type="text"
            placeholder="아이디"
          />
          <input
            className={"w-80 rounded text-black"}
            {...register("pw", { required: true })}
            type="password"
            placeholder="비밀번호"
          />
          <input
            className={"w-80 rounded text-black"}
            {...register("pwConfirm", { required: true })}
            type="password"
            placeholder="비밀번호 재확인"
          />
          <button className={"bg-blue-50 px-3 py-1 rounded-2xl text-black"}>
            join
          </button>
        </div>
      </form>
    </div>
  );
};

export default Join;
