import React from 'react'
import BingoCard from "./BingoCard";
import { v4 as uuidv4 } from "uuid";

export default function Container(props) {
  return (
    <div key={uuidv4()}>
      <div className="wrapper">
        <BingoCard
          className="item"
          key={props.bingocard.id}
          bingocard={props.bingocard}
          toggleBackground={props.toggleBackground}
        />
      </div>
      <div className="button">
        <button
          className="btn"
          style={{ backgroundColor: props.color }}
          onClick={props.handleNewBingo}
        >
          New Bingo Card
        </button>
      </div>
    </div>
  );
}