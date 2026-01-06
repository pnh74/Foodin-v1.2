import { Restaurant } from './types';

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Cục Gạch Quán',
    description: 'Traditional Vietnamese cuisine in a nostalgic, French-colonial villa setting. Famous for its authenticity.',
    category: 'Vietnamese',
    triKeyword: 'Nostalgic - Family - D1',
    imageUrl: 'https://picsum.photos/seed/foodin1/600/1000',
    rating: 4.8,
    trustScore: 98,
    distance: '1.2 km',
    priceRange: '$$$',
    address: '10 Dang Tat, District 1, HCMC',
    menuHighlights: ['Fried Tofu with Lemongrass', 'Soft Shell Crab', 'Claypot Pork']
  },
  {
    id: '2',
    name: 'Pizza 4P\'s Ben Thanh',
    description: 'Japanese-Italian fusion pizza with house-made cheese. A modern classic in Vietnam.',
    category: 'Pizza/Italian',
    triKeyword: 'Modern - Cheese - D1',
    imageUrl: 'https://picsum.photos/seed/foodin2/600/1000',
    rating: 4.9,
    trustScore: 99,
    distance: '0.5 km',
    priceRange: '$$$',
    address: '8 Thu Khoa Huan, District 1, HCMC',
    menuHighlights: ['Burrata Parma Ham Pizza', 'Crab Tomato Cream Spaghetti', 'Camembert']
  },
  {
    id: '3',
    name: 'Bánh Mì Huỳnh Hoa',
    description: 'The most famous Bánh Mì in Saigon. Heavy on meat, pâté, and flavor.',
    category: 'Street Food',
    triKeyword: 'Iconic - Meat - D1',
    imageUrl: 'https://picsum.photos/seed/foodin3/600/1000',
    rating: 4.5,
    trustScore: 92,
    distance: '2.0 km',
    priceRange: '$',
    address: '26 Le Thi Rieng, District 1, HCMC',
    menuHighlights: ['Bánh Mì Đặc Biệt']
  },
  {
    id: '4',
    name: 'The Workshop Coffee',
    description: 'Specialty coffee roaster in a high-ceiling industrial loft. Perfect for working.',
    category: 'Cafe',
    triKeyword: 'Workspace - Specialty - D1',
    imageUrl: 'https://picsum.photos/seed/foodin4/600/1000',
    rating: 4.6,
    trustScore: 95,
    distance: '0.8 km',
    priceRange: '$$',
    address: '27 Ngo Duc Ke, District 1, HCMC',
    menuHighlights: ['Cold Brew', 'V60 Pour Over', 'Pasta']
  },
  {
    id: '5',
    name: 'Anan Saigon',
    description: 'Michelin-starred modern Vietnamese cuisine. Innovative takes on street food classics.',
    category: 'Fine Dining',
    triKeyword: 'Michelin - Innovative - D1',
    imageUrl: 'https://picsum.photos/seed/foodin5/600/1000',
    rating: 4.7,
    trustScore: 97,
    distance: '1.5 km',
    priceRange: '$$$$',
    address: '89 Ton That Dam, District 1, HCMC',
    menuHighlights: ['Banh Xeo Taco', 'Da Lat Pizza', 'Pho Pot Au Feu']
  }
];
