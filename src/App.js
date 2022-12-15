import React, { useState } from 'react';
import './App.css';
import BingoCard from './BingoCard';

function App() {
  const [bingocard] = useState([
      {
        "header": "B",
        "numbers": [1, 2, 3, 4, 5]
      }
  ])
  return (
    <>
    <BingoCard bingocard={bingocard}/>
    <button>New Bingo Card</button>
    </>
  );
}

export default App;
