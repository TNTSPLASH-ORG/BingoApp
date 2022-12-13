import React from 'react'
import BingoCol from './BingoCol'
import BingoColHeader from './BingoColHeader'

export default function BingoCard({ bingocard }) {
  console.log(bingocard[0].header)
  return (
    bingocard.map(col => {
        return (
            <>
            <BingoColHeader header = {col.header}/>
            <BingoCol key = { col.header } col = { col.numbers } />
            </>
        )
    })
  )
}
