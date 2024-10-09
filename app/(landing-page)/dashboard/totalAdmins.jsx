"use client";

import React, { useState, useEffect } from "react";
import { get } from "@/utils/api";
import { SquarePen, Trash2, Eye } from "lucide-react";
import { AddAdmin, EditUser } from "@/components"; // Assuming EditUser is imported here
import { useRouter } from "next/navigation";
import EditAdmin from "./editAdmin"; // Import EditAdmin component

export default function AllAdmins() {
  const [pageData, setPageData] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null); // New state for editing
  const router = useRouter();

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
    
    console.log("Admin object:", admin); // Logs the whole admin object to the console
  //  alert(`Admin: ${JSON.stringify(admin, null, 2)}`); // Alerts the whole admin object in a readable format
    setEditingAdmin(admin); // Pass the whole admin object to the state
  };

  const handleDeleteClick = (admin) => {
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
    <>
      <div className="h-px w-full lg:w-[90%] gradient-background"></div>
     {editingAdmin && <button className ="flex justify-end w-full pr-10" onClick={() => setEditingAdmin(null)}>X</button>}
      {/* Conditionally Render EditAdmin if editingAdmin is set */}
      {editingAdmin ? (
        <EditAdmin admin={editingAdmin} onClose={() => setEditingAdmin(null)} />
      ) : (
        <>
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
              {/* Header Row */}
              <div className="bg-[#7209B7] text-white rounded-md p-3 lg:px-5 lg:py-3 flex justify-between items-center">
                <div className="flex w-full lg:w-3/4">
                  <div className="flex-1 text-center">#</div>
                  <div className="flex-1 text-center">Name</div>
                  <div className="flex-1 text-center">Email</div>
                  <div className="flex-1 text-center">Storage</div>
                </div>
                <div className="flex-1 text-center">Actions</div>
              </div>

              {/* Admin Rows */}
              {pageData && pageData.data.length > 0 ? (
                pageData.data.map((admin, index) => {
                  const usedPercentage = calculateUsedPercentage(admin.storage_used, admin.storage_total);
                  return (
                    <div
                      key={admin.id}
                      className="bg-[#d9d9d917] rounded-md p-3 lg:px-5 lg:py-3 flex justify-between items-center mb-3"
                    >
                      <div
                        className="flex w-full lg:w-3/4"
                        onClick={() => handleAccordionClick(index)}
                      >
                        <div className="flex-1 text-center">{index + 1}.</div>
                        <div className="flex-1 text-center">{admin.name}</div>
                        <div className="flex-1 text-center">{admin.email}</div>
                        <div className="flex-1">
                          <div className="relative h-3 bg-white rounded-full mt-1">
                            <div
                              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                              style={{ width: `${usedPercentage}%` }}
                            />
                          </div>
                          <div className="text-xs lg:text-sm mt-1 text-center">
                            {formatStorage(admin.storage_used.toFixed(2))} / {formatStorage(admin.storage_total)}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="flex justify-center gap-3">
                          <Eye
                            className="cursor-pointer"
                            onClick={() => handleEditClick(admin)} // Pass the whole admin object
                          />
                          <Trash2
                            className="cursor-pointer"
                            onClick={() => handleDeleteClick(admin)}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>No admins available.</div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
