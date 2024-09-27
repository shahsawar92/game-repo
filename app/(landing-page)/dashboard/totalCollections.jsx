import React from "react";
import quizimage from "../../../public/assets/quizimage.png";
import mathimage from "../../../public/assets/mathimage.png";
import wordimage from "../../../public/assets/wordimage.png";
import puzzleimage from "../../../public/assets/puzzleimage.png";
import matchimage from "../../../public/assets/matchimage.png";
import Image from "next/image";

const TotalCollections = () => {
  const handleAddAdminClick = () => {
    setShowAddAdmin(true);
  };

  function togglePasswordVisibility() {
    const passwordField = document.getElementById("password");
    const eyeIconPath = document.getElementById("eyeIconPath");

    if (passwordField.type === "password") {
      passwordField.type = "text";
      eyeIconPath.setAttribute(
        "d",
        "M13.875 18.825A9.99 9.99 0 0112 19c-4.418 0-8-3.134-8-7 0-1.531.507-2.948 1.363-4.102m2.832-2.831C7.682 4.386 9.763 4 12 4c4.418 0 8 3.134 8 7 0 1.588-.464 3.076-1.26 4.315M15.535 15.536a3 3 0 11-4.243-4.243M3 3l18 18"
      );
    } else {
      passwordField.type = "password";
      eyeIconPath.setAttribute(
        "d",
        "M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9 0c0 3.866 3.582 7 8 7s8-3.134 8-7-3.582-7-8-7-8 3.134-8 7z"
      );
    }
  }

  return (
    <>
      <div className="h-px w-full lg:w-[90%] gradient-background"></div>
      <div
        className="self-end flex items-center gap-2 rounded-md font-bold tracking-tighter bg-[#7209B7] px-4 py-2 text-xs lg:text-xl cursor-pointer"
        onClick={handleAddAdminClick}
      >
        <span className="text-md lg:text-3xl font-bold">+</span> Add Admin
      </div>

      {/* Scrollable Container */}
      <div className="flex flex-col w-full bg-lightgray p-8 max-w-6xl overflow-y-auto h-screen">
        <div className="flex flex-col w-full max-w-3xl rounded-xl p-4 border-gradient bg-liteprpl">
          <h1>Admin Name</h1>
          <p>email123@email.com</p>

          <div class="relative w-full max-w-xs">
            <input
              id="password"
              type="password"
              placeholder="Change Password"
              class="w-full border-b-2 border-gray-400 bg-transparent text-white py-2 pl-2 focus:outline-none focus:border-gray-200"
            />

            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                type="button"
                onClick={togglePasswordVisibility}
                class="focus:outline-none"
              >
                <svg
                  id="eyeIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    id="eyeIconPath"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9 0c0 3.866 3.582 7 8 7s8-3.134 8-7-3.582-7-8-7-8 3.134-8 7z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="p-2 rounded-lg w-full max-w-md mt-7">
            <div class="flex justify-start gap-6 items-center mb-2">
              <span class="text-white font-semibold text-lg">Storage</span>

              <div class="relative">
                <select class="block cursor-pointer w-full appearance-none bg-gray-800 border border-teal-400 text-white py-1 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400">
                  <option>4.00 GB</option>
                  <option>8.00 GB</option>
                  <option>16.00 GB</option>
                </select>

                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.58 7.58a1 1 0 011.4 0L10 10.59l3.02-3.02a1 1 0 111.4 1.42l-3.72 3.72a1 1 0 01-1.4 0L5.58 8.99a1 1 0 010-1.42z" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="w-full bg-gray-700 rounded-full h-3">
              <div
                class="bg-blue-500 h-3 rounded-full"
                style={{ width: "45%" }}
              ></div>
            </div>

            <div class="flex justify-between items-center mt-1 text-xs text-gray-400">
              <span>1.8 GB / 4.00 GB</span>
            </div>
          </div>
        </div>

        <h1 className="flex text-lg mt-5 ml-4 md:text-xl">Game Permissions</h1>

        <div className="flex w-full max-w-3xl mt-5 rounded-lg p-4 border-gradient bg-liteprpl">
          <div className="flex gap-6 w-full">
            <Image src={quizimage} alt="quizimage" />
            <div className="flex flex-col w-full">
              <h1 className="text-white md:text-2xl font-bold">
                Quiz <span className="text-blue-500">Game</span>
              </h1>
              <p className="text-xs font-medium text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                unde.
              </p>

              <div class="flex gap-6 text-white mt-5">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class=" h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <span class="">Visual Quiz</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class=" h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <span class="">Matching Quiz</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class="h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <span class="">Audio Quiz</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class=" h-5 w-5 border border-blue-500 rounded-md focus:outline-none cursor-pointer"
                  />
                  <span class="">True / False</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-3xl mt-5 rounded-lg p-4 border-gradient bg-liteprpl">
          <div className="flex gap-6 w-full">
            <Image src={mathimage} alt="quizimage" />
            <div className="flex flex-col w-full">
              <h1 className="text-white md:text-2xl font-bold">
                Math <span className="text-blue-500">Game</span>
              </h1>
              <p className="text-xs font-medium text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                unde.
              </p>

              <div class="flex gap-6 text-white mt-5">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class=" h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <span class="">Visual Quiz</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class=" h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <span class="">Matching Quiz</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class="h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <span class="">Audio Quiz</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class=" h-5 w-5 border border-blue-500 rounded-md focus:outline-none cursor-pointer"
                  />
                  <span class="">True / False</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-3xl mt-5 rounded-lg p-4 border-gradient bg-liteprpl">
          <div className="flex gap-6 w-full">
            <Image src={wordimage} alt="quizimage" />
            <div className="flex flex-col w-full">
              <h1 className="text-white md:text-2xl font-bold">
                Word <span className="text-blue-500">Game</span>
              </h1>
              <p className="text-xs font-medium text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                unde.
              </p>

              <div class="flex gap-6 text-white mt-5">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class=" h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <span class="">Visual Quiz</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class=" h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <span class="">Matching Quiz</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class="h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <span class="">Audio Quiz</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class=" h-5 w-5 border border-blue-500 rounded-md focus:outline-none cursor-pointer"
                  />
                  <span class="">True / False</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-3xl mt-5 rounded-lg p-4 border-gradient bg-liteprpl">
          <div className="flex gap-6 w-full">
            <Image src={puzzleimage} alt="quizimage" />
            <div className="flex flex-col w-full">
              <h1 className="text-white md:text-2xl font-bold">
                Puzzle <span className="text-blue-500">Game</span>
              </h1>
              <p className="text-xs font-medium text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                unde.
              </p>

              <div class="flex gap-6 text-white mt-5">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class=" h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <span class="">Visual Quiz</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class=" h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <span class="">Matching Quiz</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class="h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <span class="">Audio Quiz</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class=" h-5 w-5 border border-blue-500 rounded-md focus:outline-none cursor-pointer"
                  />
                  <span class="">True / False</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-3xl mt-5 rounded-lg p-4 border-gradient bg-liteprpl">
          <div className="flex gap-6 w-full">
            <Image src={matchimage} alt="quizimage" />
            <div className="flex flex-col w-full">
              <h1 className="text-white md:text-2xl font-bold">
                Match Image <span className="text-blue-500">Game</span>
              </h1>
              <p className="text-xs font-medium text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                unde.
              </p>

              <div class="flex gap-6 text-white mt-5">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class=" h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <span class="">Visual Quiz</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class=" h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <span class="">Matching Quiz</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class="h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none cursor-pointer"
                  />
                  <span class="">Audio Quiz</span>
                </label>

                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    class=" h-5 w-5 border border-blue-500 rounded-md focus:outline-none cursor-pointer"
                  />
                  <span class="">True / False</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalCollections;
