"use client";

import React, { useEffect, useState } from "react";
import LoginBorder from "@/public/assets/login-border.png";
import Image from "next/image";
import { set, useForm } from "react-hook-form";
import ButtonBorder from "@/public/assets/button-border.png";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { post } from "@/utils/api";
import { setCookie } from "cookies-next"; // Client-side cookie setting
import {
  IS_LOGGED_IN,
  REMEMBER_ME,
  USER_DATA,
  USER_TOKEN,
} from "@/components/constants/constants";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await post("/api/login", data);
      console.log("Response: ", response);
      if (response.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem(USER_DATA, JSON.stringify(response.data));
          localStorage.setItem(USER_TOKEN, response.data.token);
          setCookie(IS_LOGGED_IN, true);

          if (rememberMe) {
            localStorage.setItem(REMEMBER_ME, true);
            setCookie(REMEMBER_ME, true, { maxAge: 30 * 24 * 60 * 60 });
          } else {
            localStorage.setItem(USER_DATA, JSON.stringify(response.data));
            localStorage.setItem(USER_TOKEN, response.data.token);
            localStorage.removeItem(REMEMBER_ME);
            setCookie(REMEMBER_ME, false);
          }
        }

        Swal.fire("Success!", "Login successful!", "success");
        if (response.data.user_type === 1) {
          router.push("/dashboard");
        } else {
          router.push("/landing-page");
        }
      } else {
        Swal.fire("Error!", response.message || "Login failed.", "error");
      }
    } catch (error) {
      console.error("Error: ", error);
      Swal.fire(
        "Error!",
        error.response?.message || "An error occurred.",
        "error"
      );
    }
  };

  return (
    <div className='w-full lg:w-[80%] mx-auto flex flex-col gap-10 pb-10'>
      <div className='font-extrabold text-4xl lg:text-[80px] text-center leading-none px-[20px] lg:px-[250px] rowdies-font'>
        Login
      </div>
      <div className='relative w-[90%] lg:w-[50%] mx-auto'>
        <Image
          src={LoginBorder}
          alt='login-border'
          className='w-full lg:h-[350px]'
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='absolute inset-0 flex flex-col gap-5 lg:gap-10 justify-center items-center p-4'>
          <div className='flex flex-col gap-2 lg:gap-5 w-full'>
            <input
              id='email'
              type='email'
              placeholder='Email'
              {...register("email", { required: "Email is required" })}
              className='border border-transparent border-b-white focus:outline-none outline-none bg-transparent text-xs lg:text-xl w-full lg:w-[80%] mx-auto p-2'
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email.message}</p>
            )}
            <input
              id='password'
              type='password'
              placeholder='Password'
              {...register("password", { required: "Password is required" })}
              className='border border-transparent border-b-white focus:outline-none outline-none bg-transparent text-xs lg:text-xl w-full lg:w-[80%] mx-auto p-2'
            />
            {errors.password && (
              <p className='text-red-500 text-sm'>{errors.password.message}</p>
            )}
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='rememberMe'
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor='rememberMe' className='text-white text-sm'>
              Remember Me
            </label>
          </div>
          <button type='submit' className='relative w-full'>
            <Image
              src={ButtonBorder}
              alt='border-img'
              className='lg:w-[50%] 2xl:w-[40%] mx-auto'
            />
          </button>
        </form>
      </div>
    </div>
  );
}
