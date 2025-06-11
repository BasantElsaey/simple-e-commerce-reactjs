import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function CartSummary({ cart, placeOrder }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCost = totalPrice > 100 ? 0 : 10;

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="card bg-base-100 shadow-2xl p-10 rounded-2xl w-full max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-5xl font-bold text-center mb-8 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Cart Summary</h1>
        {cart.length === 0 ? (
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-gray-800">Your cart is empty.</p>
            <Link to="/cart/items" className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-6 shadow-lg">
                <div className="stat-title text-blue-100">Total Items</div>
                <div className="stat-value text-3xl">{totalItems}</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-6 shadow-lg">
                <div className="stat-title text-green-100">Subtotal</div>
                <div className="stat-value text-3xl">${totalPrice.toFixed(2)}</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl p-6 shadow-lg">
                <div className="stat-title text-purple-100">Shipping</div>
                <div className="stat-value text-3xl">${shippingCost.toFixed(2)}</div>
              </div>
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl p-6 shadow-lg">
                <div className="stat-title text-pink-100">Total</div>
                <div className="stat-value text-3xl">${(totalPrice + shippingCost).toFixed(2)}</div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-primary mb-4 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Shipping Details</h3>
              <p className="text-lg text-gray-600">Address: 123 Main St, City, Country</p>
              <p className="text-lg text-gray-600">Estimated Delivery: 3-5 Business Days</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/cart/items"
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-800 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200"
                aria-label="Back to cart"
              >
                Back to Cart
              </Link>
              <button
                onClick={() => {
                  placeOrder();
                  toast.success('Order placed successfully!');
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                aria-label="Place order"
                disabled={cart.length === 0}
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartSummary;