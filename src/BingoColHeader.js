import React from 'react'

export default function BingoColHeader( {header} ) {
  return (
    <div>
      <div key={header}>{header}</div>
    </div>
  )
}
