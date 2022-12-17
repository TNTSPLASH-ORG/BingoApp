import React, { useState, useEffect } from "react";
import "./App.css";
import BingoCard from "./BingoCard";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "bingoapp.BingoCard";

function App() {
  const [bingocard, setBingoCard] = useState(() => {
    const storedbingo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedbingo) {
      return storedbingo;
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bingocard));
  }, [bingocard]);

  function getRandomIntsInRange(min, max, count) {
    const randomInts = [];

    for (let i = 0; i < count; i++) {
      let randomInt;

      do {
        randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (randomInts.includes(randomInt));
      randomInts.push(randomInt)
    }
    return randomInts;
  }

  function buildRandomIntsObject(min, max, count) {
    const randomInts = getRandomIntsInRange(min, max, count)
    const randomIntsObjs = [];

    randomInts.map((digit) => {
      return randomIntsObjs.push({
        id: uuidv4(),
        digit: digit,
        backgroundColor: "#FFFFFF",
      });
    });

    return randomIntsObjs;
  }

  function handleNewBingo() {
    let n_numbers = buildRandomIntsObject(31, 45, 4);
    n_numbers.splice(2, 0, {
      id: uuidv4(),
      digit: "Free",
      backgroundColor: "#FFFFFF",
    });
    setBingoCard([
      {
        id: uuidv4(),
        header: "B",
        numbers: buildRandomIntsObject(1, 15, 5),
      },
      {
        id: uuidv4(),
        header: "I",
        numbers: buildRandomIntsObject(16, 30, 5),
      },
      {
        id: uuidv4(),
        header: "N",
        numbers: n_numbers,
      },
      {
        id: uuidv4(),
        header: "G",
        numbers: buildRandomIntsObject(46, 60, 5),
      },
      {
        id: uuidv4(),
        header: "O",
        numbers: buildRandomIntsObject(61, 75, 5),
      },
    ]);
  }

  function toggleBackground(id) {
    const updatedBingoCard = bingocard.map((card) => {

      const updatedNumbers = card.numbers.map((num) => {
        if (id === num.id) {
          
          const newNum = { ...num }

          if (num.backgroundColor === "#FFFFFF") {
            newNum.backgroundColor = "#E6A5A5"
          } else {
            newNum.backgroundColor = "#FFFFFF"
          }

          return newNum
        }

        return num;
      })

      card.numbers = updatedNumbers

      return card
    });
    setBingoCard(updatedBingoCard)
  }
  return (
    <>
      <div className="wrapper">
        <BingoCard
          className="item"
          key={bingocard.id}
          bingocard={bingocard}
          toggleBackground={toggleBackground}
        />
      </div>
      <div className="button">
        <button className="btn" onClick={handleNewBingo}>New Bingo Card</button>
      </div>
    </>
  );
}

export default App;
