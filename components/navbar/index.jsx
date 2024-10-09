"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import Logo from "@/public/assets/logo.png";
import { GradientBtn } from "..";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("kpobit_token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // Add event listener to listen to changes in localStorage
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("kpobit_token");
      if (updatedToken) {
        setIsLoggedIn(true);
        window.location.reload(); // Reload page after login
      } else {
        setIsLoggedIn(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const logOut = () => {
    localStorage.removeItem("kpobit_token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <div className="w-[80%] mx-auto flex justify-center gap-6 lg:justify-between flex-wrap pb-10">
      <Image alt="logo" src={Logo} height={1} width={150} />
      <div className="flex gap-2 lg:gap-5">
        {/* {!isLoggedIn && (
          <GradientBtn
            onClick={() => {
              router.push("/");
            }}
            title={"Login"}
          />
        )} */}

        {isLoggedIn && (
          <GradientBtn onClick={logOut} title={"Logout"} />
        )}
      </div>
    </div>
  );
};
