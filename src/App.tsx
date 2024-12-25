import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BingoCard as BingoCardType, Theme, GameMode } from './types';
import { BingoCard } from './components/BingoCard.tsx';
import { CardList } from './components/CardList.tsx';
import { ThemeSelector } from './components/ThemeSelector.tsx';
import { GameControls } from './components/GameControls.tsx';
import { WinBanner } from './components/WinBanner.tsx';
import { ConfirmationBanner } from './components/ConfirmationBanner.tsx';
import { createNewCard } from './utils/bingoUtils.ts';
import { themes } from './utils/themes.ts';
import { checkForWin } from './utils/gameLogic.ts';
import { useGameServer } from './hooks/useGameServer.ts';
import { syncCardMarks } from './utils/cardSync.ts';

function App() {
  const { seed, error, requestNewSeed } = useGameServer();
  const [theme, setTheme] = useState<Theme>('dracula');
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [showWinBanner, setShowWinBanner] = useState(false);
  const [showConfirmationBanner, setShowConfirmationBanner] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
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
      newCard.marked[2][2] = true;
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
      const newSeed = requestNewSeed();
      if (newSeed) {
        const newCard = createNewCard(`Card ${cards.length + 1}`, newSeed);
        newCard.marked[2][2] = true;
        setCards([...cards, newCard]);
        setActiveCardId(newCard.id);
        console.log(newCard);
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

  const updateCardNames = cards => {
    const newCards = cards.map((card, index) => ({
      ...card,
      name: `Card ${index + 1}`
    }));
    
    return newCards;
  };

  const resetCards = () => {
    const newSeed = requestNewSeed();
    if (newSeed) {
      const newCard = createNewCard(`Card ${1}`, newSeed);
      newCard.marked[2][2] = true;
      setCards([newCard]);
      setActiveCardId(newCard.id);
    }
  }

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
            setShowConfirmationBanner(true);
            if(confirmed) {
              const newSeed = requestNewSeed();
              if (newSeed) {
                const newCard = createNewCard(`Card ${1}`, newSeed);
                newCard.marked[2][2] = true;
                setCards([newCard]);
                setActiveCardId(newCard.id);
              }
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
              const updatedCards = updateCardNames(newCards);
              
              setCards(updatedCards);
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
      <ConfirmationBanner
        show={showConfirmationBanner}
        onConfirm={() => {
          setShowConfirmationBanner(false);
          resetCards();
        }}
        onCancel={() => setShowConfirmationBanner(false)}
        theme={theme}
        gameMode={gameMode}
      />
    </div>
  );
}

export default App;