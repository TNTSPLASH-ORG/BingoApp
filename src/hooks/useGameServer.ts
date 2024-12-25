import { useState, useEffect } from 'react';

export const useGameServer = () => {
  const [seed, setSeed] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestNewSeed = () => {
    // Generate a random seed client-side
    const newSeed = Math.floor(Math.random() * 2147483647);
    setSeed(newSeed);
    return newSeed;
  };

  useEffect(() => {
    requestNewSeed();
  }, []);

  return { seed, error, requestNewSeed };
};