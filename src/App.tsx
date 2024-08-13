import React, { useState, useEffect } from 'react';
import Hand from './components/Hand';
import Menu from './components/Menu';
import { createDeck } from './components/Deck';
import { Card } from './types';

const App: React.FC = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (!showMenu) {
      resetGame();
    }
  }, [showMenu]);

  const startGame = () => {
    setShowMenu(false);
    resetGame();
  };

  const resetGame = () => {
    const newDeck = createDeck();
    setDeck(newDeck);
    setPlayerHand([newDeck.pop()!, newDeck.pop()!]);
    setDealerHand([newDeck.pop()!]);
    setGameOver(false);
    setResult(null);
  };

  const hit = () => {
    const newPlayerHand = [...playerHand, deck.pop()!];
    setPlayerHand(newPlayerHand);
    if (calculateHandValue(newPlayerHand) > 21) {
      setGameOver(true);
      setResult('Jogador Estourou! Dealer Ganhou!');
    }
  };

  const stand = () => {
    let newDealerHand = [...dealerHand];
    while (calculateHandValue(newDealerHand) < 17) {
      newDealerHand.push(deck.pop()!);
    }
    setDealerHand(newDealerHand);

    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(newDealerHand);

    let resultMessage;
    if (dealerValue > 21) {
      resultMessage = 'Dealer Estourou! Jogador Ganhou!';
    } else if (playerValue > dealerValue) {
      resultMessage = 'Jogador Ganhou!';
    } else if (playerValue < dealerValue) {
      resultMessage = 'Dealer Ganhou!';
    } else {
      resultMessage = 'Empate!';
    }

    setGameOver(true);
    setResult(resultMessage);
  };

  const calculateHandValue = (hand: Card[]): number => {
    let value = 0;
    let aces = 0;
  
    hand.forEach(card => {
      if (card.value === 'A') {
        aces += 1;
        value += 11;
      } else if (['K', 'Q', 'J'].includes(card.value)) {
        value += 10;
      } else {
        value += parseInt(card.value);
      }
    });
  
    while (value > 21 && aces > 0) {
      value -= 10;
      aces -= 1;
    }
  
    return value;
  };

  if (showMenu) {
    return <Menu startGame={startGame} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-700 text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Blackjack</h1>

      <div className="w-full max-w-lg mb-12">
        <h2 className="text-2xl mb-4 text-center">Dealer</h2>
        <Hand cards={dealerHand} handType="dealer" />
      </div>

      <div className="w-full max-w-lg mb-12">
        <h2 className="text-2xl mb-4 text-center">Player</h2>
        <Hand cards={playerHand} handType="player" />
      </div>

      {gameOver ? (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-xl font-bold">{result}</p>
          <button onClick={resetGame} className="bg-blue-500 hover:bg-blue-700 px-6 py-3 rounded text-lg font-semibold">
            Jogar Novamente
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <button onClick={hit} className="bg-blue-500 hover:bg-blue-700 px-6 py-3 rounded text-lg font-semibold">Pedir</button>
          <button onClick={stand} className="bg-red-500 hover:bg-red-700 px-6 py-3 rounded text-lg font-semibold">Parar</button>
        </div>
      )}
    </div>
  );
};

export default App;
