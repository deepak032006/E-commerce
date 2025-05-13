import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import SearchBar from './SearchBar'; // make sure the path is correct
import { useCart } from '../context/CardContext';  // import useCart

const Navbar = ({ user, setUser }) => {
  const { cart } = useCart(); // Access cart data
  const [cartCount, setCartCount] = useState(0); // State to hold cart count

  // Update the cart count whenever the cart changes
  useEffect(() => {
    setCartCount(cart.reduce((total, product) => total + product.quantity, 0));
  }, [cart]); // Dependency array ensures it updates when cart changes

  const handleLogout = () => {
    localStorage.removeItem("user"); // Optional: clear from localStorage too
    setUser(null); // Clear user data
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Brand / Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">MyShop</Link>

      {/* Search Bar */}
      <div className="flex-1 mx-4 max-w-md">
        <SearchBar />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 items-center">
        {!user ? (
          <Link to="/login" className="text-sm font-semibold text-blue-600 hover:underline">Login</Link>
        ) : (
          <>
          <Link to="/orders" className="text-sm font-semibold text-blue-600 hover:underline">
  Orders
</Link>

            {/* Profile Link */}
            <Link to="/profile" className="text-gray-700 hover:text-blue-600">
              <FaUser className="text-xl" title="My Profile" />
            </Link>

            {/* Cart Link with Animation */}
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
              <FaShoppingCart className="text-xl transition-transform duration-300 transform hover:scale-110" title="Cart" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full transition-all duration-300">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
