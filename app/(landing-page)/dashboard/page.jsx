"use client";

import Image from "next/image";
import React, { useState } from "react";
import DashboardBorder from "@/public/assets/dashboard-border.png";
import {
  ChevronDown,
  ChevronUp,
  CirclePower,
  SquarePen,
  Trash2,
} from "lucide-react";
import { AddAdmin } from "@/components";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("Total Admins");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [showAddAdmin, setShowAddAdmin] = useState(false); // New state for showing AddAdmin component
  const router = useRouter();

  const buttonLabels = [
    "Total Admins",
    "Total Users",
    "Total Collections",
    "Total Quizzes",
    "Revenue Statistics",
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleButtonClick = (label) => {
    setSelectedButton(label);
  };

  const handleAccordionClick = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleAddAdminClick = () => {
    setShowAddAdmin(true);
  };

  const onAddAdmin = (data) => {
    setShowAddAdmin(false);
  };

  return (
    <div className="relative mx-auto w-[90%] lg:w-auto lg:my-3">
      <Image
        src={DashboardBorder}
        alt="border-image"
        className="h-[500px] lg:h-[600px]"
      />
      <div
        onClick={() => {
          router.push("/");
        }}
        className="z-20 absolute text-xs lg:text-lg items-center top-2 lg:top-5 flex gap-2 right-2 lg:right-5 cursor-pointer"
      >
        Logout <CirclePower />
      </div>
      <div className="flex flex-col gap-5 items-center inset-0 absolute justify-start p-5 lg:px-20 lg:py-10">
        <div className="hidden lg:flex justify-evenly flex-wrap gap-5">
          {buttonLabels.map((label, index) => (
            <div
              key={index}
              className={`${
                selectedButton === label
                  ? "button-gradient"
                  : "button-gradient-border"
              } flex justify-center w-[180px] h-[40px] cursor-pointer`}
              onClick={() => handleButtonClick(label)}
            >
              <div className="absolute self-center">{label}</div>
            </div>
          ))}
        </div>
        <div className="lg:hidden flex justify-center mt-5">
          <button
            onClick={toggleDropdown}
            className="button-gradient text-xs lg:text-lg flex justify-between items-center whitespace-nowrap relative"
          >
            {selectedButton}
            {isDropdownOpen ? (
              <ChevronUp className="ml-2" />
            ) : (
              <ChevronDown className="ml-2" />
            )}
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 mt-10 rounded shadow-lg bg-gradient-to-r from-[#7209b7] via-[#4361ee] to-[#f72585]">
              <ul>
                {buttonLabels.map((label, index) => (
                  <li
                    key={index}
                    className={`px-4 py-2 hover:bg-[#7209b7] cursor-pointer whitespace-nowrap ${
                      selectedButton === label ? "bg-[#7209b7]" : ""
                    }`}
                    onClick={() => {
                      handleButtonClick(label);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="h-px w-full lg:w-[90%] gradient-background"></div>
        {!showAddAdmin && (
          <div
            className="self-end flex items-center gap-2 rounded-md font-bold tracking-tighter bg-[#7209B7] px-4 py-2 text-xs lg:text-xl cursor-pointer"
            onClick={handleAddAdminClick}
          >
            <span className="text-md lg:text-3xl font-bold">+</span> Add Admin
          </div>
        )}
        {showAddAdmin ? (
          <AddAdmin onSubmit={onAddAdmin} />
        ) : (
          <div className="flex flex-col gap-3 w-full lg:h-[400px] overflow-y-scroll scrollbar-hide text-sm lg:text-md">
            {[...Array(10)].map((item, index) => {
              const isActive = activeAccordion === index;
              return (
                <div
                  key={index}
                  className="bg-[#d9d9d917] rounded-md p-2 lg:px-5 lg:py-5 flex flex-col lg:flex-row justify-between items-start lg:items-center"
                >
                  <div
                    className="flex w-full justify-between items-center cursor-pointer lg:w-1/2"
                    onClick={() => handleAccordionClick(index)}
                  >
                    <div className="flex gap-4 lg:justify-between w-full">
                      <div>{index + 1}.</div>
                      <div>Admin Name</div>
                      <div className="hidden lg:block">email1234@gmail.com</div>
                    </div>
                    <div className="ml-auto lg:hidden">
                      {isActive ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  </div>
                  <div
                    className={`w-full lg:w-1/2 flex-col lg:flex-row gap-3 justify-end items-center mt-3 lg:mt-0 transition-all ${
                      isActive ? "flex" : "hidden lg:flex"
                    }`}
                  >
                    <div className="flex flex-col items-start lg:flex-row lg:items-center lg:gap-3 w-full">
                      <div className="flex gap-3 w-full justify-between lg:justify-end">
                        <div
                          className={`block lg:hidden ${
                            isActive ? "block" : "hidden"
                          } lg:block`}
                        >
                          email1234@gmail.com
                        </div>
                        <div className="flex gap-3">
                          <SquarePen />
                          <Trash2 />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
