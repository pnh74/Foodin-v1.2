import React, { useState, useRef, useEffect } from 'react';
import { Restaurant } from '../types';
import { Heart, X, Star, MapPin, Info, ShieldCheck } from 'lucide-react';

interface SwipeCardProps {
  restaurant: Restaurant;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  active: boolean;
  isAutoSwiping: boolean;
  onToggleDetails: () => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ restaurant, onSwipe, active, isAutoSwiping, onToggleDetails }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  
  // Reset position when restaurant changes
  useEffect(() => {
    setOffset({ x: 0, y: 0 });
  }, [restaurant.id]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!active) return;
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    // Capture pointer to handle moves outside the div
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !active) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setOffset({ x: dx, y: dy });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || !active) return;
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);

    const threshold = 100;
    
    if (offset.y < -threshold) {
      onSwipe('up');
    } else if (offset.x > threshold) {
      onSwipe('right');
    } else if (offset.x < -threshold) {
      onSwipe('left');
    } else {
      // Reset
      setOffset({ x: 0, y: 0 });
    }
  };

  // Calculate opacity for overlays based on drag
  const rightOpacity = Math.max(0, Math.min(offset.x / 100, 1));
  const leftOpacity = Math.max(0, Math.min(-offset.x / 100, 1));
  const upOpacity = Math.max(0, Math.min(-offset.y / 100, 1));

  // Rotation based on X movement
  const rotation = offset.x / 10;

  return (
    <div
      ref={cardRef}
      className={`absolute inset-0 w-full h-full bg-black overflow-hidden shadow-2xl transition-transform duration-75 ease-linear ${!isDragging && 'transition-all duration-300'}`}
      style={{
        transform: active 
          ? `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg)` 
          : 'scale(0.95) translate(0, 0)',
        zIndex: active ? 10 : 0,
        opacity: active ? 1 : 0.5,
        touchAction: 'none' // Critical for pointer events on mobile
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Background Image/Video Simulation */}
      <img 
        src={restaurant.imageUrl} 
        alt={restaurant.name} 
        className="w-full h-full object-cover pointer-events-none"
        loading="eager"
      />
      
      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 pointer-events-none" />

      {/* Trust Score Badge */}
      <div className="absolute top-24 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-white/30">
        <ShieldCheck size={16} className="text-green-400" />
        <span className="text-sm font-bold">{restaurant.trustScore}% Trust</span>
      </div>

      {/* Swipe Feedback Overlays */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: rightOpacity }}>
        <div className="border-4 border-green-500 rounded-full p-8 bg-green-500/20 transform rotate-12">
           <Heart size={80} className="text-green-500 fill-green-500" />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: leftOpacity }}>
        <div className="border-4 border-red-500 rounded-full p-8 bg-red-500/20 transform -rotate-12">
           <X size={80} className="text-red-500" />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: upOpacity }}>
        <div className="border-4 border-yellow-400 rounded-full p-8 bg-yellow-400/20 transform">
           <Star size={80} className="text-yellow-400 fill-yellow-400" />
           <span className="block text-center text-yellow-400 font-bold text-xl mt-2">SUPER</span>
        </div>
      </div>

      {/* Info Content */}
      <div className="absolute bottom-28 left-0 right-0 p-5 text-white pointer-events-none">
        {/* Tri-Keyword */}
        <div className="inline-block px-3 py-1 bg-foodin-orange rounded-full text-xs font-bold mb-3 shadow-lg">
          {restaurant.triKeyword}
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-1 shadow-black drop-shadow-lg leading-tight">
              {restaurant.name}
            </h2>
            <div className="flex items-center gap-3 text-sm font-medium text-gray-200">
              <span className="flex items-center gap-1"><MapPin size={14} /> {restaurant.distance}</span>
              <span>•</span>
              <span>{restaurant.priceRange}</span>
              <span>•</span>
              <span className="text-yellow-400 flex items-center gap-1"><Star size={14} fill="currentColor" /> {restaurant.rating}</span>
            </div>
          </div>
          <button 
            onClick={(e) => {
              // Although pointer-events-none is on parent, we might enable pointer events for this button
              // But effectively on drag interaction, we handle tap separately or use this button via Z-index workaround
            }}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center pointer-events-auto active:scale-95 transition-transform"
            onPointerDown={(e) => {
               e.stopPropagation(); // Prevent drag start
               onToggleDetails();
            }}
          >
            <Info size={20} />
          </button>
        </div>
      </div>

      {/* Video Progress Bar Simulation */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
        <div 
            className={`h-full bg-white transition-all duration-[8000ms] ease-linear ${active && isAutoSwiping ? 'w-full' : 'w-0'}`} 
            style={{ width: active && isAutoSwiping ? '100%' : '0%' }}
        />
      </div>
    </div>
  );
};

export default SwipeCard;
