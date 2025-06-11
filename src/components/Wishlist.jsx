import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

function Wishlist({ wishlist, removeFromWishlist, addToCart }) {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-12 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-fade-in">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="card bg-base-100 shadow-2xl p-10 rounded-2xl text-center w-full max-w-lg mx-auto animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
            <Heart className="w-16 h-16 text-gray-400" />
          </div>
          <p className="text-xl font-semibold text-gray-800">Your wishlist is empty.</p>
          <p className="text-gray-500">Start adding items!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
          {wishlist.map((item) => (
            <div key={item.id} className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in">
              <figure>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-56 w-full object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'; }}
                />
              </figure>
              <div className="card-body p-6">
                <h3 className="text-xl font-bold text-primary">{item.name}</h3>
                <p className="text-lg font-semibold text-gray-800">${item.price.toFixed(2)}</p>
                <p className="badge bg-green-100 text-green-800 p-3 font-semibold">{item.category}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <button
                    onClick={() => {
                      addToCart({ preventDefault: () => {}, target: { value: item } });
                      toast.success(`${item.name} added to cart!`);
                    }}
                    className="flex-1 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <ShoppingCart className="w-4 h-4 inline mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      removeFromWishlist(item.id);
                      toast.success(`${item.name} removed from wishlist!`);
                    }}
                    className="flex-1 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    aria-label={`Remove ${item.name} from wishlist`}
                  >
                    <Trash2 className="w-4 h-4 inline" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
