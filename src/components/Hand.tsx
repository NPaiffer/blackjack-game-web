import React from 'react';
import { Card as CardType } from '../types';
import Card from './Card';

interface HandProps {
  cards: CardType[];
  handType: string;
}

const Hand: React.FC<HandProps> = ({ cards, handType }) => {
  return (
    <div className="flex justify-center space-x-4">
      {cards.map((card, index) => (
        <Card key={index} value={card.value} suit={card.suit} />
      ))}
    </div>
  );
};

export default Hand;
