"use client";
import React, { useState } from "react";
import Image from "next/image";
import GradientLine1 from "@/public/assets/gradient-line1.png";
import GradientLine2 from "@/public/assets/gradient-line2.png";
import { useRouter } from "next/navigation";
import { post } from "@/utils/api";
import Swal from "sweetalert2";
import { set } from "react-hook-form";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Extract the user ID from the route
  const pathname = window.location.pathname;
  const userId = pathname.split("/").pop();
  const token = localStorage.getItem("game_user_token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await post(
        "api/v1/reset-admin-password",
        {
          user_id: userId,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.success) {
        setLoading(false);
        setSuccessMessage(newPassword);
        setShowPassword(true);

        // Copy the password to clipboard
        navigator.clipboard.writeText(newPassword);

        // Redirect to dashboard after 10 seconds
        setTimeout(() => {
          router.push("/dashboard");
        }, 10000);
      } else {
        setLoading(false);
        Swal.fire("Failed to update password. Please try again.");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setLoading(false);
      Swal.fire("An error occurred while updating the password.");
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(successMessage).then(() => {
      Swal.fire({
        icon: "success",
        title: "Copied!",
        text: "Password copied to clipboard.",
        timer: 1000, // Show for 1 second
        showConfirmButton: false,
      });
    });
  };

  return (
    <React.Fragment>
      <div className='w-[75%] mx-auto flex flex-col gap-10 pb-10'>
        <div className='font-extrabold text-3xl xl:text-5xl text-center leading-none px-[20px] lg:px-[50px] rowdies-font'>
          Change Password
        </div>
      </div>

      <div className='flex flex-col bg-primary pt-10 pb-20 border-2 border-primary'>
        <div className='w-[80%] mx-auto'>
          <div className='flex justify-center items-center gap-2 py-6'>
            <Image alt='vector' src={GradientLine1} />
            <div className='pb-3 text-md lg:text-3xl font-extrabold'>
              Enter New Password
            </div>
            <Image alt='vector' src={GradientLine2} />
          </div>

          <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
            <input
              type='password'
              placeholder='Enter New Password'
              className='w-full h-12 border-2 text-black border-primary rounded-md px-4 mb-4'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type='submit'
              className='w-full h-12 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
              {loading ? "loading..." : "Update Password"}
            </button>
          </form>

          {showPassword && (
            <div className='mt-4 text-center'>
              <div className='flex items-center justify-center gap-2 mb-4'>
                <input
                  type='text'
                  value={successMessage}
                  readOnly
                  className='w-64 px-4 py-2 border-2 text-black border-gray-300 rounded-md text-center font-mono bg-gray-100'
                />
                <button
                  onClick={handleCopyToClipboard}
                  className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h4a2 2 0 002-2M8 5a2 2 0 012-2h4a2 2 0 012 2'
                    />
                  </svg>
                </button>
              </div>
              <p className='text-gray-300 mb-2'>
                Click the icon to copy to clipboard.
              </p>
              <p className='text-gray-300'>
                You will be redirected to the dashboard in 10 seconds...
              </p>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
