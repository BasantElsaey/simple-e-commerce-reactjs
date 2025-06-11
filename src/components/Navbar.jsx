import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Sun, Moon, Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Navbar({ totalItems, wishlistCount, toggleTheme, theme, cart, user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-base-100 shadow-lg z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          MyShop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Home
          </Link>
          <Link to="/cart/items" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Cart
          </Link>
          <Link to="/wishlist" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Wishlist
          </Link>
          <Link to="/orders" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Orders
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
            About
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="text-gray-800 hover:text-blue-600 transition-colors duration-200 flex items-center">
                <User className="w-4 h-4 mr-1" />
                {user.name}
              </Link>
              {user.isAdmin && (
                <Link to="/admin" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-gray-800 hover:text-red-600 transition-colors duration-200 flex items-center"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
                Login
              </Link>
              <Link to="/signup" className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
                Signup
              </Link>
            </>
          )}
         {/* Cart Icon */}
            <button
              className="relative p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
              aria-label="View cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                  {totalItems}
                </span>
              )}
            </button>

          {/* Wishlist Icon */}
          <button
            to="/wishlist"
            className="relative p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            aria-label="View wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                {wishlistCount}
              </span>
            )}
          </button>
          
            
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-base-100 shadow-lg p-4 animate-fade-in">
          <div className="flex flex-col gap-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
              Home
            </Link>
            <Link to="/cart/items" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
              Cart
            </Link>
            <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
              Wishlist
            </Link>
            <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
              Orders
            </Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-800 hover:text-blue-600 transition-colors duration-200">
              About
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-800 hover:text-blue-600 transition-colors duration-200 flex items-center"
                >
                  <User className="w-4 h-4 mr-1" />
                  {user.name}
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-800 hover:text-blue-600 transition-colors duration-200"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-800 hover:text-red-600 transition-colors duration-200 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-800 hover:text-blue-600 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-800 hover:text-blue-600 transition-colors duration-200"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;