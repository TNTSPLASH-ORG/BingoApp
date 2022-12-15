import React, { useState } from 'react';
import './App.css';
import BingoCard from './BingoCard';
import { v4 as uuidv4 } from 'uuid';

function getRandomIntsInRange(min, max, count) {
  const randomInts = [];

  for (let i = 0; i < count; i++) {
    let randomInt;

    do {
      randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (randomInts.includes(randomInt));

    randomInts.push(randomInt);
  }

  return randomInts;
}


function App() {
<<<<<<< HEAD
  const [bingocard, setBingoCard] = useState([])

  let n_numbers = getRandomIntsInRange(31, 45, 4)
  n_numbers.splice(2, 0, "Free")

  function handleNewBingo(event) {
    setBingoCard([
      { 
=======
  const [bingocard] = useState([
      {
>>>>>>> 05c68c629fb600097204b77c539b69a7d6b9d327
        "header": "B",
        "numbers": getRandomIntsInRange(1, 15, 5)
      },
      {
        id: uuidv4(),
        "header": "I",
        "numbers": getRandomIntsInRange(16, 30, 5)
      },
      {
        id: uuidv4(),
        "header": "N",
        "numbers": n_numbers
      },
      {
        id: uuidv4(),
        "header": "G",
        "numbers": getRandomIntsInRange(46, 60, 5)
      },
      {
        id: uuidv4(),
        "header": "O",
        "numbers": getRandomIntsInRange(61, 75, 5)
      }
    ])
  }

  return (
    <div>
      <div className="clear"></div>
      <BingoCard bingocard={bingocard} />
      <button onClick={handleNewBingo}>New Bingo Card</button>
    </div>
  );
}

export default App;
