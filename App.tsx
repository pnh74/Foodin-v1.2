import React, { useState, useEffect, useCallback } from 'react';
import { MOCK_RESTAURANTS } from './constants';
import { ViewState } from './types';
import SwipeCard from './components/SwipeCard';
import ActionButtons from './components/ActionButtons';
import Navbar from './components/Navbar';
import DetailModal from './components/DetailModal';
import AIChatOverlay from './components/AIChatOverlay';

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState(MOCK_RESTAURANTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewState, setViewState] = useState<ViewState>(ViewState.DISCOVERY);
  const [isAutoSwipe, setIsAutoSwipe] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Auto Swipe Logic
  const handleAutoSwipe = useCallback(() => {
    if (currentIndex < restaurants.length) {
      handleSwipe('right');
    } else {
      setIsAutoSwipe(false); // Stop if no more cards
    }
  }, [currentIndex, restaurants.length]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoSwipe && !showDetails && viewState === ViewState.DISCOVERY) {
      interval = setInterval(handleAutoSwipe, 4000); // 4 seconds for demo purposes (PRD says 8s but that's slow for testing)
    }
    return () => clearInterval(interval);
  }, [isAutoSwipe, showDetails, viewState, handleAutoSwipe]);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    // Haptic feedback
    if (navigator.vibrate) {
      if (direction === 'up') navigator.vibrate([50, 50, 50]);
      else navigator.vibrate(50);
    }

    console.log(`Swiped ${direction} on ${restaurants[currentIndex]?.name}`);

    // Delay index change slightly to allow animation to complete visually in SwipeCard
    // Note: In a real app, we'd manage the "exit" animation state here. 
    // For simplicity, we assume the Card component handles the visual drag, 
    // and we jump to next card shortly after.
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 200);
  };

  const currentRestaurant = restaurants[currentIndex];

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden font-sans">
      
      {/* Main View: Discovery Swipe */}
      {viewState === ViewState.DISCOVERY && (
        <>
          <Navbar 
            activeView={viewState} 
            onViewChange={setViewState}
            isAutoSwipe={isAutoSwipe}
            toggleAutoSwipe={() => setIsAutoSwipe(!isAutoSwipe)}
          />

          <div className="relative w-full h-full">
            {currentRestaurant ? (
              // We render the current card and the next one below it for performance
              restaurants.slice(currentIndex, currentIndex + 2).reverse().map((restaurant, index) => {
                const isTopCard = index === 1; // slice returns [current, next]. reverse makes next first in DOM (bottom), current last (top)
                // Actually, let's just render logic simply:
                // Map over slice. If it's the current index, it's active.
                // Wait, logic above: slice(0, 2) -> [0, 1]. reverse -> [1, 0]. 
                // Render 1 (next), then 0 (current on top).
                const actualIndex = currentIndex + (1 - index);
                
                return (
                  <SwipeCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    onSwipe={handleSwipe}
                    active={actualIndex === currentIndex}
                    isAutoSwiping={isAutoSwipe}
                    onToggleDetails={() => setShowDetails(true)}
                  />
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white p-10 text-center">
                <h2 className="text-3xl font-serif font-bold mb-4">You're all caught up!</h2>
                <p className="text-gray-400 mb-8">We are finding more delicious spots for you.</p>
                <button 
                  onClick={() => {
                    setCurrentIndex(0);
                    setRestaurants([...MOCK_RESTAURANTS].sort(() => Math.random() - 0.5));
                  }}
                  className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition"
                >
                  Refresh Discovery
                </button>
              </div>
            )}
          </div>

          {currentRestaurant && !showDetails && (
            <ActionButtons onSwipe={handleSwipe} />
          )}
        </>
      )}

      {/* Detail Modal */}
      {showDetails && currentRestaurant && (
        <DetailModal 
          restaurant={currentRestaurant} 
          onClose={() => setShowDetails(false)} 
        />
      )}

      {/* AI Chat Overlay */}
      {viewState === ViewState.AI_CHAT && (
        <AIChatOverlay onClose={() => setViewState(ViewState.DISCOVERY)} />
      )}

    </div>
  );
};

export default App;