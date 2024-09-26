"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GameCard } from "@/components";
import QuizGame from "@/public/assets/quiz-game.png";
import MathGame from "@/public/assets/math-game.png";
import WordGame from "@/public/assets/word-game.png";
import { space } from "postcss/lib/list";

export const Carousel = () => {
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

  const cardData = [
    {
      src: QuizGame,
      title: "Quiz",
      description:
        "Lor separat existentie es un myth. Por scientie, musica, sport etc.",
      gametype: "Multiplayer",
      time: "5 Day",
      cost: "150.00",
    },
    {
      src: MathGame,
      title: "Math",
      description:
        "Lor separat existentie es un myth. Por scientie, musica, sport etc.",
      gametype: "Action",
      time: "3 Day",
      cost: "300.00",
    },
    {
      src: WordGame,
      title: "Word",
      description:
        "Lor separat existentie es un myth. Por scientie, musica, sport etc.",
      gametype: "RPG",
      time: "5 Day",
      cost: "100.00",
    },
  ];
  return (
    <Slider {...settings} className="lg:px-10" centerMode centerPadding="0px">
      {cardData.map((item, index) => {
        return (
          <GameCard
            key={index}
            src={item.src}
            alt="Card Image"
            title={item.title}
            description={item.description}
            gametype={item.gametype}
            time={item.time}
            cost={item.cost}
          />
        );
      })}
    </Slider>
  );
};
