import React, { useState, useEffect } from "react";
import "./App.css";
import BingoCard from "./BingoCard";
import ColorPicker from "./ColorPicker";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "bingoapp.BingoCard";
const LOCAL_STORAGE_KEY_COLOR = "bingoapp.BingoCard.Color";

const getRandomIntsInRange = (min, max, count) => {
  const randomInts = [];

  for (let i = 0; i < count; i++) {
    let randomInt;

    do {
      randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (randomInts.includes(randomInt));
    randomInts.push(randomInt);
  }
  return randomInts;
};

const buildRandomIntsObject = (min, max, count) => {
  const randomInts = getRandomIntsInRange(min, max, count);
  return randomInts.map((digit) => ({
    id: uuidv4(),
    digit,
    backgroundColor: "#FFFFFF",
  }));
};

const App = () => {
  const [bingocard, setBingoCard] = useState(() => {
    const storedbingo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return storedbingo || [];
  });

  const [color, setColor] = useState(() => {
    const storedcolor = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_COLOR));
    return storedcolor || "#E6A5A5";
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bingocard));
    localStorage.setItem(LOCAL_STORAGE_KEY_COLOR, JSON.stringify(color));
  }, [bingocard, color]);

  const handleNewBingo = () => {
    const n_numbers = buildRandomIntsObject(31, 45, 4);
    n_numbers.splice(2, 0, {
      id: uuidv4(),
      digit: "Free",
      backgroundColor: color,
    });

    setBingoCard([
      { id: uuidv4(), header: "B", numbers: buildRandomIntsObject(1, 15, 5) },
      { id: uuidv4(), header: "I", numbers: buildRandomIntsObject(16, 30, 5) },
      { id: uuidv4(), header: "N", numbers: n_numbers },
      { id: uuidv4(), header: "G", numbers: buildRandomIntsObject(46, 60, 5) },
      { id: uuidv4(), header: "O", numbers: buildRandomIntsObject(61, 75, 5) },
    ]);
  };

  const toggleBackground = (id) => {
    const updatedBingoCard = bingocard.map((card) => ({
      ...card,
      numbers: card.numbers.map((num) => {
        if (id === num.id) {
          const newNum = { ...num };
          newNum.backgroundColor = num.backgroundColor === "#FFFFFF" ? color : "#FFFFFF";
          return newNum;
        }
        return num;
      }),
    }));
    setBingoCard(updatedBingoCard);
  };

  const handleColorPick = (color, event) => {
    setColor(color.hex);
    const updatedBingoCard = bingocard.map((card) => ({
      ...card,
      numbers: card.numbers.map((num) => ({
        ...num,
        backgroundColor: num.backgroundColor !== "#FFFFFF" ? color.hex : num.backgroundColor,
      })),
    }));
    setBingoCard(updatedBingoCard);
  };

  const buttonStyle = { backgroundColor: color };

  return (
    <>
      <ColorPicker style={{ marginLeft: '0.35em' }} color={color} handleColorPick={handleColorPick}/>
      <div className="wrapper">
        <BingoCard className="item" key={bingocard.id} bingocard={bingocard} toggleBackground={toggleBackground} />
      </div>
      <div className="button">
        <button className="btn" style={buttonStyle} onClick={handleNewBingo}>
          New Bingo Card
        </button>
      </div>
    </>
  );
};

export default App;
