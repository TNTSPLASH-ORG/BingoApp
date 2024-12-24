export interface BingoCard {
  id: string;
  name: string;
  numbers: number[][];
  marked: boolean[][];
}

export type Theme = 'dracula' | 'nord' | 'dark' | 'light' | 'monokai';

export type GameMode = 'classic' | 'blackout';