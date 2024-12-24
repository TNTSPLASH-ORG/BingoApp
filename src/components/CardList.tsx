import React from 'react';
import { motion } from 'framer-motion';
import { BingoCard, Theme } from '../types';
import { themes } from '../utils/themes';
import { Trash2 } from 'lucide-react';

interface CardListProps {
  cards: BingoCard[];
  activeCardId: string;
  onCardSelect: (id: string) => void;
  onCardDelete: (id: string) => void;
  theme: Theme;
}

export const CardList: React.FC<CardListProps> = ({
  cards,
  activeCardId,
  onCardSelect,
  onCardDelete,
  theme,
}) => {
  const themeStyles = themes[theme];

  return (
    <div className={`w-full lg:w-64 ${themeStyles.card} rounded-xl p-4 lg:h-[600px] overflow-y-auto`}>
      <h2 className={`text-xl font-bold mb-4 ${themeStyles.text}`}>Your Cards</h2>
      <div className="space-y-2">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.02 }}
            className={`
              p-3 rounded-lg cursor-pointer flex justify-between items-center
              ${card.id === activeCardId ? themeStyles.accent : themeStyles.card}
              ${themeStyles.hover} ${themeStyles.text}
            `}
            onClick={() => onCardSelect(card.id)}
          >
            <span>{card.name}</span>
            {cards.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCardDelete(card.id);
                }}
                className="opacity-60 hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};