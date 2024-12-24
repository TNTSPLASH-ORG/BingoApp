import { motion } from 'framer-motion';
import React from 'react';
import { Theme } from '../types';
import { themes } from '../utils/themes';

interface BingoCellProps {
  number: number;
  marked: boolean;
  onClick: () => void;
  theme: Theme;
}

export const BingoCell: React.FC<BingoCellProps> = ({ number, marked, onClick, theme }) => {
  const themeStyles = themes[theme];
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center font-bold text-base sm:text-xl
        transition-colors duration-200
        ${marked ? themeStyles.marked : themeStyles.card}
        ${themeStyles.text}
        ${!marked && themeStyles.hover}
      `}
    >
      {number === 0 ? 'FREE' : number}
    </motion.button>
  );
};