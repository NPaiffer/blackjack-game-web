export type Suit =  'hearts' | 'diamonds' | 'clubs' | 'spades';

export type Card = {
    value: string;
    suit: Suit;
};

export type HandType = 'player' | 'dealer';