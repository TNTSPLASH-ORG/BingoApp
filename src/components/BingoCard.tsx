import React from 'react';
import { BingoCell } from './BingoCell.tsx';
import { Theme } from '../types';
import { themes } from '../utils/themes.ts';

interface BingoCardProps {
  numbers: number[][];
  marked: boolean[][];
  onCellClick: (row: number, col: number, number: number) => void;
  theme: Theme;
}

export const BingoCard: React.FC<BingoCardProps> = ({ numbers, marked, onCellClick, theme }) => {
  const themeStyles = themes[theme];

  return (
    <div className={`p-2 sm:p-4 rounded-xl ${themeStyles.card} shadow-xl h-fit w-full max-w-[400px]`}>
      <div className="grid grid-cols-5 gap-1 sm:gap-2">
        {['B', 'I', 'N', 'G', 'O'].map((letter) => (
          <div
            key={letter}
            className={`text-3xl font-bold text-center ${themeStyles.text} h-6 sm:h-8 flex items-center justify-center`}
          >
            {letter}
          </div>
        ))}
        {numbers.map((row, rowIndex) =>
          row.map((number, colIndex) => (
            <BingoCell
              key={`${rowIndex}-${colIndex}`}
              number={number}
              marked={marked[rowIndex][colIndex]}
              onClick={() => onCellClick(rowIndex, colIndex, number)}
              theme={theme}
            />
          ))
        )}
      </div>
    </div>
  );
};