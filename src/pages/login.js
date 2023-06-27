import {useForm} from "react-hook-form";
import { useMutation } from '@tanstack/react-query'
import axios from "axios";
import {useState} from "react";
import useUserQuery from "@/Query/useUserQuery";
import config from "tailwindcss/defaultConfig";

const Login = () => {
const {mutate} = useMutation(useUserQuery.loginUser)
const {handleSubmit, register, errors} = useForm();

   const onSubmit = async(data) => {
       mutate(data)
   }

    /*const handleKaKaoLogin = ()  => {
        config.kakao.Auth.authorize({
            redirectUri: 'http://localhost:3000/kakao',
        });
    }*/

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*<a onClick={handleKakaoLogin}>
                    <img
                        src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
                    />
                </a>*/}
               <input {...register('id',{required:true})} type="text" placeholder="아이디" />
                <input {...register('pw',{required:true})} type="password" placeholder="비밀번호" />
            <button>login</button>
            </form>
        </div>
    )
}

export default Login