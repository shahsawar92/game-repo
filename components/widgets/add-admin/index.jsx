"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonBorder from "@/public/assets/button-border.png";
import Image from "next/image";
import HeroAdmin from "@/public/assets/hero-admin.png";
import { post } from "@/utils/api";
import Swal from "sweetalert2";

// Define schema with Zod
const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Path to the field where the error should be shown
  });

export const AddAdmin = ({onSubmit:submissionComplete}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
  try{
      // Make the POST request to your API endpoint
      const response = await post('/api/v1/admins', data);
     
        Swal.fire({
          icon: 'success',
          title: 'Admin added successfully',
          text: response.data.message,
        });   
      submissionComplete();
      
  } catch(error){
    console.log('error is:',error?.response?.data?.message);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error?.response?.data?.message,
    });
  }
  };

  return (
    <div className="w-[95%] bg-[#00000020] shadow shadow-[#00000089] rounded-2xl mx-auto lg:flex flex-col lg:gap-10">
      <div className="relative flex w-[90%] justify-between mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:w-[70%] flex flex-col gap-2 lg:gap-10 justify-center items-center p-4"
        >
          <div className="flex flex-col gap-2 lg:gap-3 w-full">
            <input
              id="name"
              type="text"
              placeholder="Name"
              {...register("name")}
              className="border border-transparent border-b-white focus:outline-none outline-none bg-transparent text-xs lg:text-xl w-full lg:w-[100%] mx-auto p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
              className="border border-transparent border-b-white focus:outline-none outline-none bg-transparent text-xs lg:text-xl w-full lg:w-[100%] mx-auto p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
              className="border border-transparent border-b-white focus:outline-none outline-none bg-transparent text-xs lg:text-xl w-full lg:w-[100%] mx-auto p-2"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="border border-transparent border-b-white focus:outline-none outline-none bg-transparent text-xs lg:text-xl w-full lg:w-[100%] mx-auto p-2"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="self-end text-center rounded-md tracking-tighter bg-[#7209B7] px-10 py-2 text-xs lg:text-xl cursor-pointer"
          >
            Add Admin
          </button>
        </form>
        <div className="relative w-[50%] hidden lg:block">
          <Image alt="hero-admin" src={HeroAdmin} className="w-full" />
        </div>
      </div>
    </div>
  );
};
