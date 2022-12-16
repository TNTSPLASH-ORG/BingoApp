import React from 'react'

export default function BingoColHeader(props) {
  return (
    <div>
      <div key={props.header}>{props.header}</div>
    </div>
  )
}
