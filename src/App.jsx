import { useState, useEffect, useMemo, useCallback, Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import CartItems from './components/CartItems.jsx';
import CartSummary from './components/CartSummary.jsx';
import CategoryChart from './components/CategoryChart.jsx';
import Wishlist from './components/Wishlist.jsx';
import Orders from './components/Orders.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import About from './components/About.jsx';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import Profile from './components/Auth/Profile.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import { debounce } from './utils/debounce.js';
import './index.css';
import { Heart, ShoppingCart, Star, Trash2, Plus, Minus, 
  ShoppingBag, User, Sun, Moon, Truck, Info, Eye, Filter, SortAsc, Search } from 'lucide-react';

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="card bg-base-100 shadow-2xl p-10 rounded-2xl">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Something went wrong!</h2>
            <p className="text-gray-600 mb-6">{this.state.error?.message || 'An unexpected error occurred.'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
const [products, setProducts] = useState([
  {
    id: 1,
    name: 'MacBook Pro 16"',
    price: 2499.99,
    quantity: 1,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    description: 'Powerful laptop for professionals',
    rating: 4.8
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    price: 999.99,
    quantity: 2,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1695634297682-44fd0b94e9e4?w=500',
    description: 'Latest iPhone model',
    rating: 4.7
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: 249.99,
    quantity: 1,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1585184394271-4c0a47dc59c9?w=500',
    description: 'Premium wireless earphones',
    rating: 4.6
  },
  {
    id: 4,
    name: 'Designer T-Shirt',
    price: 89.99,
    quantity: 3,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    description: 'Premium cotton t-shirt',
    rating: 4.2
  },
  {
    id: 5,
    name: 'Premium Jeans',
    price: 159.99,
    quantity: 1,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    description: 'High-quality denim jeans',
    rating: 4.4
  },
  {
    id: 6,
    name: 'Apple Watch Ultra',
    price: 799.99,
    quantity: 1,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1630343710705-0bdfd1824d3d?w=500',
    description: 'Advanced fitness tracking',
    rating: 4.5
  },
  {
    id: 8,
    name: 'Leather Wallet',
    price: 49.99,
    quantity: 1,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e1b?w=500',
    description: 'Genuine leather wallet',
    rating: 4.1
  },
  {
    id: 10,
    name: 'Bluetooth Speaker',
    price: 89.99,
    quantity: 1,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1589254066213-a0c9dc853511?w=500',
    description: 'Portable Bluetooth speaker',
    rating: 4.5
  },
  {
    id: 11,
    name: 'Running Shoes',
    price: 129.99,
    quantity: 2,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500',
    description: 'Comfortable running shoes',
    rating: 4.3
  },
  {
    id: 12,
    name: 'Smartphone Case',
    price: 19.99,
    quantity: 1,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1600585152915-28eb5f43bc1a?w=500',
    description: 'Protective smartphone case',
    rating: 4.0
  },
  {
    id: 13,
    name: 'Gaming Headset',
    price: 99.99,
    quantity: 1,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
    description: 'High-quality gaming headset',
    rating: 4.8
  },
  {
    id: 14,
    name: 'Smart TV',
    price: 799.99,
    quantity: 1,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
    description: '4K Ultra HD Smart TV',
    rating: 4.9
  },
  {
    id: 15,
    name: 'Fitness Tracker',
    price: 59.99,
    quantity: 1,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500',
    description: 'Track your fitness goals',
    rating: 4.2
  },
  {
    id: 16,
    name: 'Wireless Charger',
    price: 29.99,
    quantity: 1,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1629121649902-51e3a5418941?w=500',
    description: 'Fast wireless charging pad',
    rating: 4.4
  },
  {
    id: 17,
    name: 'Smart Home Hub',
    price: 199.99,
    quantity: 1,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500',
    description: 'Control your smart home devices',
    rating: 4.6
  },
  {
    id: 18,
    name: 'Portable SSD',
    price: 129.99,
    quantity: 1,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1597289124942-329f238648a9?w=500',
    description: 'Fast and reliable storage',
    rating: 4.7
  },
  {
    id: 19,
    name: 'Smart Light Bulb',
    price: 19.99,
    quantity: 1,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500',
    description: 'Control your lighting remotely',
    rating: 4.3
  },
  {
    id: 20,
    name: 'Bluetooth Earbuds',
    price: 79.99,
    quantity: 1,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    description: 'Compact and wireless earbuds',
    rating: 4.5
  },
  {
    id: 21,
    name: 'Smart Thermostat',
    price: 149.99,
    quantity: 1,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1632212717035-747f57c10fe0?w=500',
    description: 'Control your home temperature',
    rating: 4.8
  },
  {
    id: 22,
    name: 'Gaming Mouse',
    price: 59.99,
    quantity: 1,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    description: 'Precision gaming mouse',
    rating: 4.6
  },
  {
    id: 23,
    name: 'Smart Doorbell',
    price: 99.99,
    quantity: 1,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500',
    description: 'See who is at your door',
    rating: 4.7
  },
  {
    id: 24,
    name: 'Wireless Keyboard',
    price: 49.99,
    quantity: 1,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    description: 'Ergonomic wireless keyboard',
    rating: 4.4
  },
  {
    id: 25,
    name: 'Smart Speaker',
    price: 99.99,
    quantity: 1,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1507646227500-4d389b0012be?w=500',
    description: 'Voice-controlled smart speaker',
    rating: 4.9
  }
]);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Debug products state
  useEffect(() => {
    console.log('App products:', products);
  }, [products]);

  // Cleanup stale cart items when products change
  useEffect(() => {
    setCart((prevCart) => {
      const safeProducts = Array.isArray(products) ? products : [];
      return prevCart.filter((cartItem) => {
        const productExists = safeProducts.find((p) => p.id === cartItem.id);
        return productExists && typeof cartItem.price === 'number' && !isNaN(cartItem.price);
      });
    });
  }, [products]);

  const incrementQuantity = useCallback((id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decrementQuantity = useCallback((id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  }, []);

  const deleteItemFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  }, []);

  const addToWishlist = useCallback((item) => {
    if (!wishlist.find((w) => w.id === item.id)) {
      setWishlist((prev) => [...prev, item]);
      toast.success(`${item.name} added to wishlist!`);
    } else {
      toast.info(`${item.name} is already in wishlist.`);
    }
  }, [wishlist]);

  const removeFromWishlist = useCallback((id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addItemToCart = useCallback((item) => {
    if (
      !item.name ||
      typeof item.price !== 'number' ||
      item.price <= 0 ||
      isNaN(item.price) ||
      !item.category
    ) {
      toast.error('Please enter valid item details.');
      return;
    }
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [
        ...prev,
        {
          ...item,
          quantity: 1,
          rating: item.rating || 4.0,
          image: item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
          description: item.description || 'No description provided',
        },
      ];
    });
    toast.success(`${item.name} added to cart!`);
  }, []);

  const addOrder = useCallback((order) => {
    setOrders((prev) => [...prev, order]);
  }, []);

  const updateOrder = useCallback((updatedOrder) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
    );
  }, []);

  const placeOrder = useCallback(() => {
    if (cart.length === 0) {
      toast.error('Cart is empty!');
      return;
    }
    if (!user) {
      toast.error('Please log in to place an order.');
      return;
    }
    const order = {
      id: uuidv4(),
      date: new Date().toISOString(),
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0),
      userEmail: user.email,
    };
    addOrder(order);
    setCart([]);
    setSelectedItems([]);
    toast.success('Order placed successfully!');
  }, [cart, user, addOrder]);

  const toggleSelectItem = useCallback((id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const filteredProducts = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : [];
    let result = safeProducts
      .filter((item) => (selectedCategory === 'All' ? true : item.category === selectedCategory))
      .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return result.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const categories = ['All', ...new Set((Array.isArray(products) ? products : []).map((item) => item.category))];

  const handleSearch = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  // Ensure products is always an array for other components
  const safeProducts = Array.isArray(products) ? products : [];


  return (
    <ErrorBoundary>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
        <Navbar
          totalItems={totalItems}
          wishlistCount={wishlist.length}
          toggleTheme={toggleTheme}
          theme={theme}
          cart={cart}
          user={user}
          setUser={setUser}
        />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home products={filteredProducts} addToCart={addItemToCart} addToWishlist={addToWishlist} />} />
            <Route path="/cart">
              <Route
                path="items"
                element={
                  <div className="container mx-auto px-4 py-8">
                    <div className="bg-base-100 rounded-2xl shadow-lg p-6 mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            onChange={(e) => handleSearch(e.target.value)}
                          />
                        </div>
                        <div className="relative">
                          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                          >
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="relative">
                          <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                          >
                            <option value="name">Sort by Name</option>
                            <option value="price">Sort by Price</option>
                            <option value="rating">Sort by Rating</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {selectedItems.length > 0 && (
                      <div className="bg-base-100 rounded-2xl shadow-lg p-6 mb-8 animate-fade-in">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-gray-800">
                            {selectedItems.length} item(s) selected
                          </span>
                          <button
                            onClick={() => {
                              selectedItems.forEach((id) => deleteItemFromCart(id));
                              setSelectedItems([]);
                              toast.success(`${selectedItems.length} items deleted!`);
                            }}
                            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                          >
                            Delete Selected
                          </button>
                        </div>
                      </div>
                    )}
                    <CategoryChart products={safeProducts} />
                    <CartItems
                      cart={cart}
                      products={filteredProducts}
                      incrementQuantity={incrementQuantity}
                      decrementQuantity={decrementQuantity}
                      deleteItemFromCart={deleteItemFromCart}
                      addToWishlist={addToWishlist}
                      toggleSelectItem={toggleSelectItem}
                      selectedItems={selectedItems}
                    />
                  </div>
                }
              />
              <Route path="summary" element={<CartSummary cart={cart} placeOrder={placeOrder} />} />
            </Route>
            <Route path="/wishlist" element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} addToCart={addItemToCart} />} />
            <Route path="/orders" element={<Orders orders={orders} cart={cart} addOrder={addOrder} user={user} updateOrder={updateOrder} />} />
            <Route path="/product/:id" element={<ProductDetails products={safeProducts} addToCart={addItemToCart} addToWishlist={addToWishlist} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="/admin" element={<AdminDashboard user={user} products={safeProducts} setProducts={setProducts} />} />
          </Routes>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </ErrorBoundary>
  );
}

export default App;