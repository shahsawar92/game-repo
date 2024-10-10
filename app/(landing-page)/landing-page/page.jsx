"use client";
import React from "react";
import Image from "next/image";
import { Carousel } from "@/components";
import Landing1 from "@/public/assets/landing-1.png";
import JoinNowBtn from "@/public/assets/join-now-btn.png";
import GradientLine1 from "@/public/assets/gradient-line1.png";
import GradientLine2 from "@/public/assets/gradient-line2.png";
import VideoCard1 from "@/public/assets/video-card1.png";
import VideoCard2 from "@/public/assets/video-card2.png";
import VideoCard3 from "@/public/assets/video-card3.png";
import { useState, useEffect } from "react";
import { get } from "@/utils/api";


export default function Home() {

  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get("/api/v1/listGamesWithAccess/4");
        console.log(data);
        setPageData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);



  return (
    <React.Fragment>
      <div className="w-[75%] mx-auto flex flex-col gap-10 pb-10">
        <div className="font-extrabold text-4xl lg:text-[80px] text-center leading-none px-[20px] lg:px-[250px] rowdies-font">
          Let the Game Begin
        </div>
        <div className="relative h-[200px] lg:h-[500px] flex justify-center items-center ">
          <Image alt="landing-1" src={Landing1} fill className />
          <div className="absolute bottom-12 lg:bottom-28">
            {/* <Image
              className="w-full lg:w-[200px] hover:cursor-pointer"
              src={JoinNowBtn}
              alt="join-now"
            /> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-secondary pt-10 pb-20 border-2 border-primary">
        <div className="w-[80%] mx-auto">
          <div className="flex justify-center items-center gap-2 py-6">
            <Image alt="vector" src={GradientLine1} />
            <div className="pb-3 text-md lg:text-4xl font-extrabold">Games</div>
          
            <Image alt="vector" src={GradientLine2} />
          </div>

          {pageData && pageData.data.length > 0 ? (


          <Carousel  games={pageData.data} />

        
          ) : (
            <div className="flex justify-center items-center">
              <div className="text-xl font-bold">No games available</div>
            </div>
          )}


        </div>
      </div>
      <div className="flex flex-col bg-primary pt-10 pb-20">
        <div className="w-[90%] mx-auto">
          <div className="relatie flex justify-center items-center gap-2 py-6">
            <Image alt="vector" src={GradientLine1} />
            <div className="pb-3 text-md text-center lg:text-4xl font-extrabold">
              Games Videos
            </div>
            <Image alt="vector" src={GradientLine2} />
          </div>
          <div className="flex flex-col gap-5">
            <div className="relative w-full">
              <Image src={VideoCard1} alt="video-card" className="w-full" />
            </div>
            <div className="flex gap-5 w-full">
              <div className="relative w-1/2">
                <Image src={VideoCard2} className="w-full" alt="video-card" />
              </div>
              <div className="relative w-1/2">
                <Image src={VideoCard3} className="w-full" alt="video-card" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
