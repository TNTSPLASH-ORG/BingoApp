import React from 'react'
import Space from './Space'
import { v4 as uuidv4 } from 'uuid';

export default function BingoCol( { col } ) {
  return (
    <div>
      <Space key={uuidv4()} numbers={[1,2,3,4,5]} />
    </div>
  )
}
