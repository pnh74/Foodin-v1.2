import React from 'react';
import { Restaurant } from '../types';
import { X, MapPin, Clock, DollarSign } from 'lucide-react';

interface DetailModalProps {
  restaurant: Restaurant;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ restaurant, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-[85vh] sm:h-auto sm:max-h-[80vh] rounded-t-3xl sm:rounded-3xl overflow-hidden relative flex flex-col animate-in slide-in-from-bottom duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-white backdrop-blur-md"
        >
          <X size={18} />
        </button>

        {/* Hero Image */}
        <div className="h-64 shrink-0 relative">
          <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
             <h2 className="text-3xl font-serif font-bold text-white">{restaurant.name}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 text-gray-800">
           <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">{restaurant.category}</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-semibold">{restaurant.trustScore}% Trust Score</span>
           </div>

           <p className="text-gray-600 mb-6 leading-relaxed">
             {restaurant.description}
           </p>

           <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-gray-700">
                 <MapPin className="text-foodin-orange" size={20} />
                 <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                 <Clock className="text-foodin-orange" size={20} />
                 <span>Open Now • 10:00 - 22:00</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                 <DollarSign className="text-foodin-orange" size={20} />
                 <span>{restaurant.priceRange} • Approx. 200k/person</span>
              </div>
           </div>

           <h3 className="font-bold text-lg mb-3">Menu Highlights</h3>
           <ul className="space-y-2">
             {restaurant.menuHighlights.map((item, idx) => (
               <li key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2">
                 <span>{item}</span>
                 <span className="text-foodin-orange text-sm font-medium">Recommended</span>
               </li>
             ))}
           </ul>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3 shrink-0">
           <button className="flex-1 py-3 rounded-xl font-bold bg-gray-200 text-gray-800" onClick={onClose}>Close</button>
           <button className="flex-1 py-3 rounded-xl font-bold bg-foodin-orange text-white shadow-lg shadow-orange-200">Book Table</button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
