import React from 'react';

interface MenuProps {
  startGame: () => void;
}

const Menu: React.FC<MenuProps> = ({ startGame }) => {
  return (
    <div
      onClick={startGame}
      className="min-h-screen flex flex-col items-center justify-center bg-green-700 text-white relative overflow-hidden"
    >
      <h1 className="text-6xl font-bold mb-8 animate-fadeInDown">Blackjack</h1>

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-white rounded-full absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
