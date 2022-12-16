import React from 'react'

function handleClick(e) {
  e.target.style.backgroundColor = 88888
}

export default function Space( { numbers } ) {
  return (
    numbers.map(num => {
      return (
        <>
        <div onClick={handleClick}>{num}</div>
        </>
      )
    })
  )
}
