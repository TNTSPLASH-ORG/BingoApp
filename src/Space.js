import React from 'react'

export default function Space( { numbers } ) {
  return (
    numbers.map(num => {
      return (
        <>
        <div>{num}</div>
        </>
      )
    })
  )
}
