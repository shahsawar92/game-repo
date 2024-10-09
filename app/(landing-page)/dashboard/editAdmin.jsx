"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { get, post } from "@/utils/api"; // Assuming you have a `post` method for sending data
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"; // Import useRouter

const EditAdmin = ({ admin }) => {
  const [pageData, setPageData] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(admin.storage_total); // Initialize with current storage total in GB
  const router = useRouter();


  useEffect(() => {
    const fetchData = async (admin) => {
      try {
        const data = await get(`/api/v1/listGamesWithAccess/${admin.id}`);
        setPageData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(admin);
  }, []);

  const calculateUsedPercentage = (used, total) => {
    return (used / total) * 100;
  };

  const formatStorage = (sizeInMB) => {
    if (sizeInMB >= 1024) {
      const sizeInGB = (sizeInMB / 1024).toFixed(2);
      return `${sizeInGB} GB`;
    }
    return `${sizeInMB} MB`;
  };

  // Function to handle checkbox change
  const handleCheckboxChange = async (gameId, access, name) => {
    try {
      // Update the data as required by the post body structure
      const response = await post(`api/v1/updateUserGameAccess/${admin.id}`, {
        data: [
          {
            name: name, // Game name
            access: !access, // Toggle the access status
          },
        ],
      });

      Swal.fire({
        icon: 'success',
        title: `${name} access updated successfully`,
        text: response.data.message,
      });

      // Update the local state after the API call is successful
      setPageData((prevData) => ({
        ...prevData,
        data: prevData.data.map((game) =>
          game.id === gameId ? { ...game, access: !game.access } : game
        ),
      }));
    } catch (err) {
      console.error("Error updating access:", err);
    }
  };

  // Function to handle storage selection change
  const handleStorageChange = async (e) => {
    const newStorage = parseInt(e.target.value) /1024; // Convert GB to MB
    setSelectedStorage(parseInt(e.target.value)); // Update state in GB

   
    // Post request to update the storage on the server
    try {
      const response = await post(`/api/v1/storage/${admin.id}`, {
        total: newStorage,
      });

      Swal.fire({
        icon: 'success',
        title: 'Storage updated successfully',
        text: response.data.message,
      });

      // Update local state to reflect the new storage total
      setPageData((prevData) => ({
        ...prevData,
        storage_total: newStorage,
      }));
    } catch (err) {
      console.error("Error updating storage:", err);
    }
  };


 
 
  return (
    <>  

      <div className="h-px w-full lg:w-[90%] gradient-background"></div>
      <div className="flex flex-col w-full bg-lightgray p-8 max-w-6xl scrollbar-hide overflow-y-auto h-screen">
        <div className="flex flex-col w-full max-w-3xl rounded-xl p-4 border-gradient bg-liteprpl">
          <div className="p-2 rounded-lg w-full max-w-md mt-7">
            <div className="flex justify-start gap-6 items-center mb-2">
              <span className="text-white font-semibold text-lg">Storage</span>
              <br />

              <div className="relative">
                <select
                  className="block cursor-pointer w-full appearance-none bg-gray-800 border border-teal-400 text-white py-1 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                  value={selectedStorage} // Set the selected value in GB
                  onChange={handleStorageChange} // Handle change event
                >
                  {Array.from({ length: 10 }, (_, index) => (
                    <option key={index} value={(index + 1)*1024}>
                      {index + 1} GB
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.58 7.58a1 1 0 011.4 0L10 10.59l3.02-3.02a1 1 0 111.4 1.42l-3.72 3.72a1 1 0 01-1.4 0L5.58 8.99a1 1 0 010-1.42z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{
                  width: `${calculateUsedPercentage(admin.storage_used, pageData?.storage_total || admin.storage_total)}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
              <span>
                {formatStorage(admin.storage_used.toFixed(2))} /{" "}
                {selectedStorage/1024} GB
              </span>
            </div>
          </div>
        </div>

        <h1 className="flex text-lg mt-5 ml-4 md:text-xl">Game Permissions</h1>

        {pageData && pageData.data.length > 0 ? (
          pageData.data.map((game) => (
            <div
              key={game.id}
              className="flex w-full max-w-3xl mt-5 rounded-lg p-4 border-gradient bg-liteprpl"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
                <div className="w-full sm:w-1/3">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_ASSETS_BASE_URL + game?.image
                    }
                    alt="quizimage"
                    width={200}
                    height={200}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <h1 className="text-white text-lg sm:text-2xl font-bold">
                    {game?.name} <span className="text-blue-500">Game</span>
                  </h1>
                  <p className="text-xs sm:text-sm font-medium text-gray-300">
                    {game?.description}
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-4 text-white mt-5">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={game?.access ? true : false}
                        onChange={() =>
                          handleCheckboxChange(game.id, game.access, game.name)
                        }
                        className="h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                      />
                      <span>Grant Access</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No data</div>
        )}
      </div>
    </>
  );
};

export default EditAdmin;
