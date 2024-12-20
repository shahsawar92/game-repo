"use client";

import Image from "next/image";
import React from "react";
import Logo from "@/public/assets/logo.png";
import { GradientBtn } from "..";
import { usePathname, useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import {
  IS_LOGGED_IN,
  REMEMBER_ME,
  USER_DATA,
  USER_TOKEN,
} from "../constants/constants";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/";
  console.log("pathname: ", pathname);
  return (
    <div className='w-[80%] mx-auto flex justify-center gap-6 lg:justify-between flex-wrap pb-10'>
      <Image alt='logo' src={Logo} height={1} width={150} />
      <div className='flex gap-2 lg:gap-5'>
        {!isLoginPage && (
          <GradientBtn
            onClick={() => {
              setCookie(REMEMBER_ME, false);
              localStorage.removeItem(REMEMBER_ME);
              localStorage.removeItem(USER_TOKEN);
              localStorage.removeItem(USER_DATA);
              setCookie(IS_LOGGED_IN, false);
              console.log("redirecting...");
              router.push("/");
            }}
            title={"Logout"}
          />
        )}
      </div>
    </div>
  );
};
