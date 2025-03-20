"use client";

import React from "react";

type Player = {
  id: string;
  name: string;
  position: string;
  shirt_number: number;
  created_at: string;
};

const formations = {
  "3-4-2-1": [
    { position: "GK", x: 50, y: 90 },
    { position: "CB", x: 30, y: 70 },
    { position: "CB", x: 50, y: 70 },
    { position: "CB", x: 70, y: 70 },
    { position: "RWB", x: 85, y: 50 },
    { position: "LWB", x: 15, y: 50 },
    { position: "CM", x: 40, y: 50 },
    { position: "CM", x: 60, y: 50 },
    { position: "CAM", x: 35, y: 30 },
    { position: "CAM", x: 65, y: 30 },
    { position: "ST", x: 50, y: 10 },
  ],
};

const FormationDisplay = ({
  selectedPlayers,
}: {
  selectedPlayers: { [key: number]: Player };
}) => {
  const formation = formations["3-4-2-1"];

  return (
    <div className="relative mx-auto mb-4 w-full max-w-md rounded-lg bg-green-700 p-4 text-white">
      <h3 className="text-center text-lg font-bold">Your Prediction</h3>
      <div className="relative w-full rounded-lg bg-green-600 pt-[150%]">
        {/* Football pitch lines */}
        <div className="absolute inset-0 border-4 border-white"></div>{" "}
        {/* Outer boundary */}
        <div className="absolute top-1/2 left-0 h-[2px] w-full bg-white"></div>{" "}
        {/* Halfway line */}
        <div className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"></div>{" "}
        {/* Center circle */}
        {/* Penalty areas */}
        <div className="absolute bottom-[0%] left-[20%] h-16 w-[60%] border-2 border-white"></div>
        <div className="absolute top-[0%] left-[20%] h-16 w-[60%] border-2 border-white"></div>
        {/* Goal areas */}
        <div className="absolute bottom-[0%] left-[35%] h-6 w-[30%] border-2 border-white"></div>
        <div className="absolute top-[0%] left-[35%] h-6 w-[30%] border-2 border-white"></div>
        {formation.map((pos, index) => {
          const player = selectedPlayers[index + 1];
          return (
            <div
              key={index}
              className="absolute flex flex-col items-center justify-center gap-1 text-xs"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="bg-primary-300 text-primary-100 flex size-12 items-center justify-center rounded-full border border-gray-300 text-xl">
                {player ? player.shirt_number : "?"}
              </span>
              <span className="ml-2">
                {player ? player.name.split(" ").slice(1).join(" ") : ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormationDisplay;
