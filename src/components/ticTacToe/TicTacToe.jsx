import React, { useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../assets/circle.png";
import cross_icon from "../assets/cross.png";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  //ADD

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "x" : "o";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (board.every((cell) => cell)) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXNext(true);
    setWinner(null);
  };

  const renderCell = (index) => {
    const value = board[index];
    return (
      <div className="boxes" onClick={() => handleClick(index)}>
        {value && (
          <img src={value === "x" ? cross_icon : circle_icon} alt={value} />
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe in React</h1>
      <div className="board">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => renderCell(i))}
      </div>
      {winner && (
        <h2 className="winner">
          {winner === "Draw" ? "It's a Draw!" : `Winner is ${winner}`}
        </h2>
      )}
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
