"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { post } from "@/utils/api";
import { setCookie } from "cookies-next";
import {
  IS_LOGGED_IN,
  REMEMBER_ME,
  USER_DATA,
  USER_TOKEN,
} from "@/components/constants/constants";
import LoginBorder from "@/public/assets/login-border.png";
import ButtonBorder from "@/public/assets/button-border.png";

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
      if (response.success) {
        localStorage.setItem(USER_DATA, JSON.stringify(response.data));
        localStorage.setItem(USER_TOKEN, response.data.token);
        setCookie(IS_LOGGED_IN, true);
        if (rememberMe)
          setCookie(REMEMBER_ME, true, { maxAge: 30 * 24 * 60 * 60 });
        else localStorage.removeItem(REMEMBER_ME);
        Swal.fire("Success!", "Login successful!", "success");
        router.push(
          response.data.user_type === 1 ? "/dashboard" : "/landing-page"
        );
      } else {
        Swal.fire("Error!", response.message || "Login failed.", "error");
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.message || "An error occurred.",
        "error"
      );
    }
  };

  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Forgot Password?",
      input: "email",
      inputLabel: "Enter your email",
      inputPlaceholder: "you@example.com",
      showCancelButton: true,
    });

    if (email) {
      try {
        const response = await post("/api/forgot-password-code", { email });
        if (response.success) {
          await Swal.fire(
            "Success!",
            "A one-time code has been sent to your email.",
            "success"
          );
          handleVerifyCode(email);
        } else {
          Swal.fire(
            "Error!",
            response.message || "Email does not exist.",
            "error"
          );
        }
      } catch (error) {
        Swal.fire(
          "Error!",
          "An error occurred while sending the code.",
          "error"
        );
      }
    }
  };

  const handleVerifyCode = async (email) => {
    const { value: formData } = await Swal.fire({
      title: "Reset Password",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Enter OTP" autocomplete="off">' +
        '<input id="swal-input2" type="password" class="swal2-input" placeholder="New Password" autocomplete="new-password">' +
        '<input id="swal-input3" type="password" class="swal2-input" placeholder="Confirm Password" autocomplete="new-password">',
      focusConfirm: false,
      showCancelButton: true,
      allowOutsideClick: false,
      preConfirm: () => {
        return {
          email: email,
          reset_code: document.getElementById("swal-input1").value,
          password: document.getElementById("swal-input2").value,
          password_confirmation: document.getElementById("swal-input3").value,
        };
      },
    });
    console.log("formData", formData);

    if (formData) {
      if (formData.newPassword !== formData.confirmPassword) {
        Swal.fire("Error!", "Passwords do not match.", "error");
        return;
      }
      try {
        const response = await post("/api/verify-reset-code", formData);
        console.log("response", response);
        if (response.success) {
          Swal.fire("Success!", "Password reset successfully.", "success");
        } else {
          Swal.fire("Error!", response.message || "Invalid code.", "error");
        }
      } catch (error) {
        console.log("error", error);
        const errorData = error.response?.data.data;
        let errorMessages = errorData
          ? Object.values(errorData).flat().join("\n") // Combine all error messages
          : error.response?.data.message || "An error occurred.";

        Swal.fire("Error!", errorMessages, "error");
      }
    }
  };

  return (
    <div className='w-full lg:w-[80%] mx-auto flex flex-col gap-10 pb-10'>
      <div className='font-extrabold text-4xl lg:text-[80px] text-center'>
        Login
      </div>
      <div className='relative w-[90%] lg:w-[50%] mx-auto'>
        <Image
          src={LoginBorder}
          alt='login-border'
          className='w-full h-[350px]'
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='absolute inset-0 flex flex-col gap-3 lg:gap-5 justify-center items-center p-4'>
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
          <div
            className='text-white text-sm cursor-pointer'
            onClick={handleForgotPassword}>
            Forgot Password?
          </div>
        </form>
      </div>
    </div>
  );
}
