import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme } from '../types';
import { themes } from '../utils/themes';
import { X } from 'lucide-react';

interface AdminPanelProps {
  show: boolean;
  onClose: () => void;
  theme: Theme;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ show, onClose, theme }) => {
  const themeStyles = themes[theme];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <div className={`${themeStyles.card} p-8 rounded-xl shadow-2xl relative max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto`}>
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 ${themeStyles.text} opacity-60 hover:opacity-100`}
            >
              <X size={24} />
            </button>
            <h2 className={`${themeStyles.text} text-2xl font-bold mb-6`}>
              Game Statistics
            </h2>
            <div className="space-y-4">
              <p className={`${themeStyles.text}`}>Coming soon...</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};