import { useEffect, useState } from 'react';

import { sessionStorageHandler } from 'utils';

const getStoredNumberOfLoadedCardsOrDefault = (defaultValue: number): number => {
  return parseInt(sessionStorageHandler('get', 'explore-filters', 'slicedLands')) || defaultValue;
};

// TODO: reworked it using useSessionStorage hook
const useNumberOfLoadedCards = (
  initialNumberOfCards: number
): [number, React.Dispatch<React.SetStateAction<number>>] => {
  const [numberOfLoadedCards, setNumberOfLoadedCards] = useState(() => {
    return getStoredNumberOfLoadedCardsOrDefault(initialNumberOfCards);
  });

  useEffect(() => {
    sessionStorageHandler('set', 'explore-filters', 'slicedLands', numberOfLoadedCards);
  }, [numberOfLoadedCards]);

  useEffect(() => {
    const storedNumberOfLoadedCards = getStoredNumberOfLoadedCardsOrDefault(initialNumberOfCards);

    setNumberOfLoadedCards(
      storedNumberOfLoadedCards > initialNumberOfCards ? storedNumberOfLoadedCards : initialNumberOfCards
    );
  }, [initialNumberOfCards]);

  return [numberOfLoadedCards, setNumberOfLoadedCards];
};

export default useNumberOfLoadedCards;
