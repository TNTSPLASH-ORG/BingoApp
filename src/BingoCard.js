import React from 'react'
import BingoCol from './BingoCol'
import BingoColHeader from './BingoColHeader'
import { v4 as uuidv4 } from "uuid";

export default function BingoCard({ bingocard }) {
  return (
    bingocard.map(col => {
        return (
            <div key={uuidv4()} className="card">
              <BingoColHeader key={col.id} header = {col.header}/>
              <BingoCol key={uuidv4()} nums = { col.numbers } />
            </div>
        )
    })
  )
}
