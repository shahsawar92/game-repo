"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GameCard } from "@/components"; // Ensure GameCard is properly exported from this path
import { useRouter } from "next/navigation"; // Use the new Next.js navigation import

export const Carousel = ({ games }) => {
  const router = useRouter(); // Initialize the router
  const [isMounted, setIsMounted] = useState(false); // State to track if the component is mounted

  useEffect(() => {
    setIsMounted(true); // Set mounted to true after the component has mounted
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Ensure that games is an array
  const cardData = games || [];

  console.log(cardData);

  const handleCardClick = (item) => {
    let game_link =
      item.game_link == null ? "https:game.com.pk" : item.game_link;
    let token = localStorage.getItem("kpobit_token");

    game_link = game_link + "?token=" + token;
    game_link = game_link + "&game_id=" + 5;

    router.push(game_link);
  };

  // Return null if the component is not mounted to prevent the error
  if (!isMounted) return null;

  return (
    <Slider {...settings} className='lg:px-10' centerMode centerPadding='0px'>
      {cardData.map((item, index) => (
        <div key={index}>
          {" "}
          {/* Add click handler */}
          <GameCard
            src={"https://game.visionary.sa/" + item.image}
            alt='Card Image'
            title={item.name}
            description={item.description}
            gametype={item.gametype} // Use the correct gametype from the item
            time={item.time} // Use the correct time from the item
            cost={item.cost} // Use the correct cost from the item
            width={300} // Specify a width for the image
            height={200} // Specify a height for the image
            game_link={item.game_link}
            id={item.id}
          />
        </div>
      ))}
    </Slider>
  );
};
