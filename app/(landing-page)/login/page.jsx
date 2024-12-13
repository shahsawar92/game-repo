"use client";

import React from "react";
import LoginBorder from "@/public/assets/login-border.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import ButtonBorder from "@/public/assets/button-border.png";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie } from "cookies-next";
import Swal from "sweetalert2";
import { post } from "@/utils/api";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await post("/api/login", data);
      console.log("response: ", response);
      if (response.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("kpobit_token", response.data.token);
          localStorage.setItem("kpobit_user", JSON.stringify(response.data));
        }

        Swal.fire("Success!", "Login successful!", "success");
        // router.push("/dashboard");
      } else {
        Swal.fire("Error!", response.data.message || "Login failed.", "error");
      }
    } catch (error) {
      console.log("Error: ", error);

      Swal.fire(
        "Error!",
        error.response?.data?.message || "An error occurred.",
        "error"
      );
    }
  };

  return (
    <div className='w-full lg:w-[80%] mx-auto flex flex-col gap-10 pb-10'>
      <div className='font-extrabold text-4xl lg:text-[80px] text-center leading-none px-[20px] lg:px-[250px] rowdies-font'>
        Login ff
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
