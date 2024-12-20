import Image from "next/image";
import React from "react";
import { ShipWheel, AlarmClock, Wallet } from "lucide-react";
import Link from "next/link";

export const GameCard = ({
  src,
  title,
  id,
  description,
  gametype,
  time,
  cost,
  width = 300,
  height = 200,
  game_link,
  isNotLocked,
}) => {
  const token = localStorage.getItem("game_user_token");
  const gamelink = game_link == null ? "https:game.com.pk" : game_link;
  const game_link_token = gamelink + "?token=" + token;
  const game_link_with_id = game_link_token + "&game_id=" + id;

  return (
    <div className='px-2 '>
      <div className='relative flex flex-col gap-5 p-4 border-gradient bg-tertiary rounded-lg shadow-md h-[400px]'>
        {/* Image Container */}
        <div className='relative border-gradient h-40 overflow-hidden rounded-lg'>
          <Image
            alt='card-img'
            src={src}
            className='w-full h-full object-cover' // Ensures the image covers the container proportionally
            width={width}
            height={height}
            // layout='fill'
            priority
          />
          {!isNotLocked && (
            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
              <Image src='/assets/lock.png' alt='Locked' layout='fill' />
            </div>
          )}
        </div>

        {/* Title and Description */}
        <div className='text-lg lg:text-2xl font-bold h-24'>
          {title}
          {/* <span className='text-[#7B45D3]'> Game</span> */}
          <div className='text-xs font-light text-gray-200  mt-2'>
            {description}
          </div>
        </div>

        {/* Link Button */}
        <div className='flex justify-center'>
          {!isNotLocked ? (
            <div className='w-full text-center py-3 bg-gray-400 text-white px-2 font-extrabold text-base rounded-lg cursor-not-allowed'>
              Edit
            </div>
          ) : (
            <Link
              href={game_link_with_id}
              className='w-full text-center py-3 bg-[#7B45D3] hover:bg-[#6939b5] transition text-white px-2 font-extrabold text-base rounded-lg'>
              Edit
            </Link>
          )}
        </div>

        {/* Optional Details Section */}
        {/* Uncomment and customize if needed */}
        {/* 
    <div className="flex justify-between flex-wrap text-xs lg:text-md font-extrabold text-gray-700">
      <div className="flex gap-1 items-center">
        <ShipWheel /> {gametype}
      </div>
      <div className="flex gap-1 items-center">
        <AlarmClock /> {time}
      </div>
      <div className="flex gap-1 items-center">
        <Wallet /> ${cost}
      </div>
    </div> 
    */}
      </div>
    </div>
  );
};
