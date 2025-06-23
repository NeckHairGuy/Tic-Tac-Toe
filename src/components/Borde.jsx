import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
export default function Borde({ borde, handleClick, win, winLine }) {
  const X = () => (
    <div className="x">
      <div className="x2 blue-glow"></div>
      <div className="x1 blue-glow"></div>
    </div>
  );
  const O = () => <div className="o red-glow"></div>;
  return (
    <div className="grid-borde">
      <div className="h-line-1 line"></div>
      <div className="h-line-2 line"></div>
      <div className="v-line-1 line"></div>
      <div className="v-line-2 line"></div>
      {borde.map((box, i) => {
        let isWin = false;
        if (win === "draw") {
          isWin = true;
        } else if (winLine?.includes(i)) {
          isWin = true;
        }
        return (
          <div
            className={`box ${isWin ? "win" : ""} `}
            key={uuidv4()}
            index={i}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            {box === "o" ? <O /> : ""}
            {box === "x" ? <X /> : ""}
          </div>
        );
      })}
    </div>
  );
}
