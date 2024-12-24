import React from 'react';
import { Theme, GameMode } from '../types';
import { themes } from '../utils/themes';
import { RotateCcw, Grid2X2, Plus, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameControlsProps {
  theme: Theme;
  gameMode: GameMode;
  onGameModeChange: (mode: GameMode) => void;
  onReset: () => void;
  onAddCard?: () => void;
  isAddingCard?: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  theme,
  gameMode,
  onGameModeChange,
  onReset,
  onAddCard,
  isAddingCard,
}) => {
  const themeStyles = themes[theme];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className={`
          ${themeStyles.accent} ${themeStyles.text}
          py-2 px-3 sm:px-4 rounded-lg flex items-center gap-2
          text-sm sm:text-base font-semibold transition-colors duration-200
        `}
      >
        <RotateCcw size={18} className="hidden sm:block" />
        Reset
      </motion.button>

      {onAddCard && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddCard}
          disabled={isAddingCard}
          className={`
            ${themeStyles.accent} ${themeStyles.text}
            py-2 px-3 sm:px-4 rounded-lg flex items-center gap-2
            text-sm sm:text-base font-semibold transition-colors duration-200
            ${isAddingCard ? 'opacity-70 cursor-not-allowed' : ''}
          `}
        >
          {isAddingCard ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Plus size={18} />
          )}
          Add Card
        </motion.button>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onGameModeChange(gameMode === 'classic' ? 'blackout' : 'classic')}
        className={`
          ${themeStyles.accent} ${themeStyles.text}
          py-2 px-3 sm:px-4 rounded-lg flex items-center gap-2
          text-sm sm:text-base font-semibold transition-colors duration-200
        `}
      >
        <Grid2X2 size={18} className="hidden sm:block" />
        {gameMode === 'classic' ? 'Blackout' : 'Classic'}
      </motion.button>
    </div>
  );
};