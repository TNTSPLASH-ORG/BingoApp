import { createRandom } from './random';
import { BingoCard } from '../types';

export const generateBingoCard = (seed?: number): number[][] => {
  const random = createRandom(seed ?? Math.floor(Math.random() * 2147483647));
  const card: number[][] = Array(5).fill(null).map(() => Array(5).fill(0));
  const used = new Set<number>();

  for (let col = 0; col < 5; col++) {
    const min = col * 15 + 1;
    const max = min + 14;
    const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

    for (let row = 0; row < 5; row++) {
      if (col === 2 && row === 2) {
        card[row][col] = 0; // Free space
        continue;
      }

      const remainingNumbers = numbers.filter(n => !used.has(n));
      const index = Math.floor(random() * remainingNumbers.length);
      const num = remainingNumbers[index];
      
      used.add(num);
      card[row][col] = num;
    }
  }

  return card;
};

export const createNewCard = (name: string, seed?: number): BingoCard => ({
  id: crypto.randomUUID(),
  name,
  numbers: generateBingoCard(seed),
  marked: Array(5).fill(null).map(() => Array(5).fill(false)),
});