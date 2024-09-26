"use client";

import Image from "next/image";
import React from "react";
import Logo from "@/public/assets/logo.png";
import { GradientBtn } from "..";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  return (
    <div className="w-[80%] mx-auto flex justify-center gap-6 lg:justify-between flex-wrap pb-10">
      <Image alt="logo" src={Logo} height={1} width={150} />
      <div className="flex gap-2 lg:gap-5">
        <GradientBtn title={"Dashboard"} />
        <GradientBtn
          onClick={() => {
            router.push("/login");
          }}
          title={"Login"}
        />
      </div>
    </div>
  );
};
