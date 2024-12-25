import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme, GameMode } from '../types';
import { themes } from '../utils/themes.ts';
import { X } from 'lucide-react';

interface WinBannerProps {
  show: boolean;
  onClose: () => void;
  theme: Theme;
  gameMode: GameMode;
}

export const WinBanner: React.FC<WinBannerProps> = ({
  show,
  onClose,
  theme,
  gameMode,
}) => {
  const themeStyles = themes[theme];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <div className={`${themeStyles.card} p-8 rounded-xl shadow-2xl relative max-w-md w-full mx-4`}>
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 ${themeStyles.text} opacity-60 hover:opacity-100`}
            >
              <X size={24} />
            </button>
            <h2 className={`${themeStyles.text} text-3xl font-bold mb-4 text-center`}>
              🎉 BINGO! 🎉
            </h2>
            <p className={`${themeStyles.text} text-xl text-center`}>
              Congratulations! You've won with a{' '}
              {gameMode === 'classic' ? 'line' : 'blackout'}!
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};