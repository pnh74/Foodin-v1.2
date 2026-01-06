export interface Restaurant {
  id: string;
  name: string;
  description: string;
  category: string;
  triKeyword: string; // e.g., "Cozy - Coffee - D1"
  imageUrl: string; // Simulating video thumbnail/content
  rating: number;
  trustScore: number;
  distance: string;
  priceRange: string;
  address: string;
  menuHighlights: string[];
}

export interface SwipeAction {
  restaurantId: string;
  direction: 'left' | 'right' | 'up';
}

export enum ViewState {
  DISCOVERY = 'DISCOVERY',
  DETAILS = 'DETAILS',
  AI_CHAT = 'AI_CHAT',
  PROFILE = 'PROFILE'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}
