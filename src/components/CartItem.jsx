import { useState } from 'react';
import { Heart, ShoppingCart, Star, Trash2, Plus, Minus } from 'lucide-react';

function CartItem({ id, name, price, quantity, category, image, rating, description, incrementQuantity, decrementQuantity, deleteItemFromCart, addToWishlist, toggleSelect, isSelected }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors = {
    Electronics: { bg: 'bg-blue-500', text: 'text-white', gradient: 'from-blue-500 to-cyan-500' },
    Accessories: { bg: 'bg-green-500', text: 'text-white', gradient: 'from-green-500 to-emerald-500' },
    Clothing: { bg: 'bg-pink-500', text: 'text-white', gradient: 'from-pink-500 to-rose-500' },
    Footwear: { bg: 'bg-orange-500', text: 'text-white', gradient: 'from-orange-500 to-amber-500' },
    Appliances: { bg: 'bg-red-500', text: 'text-white', gradient: 'from-red-500 to-pink-500' },
  };

  const categoryIcons = {
    Electronics: '💻',
    Clothing: '👕',
    Accessories: '🎧',
    Footwear: '👟',
    Appliances: '🔌',
  };

  return (
    <div 
      className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 ${isSelected ? 'ring-4 ring-blue-400 ring-opacity-50' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-4 right-4 z-20">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={toggleSelect}
          className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded-full focus:ring-blue-500 focus:ring-2 transition-all duration-200"
        />
      </div>

      {/* Wishlist Button */}
      <button
        onClick={addToWishlist}
        className="absolute top-4 left-4 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 hover:text-red-500 transition-all duration-200 transform hover:scale-110"
      >
        <Heart className="w-4 h-4" />
      </button>

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'; }}
        />
        
        {/* Overlay with category */}
        <div className={`absolute top-0 left-0 right-0 h-full bg-gradient-to-t ${categoryColors[category]?.gradient || 'from-gray-500 to-gray-400'} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
        
        {/* Category Badge */}
        <div className={`absolute bottom-3 left-3 px-3 py-1 ${categoryColors[category]?.bg || 'bg-gray-500'} ${categoryColors[category]?.text || 'text-white'} text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm`}>
          <span className="mr-1">{categoryIcons[category] || '📦'}</span>
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Product Name & Rating */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{name}</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">{rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Price & Quantity */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-blue-600">${price.toFixed(2)}</div>
          <div className="text-sm text-gray-500">Qty: {quantity}</div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Quantity Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={decrementQuantity}
              className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Delete Button */}
          <button
            onClick={deleteItemFromCart}
            className="w-full py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;