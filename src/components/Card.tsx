import React from 'react';
import { motion } from 'framer-motion';
import { Card as CardType } from '../types';

const Card: React.FC<CardType> = ({ value, suit }) => {
  const suitSymbols: Record<string, string> = {
    spades: '♠️',
    hearts: '♥️',
    diamonds: '♦️',
    clubs: '♣️',
  };

  return (
    <motion.div
      className="bg-white text-black p-4 rounded-lg shadow-lg w-20 h-32 flex flex-col items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="text-xl font-bold">{value}</div>
      <div className="text-2xl">{suitSymbols[suit]}</div>
    </motion.div>
  );
};

export default Card;
