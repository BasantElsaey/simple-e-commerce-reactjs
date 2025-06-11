import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Trash2, Plus, Minus } from 'lucide-react';
import { toast } from 'react-toastify';

function CartItems({
  cart,
  products,
  incrementQuantity,
  decrementQuantity,
  deleteItemFromCart,
  addToWishlist,
  toggleSelectItem,
  selectedItems,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fallback if cart is undefined or not an array
  const safeCart = Array.isArray(cart) ? cart : [];
  
  // Pagination calculations
  const totalItems = safeCart.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = safeCart.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle add to wishlist
  const handleAddToWishlist = (item) => {
    addToWishlist(item);
  };

  return (
    <div className="space-y-8">
      {safeCart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 mb-6">Your cart is empty.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentItems.map((item) => {
              const product = products.find((p) => p.id === item.id) || item;
              return (
                <div
                  key={item.id}
                  className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
                >
                  <figure>
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'}
                      alt={item.name}
                      className="h-56 w-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e';
                      }}
                    />
                  </figure>
                  <div className="card-body p-6">
                    <h3 className="card-title text-xl text-primary">{item.name}</h3>
                    <p className="text-lg font-semibold text-gray-800">
                      ${(item.price || 0).toFixed(2)} x {item.quantity} = ${((item.price || 0) * item.quantity).toFixed(2)}
                    </p>
                    <div className="badge bg-blue-100 text-blue-800 p-2">{item.category}</div>
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => {
                          deleteItemFromCart(item.id);
                          toast.success(`${item.name} removed from cart!`);
                        }}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-5 h-5 inline-block mr-2" />
                        Remove
                      </button>
                      <button
                        onClick={() => handleAddToWishlist(item)}
                        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                        aria-label={`Add ${item.name} to wishlist`}
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                    <label className="flex items-center gap-2 mt-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                        className="checkbox checkbox-primary"
                      />
                      <span className="text-sm">Select for bulk actions</span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                    currentPage === index + 1
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CartItems;