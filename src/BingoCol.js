import React from 'react'
import Space from './Space'

export default function BingoCol(props) {
  return (
    props.nums.map((num) => {
      return (
          <Space
            key={num.id}
            id={num.id}
            num={num.digit}
            backgroundColor={num.backgroundColor}
            toggleBackground={props.toggleBackground}
          />
      );
    })
  );
}
