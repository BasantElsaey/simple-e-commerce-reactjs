import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ShoppingCart, Heart, Search } from 'lucide-react';

function Home({ products, addToCart, addToWishlist }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');
  const itemsPerPage = 8;

  // Category color mapping
  const categoryColors = {
    Electronics: { bg: 'bg-blue-500', text: 'text-white' },
    Accessories: { bg: 'bg-purple-500', text: 'text-white' },
    Clothing: { bg: 'bg-green-500', text: 'text-white' },
    Footwear: { bg: 'bg-orange-500', text: 'text-white' },
    Appliances: { bg: 'bg-red-500', text: 'text-white' }
  };

  // Fallback if products is undefined or not an array
  const safeProducts = Array.isArray(products) ? products : [];

  // Get unique categories
  const categories = ['All', ...new Set(safeProducts.map(product => product.category))];

  // Filter, search, and sort products
  const filteredProducts = safeProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0; // default: no sorting
    });

  // Pagination calculations
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset to page 1 when search, filter, or sort changes
  const resetPagination = () => {
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-12 w-full">
      {/* Hero Section with Animated Background */}
      <div className="relative h-96 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden mb-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                MyShop
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover amazing products with unbeatable prices
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/cart/items"
                className="px-8 py-3 bg-white text-gray-800 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                aria-label="Shop Now"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105"
                aria-label="Learn More"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-400/20 rounded-full animate-bounce"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      {/* Carousel */}
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        className="mb-12 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div>
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
            alt="Electronics Banner"
            className="h-80 object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e';
            }}
          />
          <p className="legend bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white font-semibold">
            Shop the Latest Electronics!
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
            alt="Fashion Banner"
            className="h-80 object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab';
            }}
          />
          <p className="legend bg-gradient-to-r from-pink-600/80 to-rose-600/80 text-white font-semibold">
            Trendy Fashion Awaits!
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
            alt="Accessories Banner"
            className="h-80 object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62';
            }}
          />
          <p className="legend bg-gradient-to-r from-green-600/80 to-emerald-600/80 text-white font-semibold">
            Amazing Accessories!
          </p>
        </div>
      </Carousel>

      {/* Featured Products */}
      <h2 className="text-4xl font-bold text-primary mb-8 text-center bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        Featured Products
      </h2>

      {/* Search, Filter, and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              resetPagination();
            }}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            aria-label="Search products"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-1/3">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              resetPagination();
            }}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            aria-label="Filter by category"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="w-full md:w-1/3">
          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              resetPagination();
            }}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            aria-label="Sort products"
          >
            <option value="default">Sort by: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-600">No products found.</p>
          <Link
            to="/cart/items"
            className="mt-4 inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Browse All Products
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              >
                <figure>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-56 w-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e';
                    }}
                  />
                </figure>
                <div className="card-body p-6">
                  <h3 className="card-title text-xl text-primary">{product.name}</h3>
                  <p className="text-lg font-semibold text-gray-800">
                    ${(product.price || 0).toFixed(2)}
                  </p>
                  <div className={`badge ${categoryColors[product.category]?.bg || 'bg-gray-500'} ${categoryColors[product.category]?.text || 'text-white'} p-2`}>
                    {product.category}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Link
                      to={`/product/${product.id}`}
                      className="flex-1 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-center"
                      aria-label={`View details of ${product.name}`}
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => addToWishlist(product)}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                      aria-label={`Add ${product.name} to wishlist`}
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

export default Home;