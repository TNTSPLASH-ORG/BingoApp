import React, { useState } from 'react';
import { Theme } from '../types';
import { themes } from '../utils/themes.ts';
import { Palette } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const themeStyles = themes[currentTheme];  // Get styles for the currently selected theme

  const handleThemeChange = (theme: Theme) => {
    onThemeChange(theme);
    setIsOpen(false);  // Close the dropdown after selection
  };

  return (
    <div className="fixed top-4 right-4">
      {/* Icon Button to open the theme selector */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`p-2 rounded-full ${themeStyles.card} shadow-lg`}
      >
        <Palette className={themeStyles.text} size={24} />
      </button>

      {/* Dropdown menu when isOpen is true */}
      {isOpen && (
        <div
          className={`absolute top-10 right-0 w-48 mt-2 rounded-lg shadow-lg ${themeStyles.card}`}
          style={{ zIndex: 1000 }}
        >
          <ul className="flex flex-col p-2">
            {Object.keys(themes).map((theme) => {
              const selectedThemeStyles = themes[theme as Theme];
              return (
                <li key={theme}>
                  <button
                    onClick={() => handleThemeChange(theme as Theme)}
                    className={`w-full text-left py-1 px-2 rounded focus:outline-none`}
                    style={{
                      color: themes[currentTheme].menuText, // Dynamic text color from selected theme
                      backgroundColor: theme === currentTheme 
                        ? selectedThemeStyles.card // Highlight the selected theme with its card color
                        : 'transparent', 
                      transition: 'background-color 0.2s ease, color 0.2s ease', // Smooth transition for color changes
                    }}
                    onMouseEnter={(e) => {
                      // Dynamically change background color and text color on hover
                      e.currentTarget.style.backgroundColor = selectedThemeStyles.card;
                      e.currentTarget.style.color = selectedThemeStyles.text;
                    }}
                    onMouseLeave={(e) => {
                      // Reset to original styles when not hovering
                      if (theme !== currentTheme) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = selectedThemeStyles.text;
                      }
                    }}
                  >
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
