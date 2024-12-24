import { GameMode } from '../types';

const checkLine = (marked: boolean[][]): boolean => {
  // Check rows
  for (let i = 0; i < 5; i++) {
    if (marked[i].every(cell => cell)) return true;
  }

  // Check columns
  for (let i = 0; i < 5; i++) {
    if (marked.every(row => row[i])) return true;
  }

  // Check diagonals
  if (marked.every((row, i) => row[i])) return true;
  if (marked.every((row, i) => row[4 - i])) return true;

  return false;
};

const checkBlackout = (marked: boolean[][]): boolean => {
  return marked.every(row => row.every(cell => cell));
};

export const checkForWin = (marked: boolean[][], mode: GameMode): boolean => {
  if (mode === 'classic') {
    return checkLine(marked);
  } else {
    return checkBlackout(marked);
  }
};