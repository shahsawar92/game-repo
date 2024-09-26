import Image from "next/image";
import React from "react";
import { ShipWheel, AlarmClock, Wallet } from "lucide-react";

export const GameCard = ({ src, title, description, gametype, time, cost }) => {
  return (
    <div className="px-2">
      <div className="relative flex flex-col gap-5 p-4 border-gradient bg-tertiary ">
        <div className="relative border-gradient">
          <Image alt={"card-img"} src={src} className="w-full" />
        </div>
        <div className="text-lg lg:text-2xl font-bold">
          {title}
          <span className="text-[#7B45D3]"> Game</span>
          <div className="text-xs lg:text-lg">{description}</div>
        </div>
        <div className="flex justify-between flex-wrap text-xs lg:text-md font-extrabold">
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
      </div>
    </div>
  );
};
