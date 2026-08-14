import toast from 'react-hot-toast';
import { MOTIVATIONAL_QUOTES } from '../data/motivationQuotes';
import { Flame } from 'lucide-react';
import React from 'react';

export const useMotivation = () => {
  const triggerMotivation = () => {
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    
    toast(randomQuote, {
      icon: '🔥',
      style: {
        borderRadius: '16px',
        background: '#1e293b',
        color: '#fff',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)',
        padding: '16px 24px',
        fontSize: '15px',
        fontWeight: '500',
        lineHeight: '1.5',
        maxWidth: '450px',
      },
      position: 'bottom-right',
      duration: 5000,
    });
  };

  return { triggerMotivation };
};
