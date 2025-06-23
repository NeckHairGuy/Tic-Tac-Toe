import { useEffect, useState } from "react";
import Borde from "./components/Borde";
import xsound from "./assets/xsound.ogg";
import osound from "./assets/osound.ogg";
import winSound from "./assets/winSound.mp3";
import tieSound from "./assets/tieSound.mp3";
const initBorde = ["", "", "", "", "", "", "", "", ""];
function App() {
  const Xsound = new Audio(xsound);
  const Osound = new Audio(osound);
  const WinSound = new Audio(winSound);
  const TieSound = new Audio(tieSound);
  const [borde, setBorde] = useState(initBorde);
  const [turn, setTurn] = useState("player1");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [click, setclick] = useState(0);
  const [win, setWin] = useState(null);
  const [winLine, setWinLine] = useState(null);
  const [canClick, setCanClick] = useState(true);
  const [first, setFirst] = useState("x");
  //check if some one win
  const Check = () => {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];
    winLines.map((line) => {
      if (
        borde[line[0]] === "x" &&
        borde[line[1]] === "x" &&
        borde[line[2]] === "x"
      ) {
        setWin("xWin");
        setWinLine(line);
      }
      if (
        borde[line[0]] === "o" &&
        borde[line[1]] === "o" &&
        borde[line[2]] === "o"
      ) {
        setWin("oWin");
        setWinLine(line);
      }
    });
    if (click === 9 && !win) {
      setWin("draw");
    }
  };

  //delay function
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //restart game
  const RestartGame = async () => {
    if (win === "xWin") {
      setPlayer1Score((prev) => prev + 1);

      WinSound.play();
    } else if (win === "oWin") {
      setPlayer2Score((prev) => prev + 1);

      WinSound.play();
    } else {
      TieSound.play();
    }
    setCanClick(false);
    await delay(1500);
    setCanClick(true);
    setBorde(initBorde);
    setclick(0);
    setWin(null);
    setWinLine(null);
    setFirst((prev) => {
      if (prev === "x") return "o";
      else return "x";
    });
  };

  // handle Clicks on the borde
  const handleClick = (e) => {
    if (!canClick) return;
    const index = e.target.getAttribute("index");

    if (borde[index] != "") {
      console.log("already taken");
      return;
    }
    if (turn === "player1") {
      Xsound.play();
    } else {
      Osound.play();
    }
    setclick(click + 1);

    const newBorde = [...borde];

    newBorde[index] = turn === "player1" ? "x" : "o";
    setBorde(newBorde);

    setTurn((prev) => {
      if (prev === "player1") return "player2";
      else return "player1";
    });
  };

  useEffect(() => {
    Check();
    if (win) RestartGame();
  }, [win, click]);

  console.log(turn);
  return (
    <div className="App">
      <h1>
        <span className="blue-text-glow">Tic </span>
        <span className="red-text-glow">Tac </span>
        <span className="blue-text-glow">Toe </span>
      </h1>
      <Borde
        borde={borde}
        handleClick={handleClick}
        win={win}
        winLine={winLine}
      />
      <div className="score">
        <div className="player-score">
          <div className={`${turn === "player1" ? "blue-text-glow" : ""}`}>
            Player 1
          </div>
          <div className="player1-score blue-text-glow">{player1Score}</div>
        </div>
        <div className="text-score">Score</div>
        <div className="player-score">
          <div className={`${turn === "player2" ? "red-text-glow" : ""}`}>
            Player 2
          </div>
          <div className="player2-score red-text-glow">{player2Score}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
