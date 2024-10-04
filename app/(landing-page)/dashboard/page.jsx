"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import DashboardBorder from "@/public/assets/dashboard-border.png";
import { get } from "@/utils/api";
import {
  ChevronDown,
  ChevronUp,
  CirclePower,
  SquarePen,
  Trash2,
} from "lucide-react";
import { AddAdmin } from "@/components";
import { useRouter } from "next/navigation";
import EditAdminModal from "@/components/admin/EditAdminModal";
import AllAdmins from "./totalAdmins";
import TotalCollections from "./totalCollections";
import Totalquizes from "./totalquizes";

export default function Dashboard() {
  const [pageData, setPageData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("Total Admins");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  const router = useRouter();

  const buttonLabels = [
    "Total Admins",
    "Total Collections",
    "Total Quizzes",
    "Total Games",
    "Total Mini Games",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get("/api/v1/admins");
        setPageData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleButtonClick = (label) => {
    setSelectedButton(label);
    // Add logic for fetching filtered data for each tab here
    if (label === "Total Admins") {
      // Fetch and set admins data
    } else if (label === "Total Users") {
      // Fetch and set users data
    } else if (label === "Total Collections") {
      // Fetch and set collections data
    } else if (label === "Total Quizzes") {
      // Fetch and set quizzes data
    } else if (label === "Revenue Statistics") {
      // Fetch and set revenue statistics data
    }
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

  const handleEditClick = (admin) => {
    // Logic for editing the admin
    console.log("Edit admin:", admin);
  };

  const handleDeleteClick = (admin) => {
    // Logic for deleting the admin
    console.log("Delete admin:", admin);
  };

  // Utility function to calculate percentage
  const calculateUsedPercentage = (used, total) => {
    return (used / total) * 100;
  };

  // Utility function to format storage values
  const formatStorage = (sizeInMB) => {
    if (sizeInMB >= 1024) {
      const sizeInGB = (sizeInMB / 1024).toFixed(2);
      return `${sizeInGB} GB`;
    }
    return `${sizeInMB} MB`;
  };

  return (
    <div className="relative mx-auto w-[90%] lg:w-auto lg:my-3">
      <Image
        src={DashboardBorder}
        alt="border-image"
        className="h-[500px] lg:h-[600px] 2xl:w-[1800px] 2xl:h-[700px]"
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
        {selectedButton === "Total Admins" && <AllAdmins />}
        {selectedButton === "Total Collections" && <TotalCollections />}
        {selectedButton === "Total Quizzes" && <Totalquizes />}
      </div>
    </div>
  );
}
