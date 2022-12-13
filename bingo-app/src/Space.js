import React from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function Space( { numbers } ) {
  return (
    numbers.map(num => {
      return (
        <>
        <div key={uuidv4()}>{num}</div>
        </>
      )
    })
  )
}
