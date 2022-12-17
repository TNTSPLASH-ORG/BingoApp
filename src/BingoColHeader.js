import React from 'react'

export default function BingoColHeader(props) {
  return (
    // <div className="header-letter">
      <div className="flex-header" key={props.header}>{props.header}</div>
    // </div>
  )
}
