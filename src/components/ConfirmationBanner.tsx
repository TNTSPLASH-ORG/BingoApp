import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme, GameMode } from '../types';
import { themes } from '../utils/themes';
import { Check, X } from 'lucide-react';

interface ConfirmationBannerProps {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  theme: Theme;
  gameMode: GameMode;
}

export const ConfirmationBanner: React.FC<ConfirmationBannerProps> = ({
  show,
  onCancel,
  onConfirm,
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
          <div className={`${themeStyles.card} p-8 rounded-xl shadow-2xl relative max-w-md w-full mx-4 flex-row`}>
            <h2 className={`${themeStyles.text} text-3xl font-bold mb-4 text-center`}>
              Are you sure you want to reset all cards?
            </h2>
            <div className={`flex flex-row gap-4`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCancel}
              className={`
                ${themeStyles.accent} ${themeStyles.text}
                py-2 px-3 sm:px-4 rounded-lg flex items-center gap-2 basis-1/2 justify-center
                text-sm sm:text-base font-semibold transition-colors duration-200
              `}
            >
              <X size={18} className="hidden sm:block" />
            Cancel
          </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onConfirm}
              className={`
                ${themeStyles.accent} ${themeStyles.text}
                py-2 px-3 sm:px-4 rounded-lg flex items-center gap-2 basis-1/2 justify-center
                text-sm sm:text-base font-semibold transition-colors duration-200
              `}
            >
              <Check size={18} className="hidden sm:block" />
            OK
          </motion.button>
          </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};