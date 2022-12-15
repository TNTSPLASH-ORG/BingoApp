import React from 'react'
import BingoCol from './BingoCol'
import BingoColHeader from './BingoColHeader'

export default function BingoCard({ bingocard }) {
  return (
    bingocard.map(col => {
        return (
            <div className="card">
              <BingoColHeader header = {col.header}/>
              <BingoCol nums = { col.numbers } />
            </div>
        )
    })
  )
}
