import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BingoCard as BingoCardType, Theme, GameMode } from './types';
import { BingoCard } from './components/BingoCard';
import { CardList } from './components/CardList';
import { ThemeSelector } from './components/ThemeSelector';
import { GameControls } from './components/GameControls';
import { WinBanner } from './components/WinBanner';
import { AdminPanel } from './components/AdminPanel';
import { createNewCard } from './utils/bingoUtils';
import { themes } from './utils/themes';
import { Settings } from 'lucide-react';
import { checkForWin } from './utils/gameLogic';
import { useGameServer } from './hooks/useGameServer';
import { syncCardMarks } from './utils/cardSync';

function App() {
  const { seed, error, requestNewSeed } = useGameServer();
  const [theme, setTheme] = useState<Theme>('dracula');
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [showWinBanner, setShowWinBanner] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cards, setCards] = useState<BingoCardType[]>(() => {
    const saved = localStorage.getItem('bingoCards');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeCardId, setActiveCardId] = useState<string>('');
  
  const themeStyles = themes[theme];
  const activeCard = cards.find(card => card.id === activeCardId);

  useEffect(() => {
    if (seed && cards.length === 0) {
      const newCard = createNewCard(`Card ${cards.length + 1}`, seed);
      setCards([newCard]);
      setActiveCardId(newCard.id);
    }
  }, [seed, cards.length]);

  useEffect(() => {
    localStorage.setItem('bingoCards', JSON.stringify(cards));
  }, [cards]);

  const handleAddCard = async () => {
    if (!requestNewSeed) return;
    
    setIsAddingCard(true);
    try {
      const newSeed = await requestNewSeed();
      if (newSeed) {
        const newCard = createNewCard(`Card ${cards.length + 1}`, newSeed);
        setCards([...cards, newCard]);
        setActiveCardId(newCard.id);
      }
    } finally {
      setIsAddingCard(false);
    }
  };

  const handleCellClick = (row: number, col: number, number: number) => {
    if (!activeCard) return;

    const newMarked = activeCard.marked.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? !c : c)) : r
    );

    const isMarked = newMarked[row][col];
    const newCards = syncCardMarks(cards, activeCardId, number, isMarked).map(card => {
      if (card.id !== activeCardId) return card;
      return { ...card, marked: newMarked };
    });

    if (checkForWin(newMarked, gameMode)) {
      setShowWinBanner(true);
    }

    setCards(newCards);
  };

  if (error) {
    return (
      <div className={`min-h-screen ${themeStyles.bg} flex items-center justify-center p-4`}>
        <div className={`${themeStyles.text} text-xl text-center`}>Error: {error}</div>
      </div>
    );
  }

  if (!seed) {
    return (
      <div className={`min-h-screen ${themeStyles.bg} flex items-center justify-center p-4`}>
        <div className={`${themeStyles.text} text-xl text-center`}>Loading game...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeStyles.bg} p-4 sm:p-8`}>
      <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />

      <div className="max-w-6xl mx-auto">
        <GameControls
          theme={theme}
          gameMode={gameMode}
          onGameModeChange={setGameMode}
          onReset={() => {
            if (seed) {
              const newCard = createNewCard(`Seed: ${seed}`, seed);
              setCards([newCard]);
              setActiveCardId(newCard.id);
            }
          }}
          onAddCard={handleAddCard}
          isAddingCard={isAddingCard}
        />

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <CardList
            cards={cards}
            activeCardId={activeCardId}
            onCardSelect={setActiveCardId}
            onCardDelete={(id) => {
              const newCards = cards.filter(card => card.id !== id);
              setCards(newCards);
              if (id === activeCardId && newCards.length > 0) {
                setActiveCardId(newCards[0].id);
              }
            }}
            theme={theme}
          />

          {activeCard && (
            <div className="flex-1 flex justify-center">
              <BingoCard
                numbers={activeCard.numbers}
                marked={activeCard.marked}
                onCellClick={handleCellClick}
                theme={theme}
              />
            </div>
          )}
        </div>
      </div>

      <WinBanner
        show={showWinBanner}
        onClose={() => setShowWinBanner(false)}
        theme={theme}
        gameMode={gameMode}
      />
    </div>
  );
}

export default App;