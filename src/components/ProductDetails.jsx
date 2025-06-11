import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';

function ProductDetails({ products, addToCart, addToWishlist }) {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-2xl shadow-xl"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e';
            }}
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-4 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-gray-800 mb-4">
              ${product.price.toFixed(2)}
            </p>
            <div className="badge bg-blue-100 text-blue-800 p-2 mb-4">{product.category}</div>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <span className="text-yellow-400">{'★'.repeat(Math.floor(product.rating))}</span>
              <span className="text-gray-400">{'★'.repeat(5 - Math.floor(product.rating))}</span>
              <span className="ml-2 text-gray-600">({product.rating})</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center"
                aria-label={`Add ${product.name} to wishlist`}
              >
                <Heart className="w-5 h-5 mr-2" />
                Add to Wishlist
              </button>
            </div>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              aria-label="Back to shopping"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;