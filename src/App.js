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

  let n_numbers = getRandomIntsInRange(31, 45, 4);
  n_numbers.splice(2, 0, { id: uuidv4(), digit: "Free", backgroundColor: "#FFFFFF" });

  function getRandomIntsInRange(min, max, count) {
    const randomInts = [];

    for (let i = 0; i < count; i++) {
      let randomInt;

      do {
        randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (randomInts.includes(randomInt));

      randomInts.push({ 
        id: uuidv4(), 
        digit: randomInt,
        backgroundColor: "#FFFFFF"
      });
    }
    return randomInts;
  }

  function handleNewBingo(event) {
    setBingoCard([
      {
        id: uuidv4(),
        header: "B",
        numbers: getRandomIntsInRange(1, 15, 5),
      },
      {
        id: uuidv4(),
        header: "I",
        numbers: getRandomIntsInRange(16, 30, 5),
      },
      {
        id: uuidv4(),
        header: "N",
        numbers: n_numbers,
      },
      {
        id: uuidv4(),
        header: "G",
        numbers: getRandomIntsInRange(46, 60, 5),
      },
      {
        id: uuidv4(),
        header: "O",
        numbers: getRandomIntsInRange(61, 75, 5),
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
    <div>
      <div className="clear"></div>
      <BingoCard
        className="card"
        key={bingocard.id}
        bingocard={bingocard}
        toggleBackground={toggleBackground}
      />
      <button onClick={handleNewBingo}>New Bingo Card</button>
    </div>
  );
}

export default App;
