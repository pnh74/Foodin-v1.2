import React from 'react';
import { X, Heart, Star, Zap } from 'lucide-react';

interface ActionButtonsProps {
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSwipe }) => {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-30 flex justify-center items-center gap-6 pointer-events-none">
      
      {/* Swipe Left (Pass) */}
      <button 
        onClick={() => onSwipe('left')}
        className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-red-500 pointer-events-auto transform hover:scale-110 active:scale-95 transition-all"
        aria-label="Pass"
      >
        <X size={28} strokeWidth={3} />
      </button>

      {/* Super Like */}
      <button 
        onClick={() => onSwipe('up')}
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 shadow-xl flex items-center justify-center text-white pointer-events-auto transform hover:scale-110 active:scale-95 transition-all mb-4"
        aria-label="Super Like"
      >
        <Star size={20} fill="currentColor" />
      </button>

      {/* Swipe Right (Like) */}
      <button 
        onClick={() => onSwipe('right')}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-green-400 to-green-600 shadow-xl flex items-center justify-center text-white pointer-events-auto transform hover:scale-110 active:scale-95 transition-all"
        aria-label="Like"
      >
        <Heart size={28} fill="currentColor" />
      </button>

    </div>
  );
};

export default ActionButtons;
