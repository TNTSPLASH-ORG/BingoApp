import React from 'react'
import { v4 as uuidv4 } from "uuid";

function handleClick(e) {
  e.target.style.backgroundColor = 88888
}

export default function Space( { numbers } ) {
  return (
    numbers.map(num => {
      return (
        <div key={uuidv4()}>
          <div key={num.id} onClick={handleClick}>{num.digit}</div>
        </div>
      )
    })
  )
}
