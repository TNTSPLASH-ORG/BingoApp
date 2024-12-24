import { BingoCard } from '../types';

export const findNumberInCard = (card: BingoCard, number: number): [number, number] | null => {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (card.numbers[row][col] === number) {
        return [row, col];
      }
    }
  }
  return null;
};

export const syncCardMarks = (
  cards: BingoCard[],
  activeCardId: string,
  clickedNumber: number,
  isMarked: boolean
): BingoCard[] => {
  return cards.map(card => {
    if (card.id === activeCardId) return card;

    const position = findNumberInCard(card, clickedNumber);
    if (!position) return card;

    const [row, col] = position;
    const newMarked = card.marked.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? isMarked : c)) : r
    );

    return { ...card, marked: newMarked };
  });
};