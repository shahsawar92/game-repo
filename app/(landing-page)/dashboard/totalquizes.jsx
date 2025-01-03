import React from "react";
import quizimage from "../../../public/assets/quizimage.png";
import mathimage from "../../../public/assets/mathimage.png";
import wordimage from "../../../public/assets/wordimage.png";
import puzzleimage from "../../../public/assets/puzzleimage.png";
import matchimage from "../../../public/assets/matchimage.png";
import Image from "next/image";

function Totalquizes() {
  return (
    <>
      <div className='h-px w-full lg:w-[90%] gradient-background'></div>
      <div className='w-full flex flex-col items-start justify-start  gap-5 md:px-16 overflow-y-auto h-screen scrollbar-hide'>
        <div className='w-full flex items-center justify-center  gap-5'>
          <div className='flex flex-col gap-4 w-full max-w-3xl mt-5 rounded-lg p-4 border-gradient bg-tertiary'>
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 w-full'>
              <div className='w-full sm:w-1/3'>
                <Image
                  src={quizimage}
                  alt='quizimage'
                  className='w-full h-auto object-cover'
                />
              </div>
              <div className='flex flex-col w-full'>
                <h1 className='text-white text-lg sm:text-2xl font-bold'>
                  Quiz <span className='text-blue-500'>Game</span>
                </h1>
                <p className='text-xs sm:text-sm font-medium text-gray-300'>
                  Test your knowledge with this exciting quiz game!
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4 w-full max-w-3xl mt-5 rounded-lg p-4 border-gradient bg-tertiary'>
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 w-full'>
              <div className='w-full sm:w-1/3'>
                <Image
                  src={wordimage}
                  alt='wordimage'
                  className='w-full h-auto object-cover'
                />
              </div>
              <div className='flex flex-col w-full'>
                <h1 className='text-white text-lg sm:text-2xl font-bold'>
                  Word <span className='text-blue-500'>Game</span>
                </h1>
                <p className='text-xs sm:text-sm font-medium text-gray-300'>
                  Challenge your vocabulary in this fun word game!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex items-center justify-center  gap-5'>
          <div className='flex flex-col gap-4 w-full max-w-3xl mt-5 rounded-lg p-4 border-gradient bg-tertiary'>
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 w-full'>
              <div className='w-full sm:w-1/3'>
                <Image
                  src={mathimage}
                  alt='mathimage'
                  className='w-full h-auto object-cover'
                />
              </div>
              <div className='flex flex-col w-full'>
                <h1 className='text-white text-lg sm:text-2xl font-bold'>
                  Math <span className='text-blue-500'>Game</span>
                </h1>
                <p className='text-xs sm:text-sm font-medium text-gray-300'>
                  Boost your math skills with this interactive game.
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4 w-full max-w-3xl mt-5 rounded-lg p-4 border-gradient bg-tertiary'>
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 w-full'>
              <div className='w-full sm:w-1/3'>
                <Image
                  src={puzzleimage}
                  alt='puzzleimage'
                  className='w-full h-auto object-cover'
                />
              </div>
              <div className='flex flex-col w-full'>
                <h1 className='text-white text-lg sm:text-2xl font-bold'>
                  Puzzle <span className='text-blue-500'>Game</span>
                </h1>
                <p className='text-xs sm:text-sm font-medium text-gray-300'>
                  Solve puzzles and unlock new challenges!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 w-full max-w-lg 2xl:max-w-2xl mt-5 rounded-lg p-4 border-gradient bg-tertiary'>
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 w-full'>
            <div className='w-full sm:w-1/3'>
              <Image
                src={matchimage}
                alt='matchimage'
                className='w-full h-auto object-cover'
              />
            </div>
            <div className='flex flex-col w-full'>
              <h1 className='text-white text-lg sm:text-2xl font-bold'>
                Match Image <span className='text-blue-500'>Game</span>
              </h1>
              <p className='text-xs sm:text-sm font-medium text-gray-300'>
                Match images and enhance your cognitive skills!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Totalquizes;
