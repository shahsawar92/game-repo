"use client";

import React from "react";
import Image from "next/image";
import GradientBorder from "@/public/assets/gradient-border.png";

export const GradientBtn = ({ title, onClick }) => {
  return (
    <div onClick={onClick} className="relative hover:cursor-pointer">
      <Image
        alt="gradient border"
        src={GradientBorder}
        height={1}
        width={250}
      />
      <div className="absolute text-xs lg:text-xl h-full w-full bg-inherit flex justify-center items-center top-0">
        {title}
      </div>
    </div>
  );
};
