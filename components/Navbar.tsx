import React from 'react';
import { ViewState } from '../types';
import { Play, Pause, Search } from 'lucide-react';

interface NavbarProps {
  activeView: ViewState;
  onViewChange: (view: ViewState) => void;
  isAutoSwipe: boolean;
  toggleAutoSwipe: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, onViewChange, isAutoSwipe, toggleAutoSwipe }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 p-4 pt- safe-top flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="text-2xl font-serif font-bold text-white tracking-tight">
          Foodin<span className="text-foodin-orange">.</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Auto Swipe Toggle */}
        <button 
          onClick={toggleAutoSwipe}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md transition-colors ${isAutoSwipe ? 'bg-foodin-orange text-white' : 'bg-white/20 text-white'}`}
        >
          {isAutoSwipe ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
          <span className="text-xs font-bold uppercase tracking-wide">
            {isAutoSwipe ? 'Auto' : 'Auto'}
          </span>
        </button>

        {/* AI Search Trigger */}
        <button 
          onClick={() => onViewChange(ViewState.AI_CHAT)}
          className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-transform"
        >
          <Search size={18} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
