import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import SearchResults from "./pages/SearchResults";  // Import SearchResults
import { CartProvider } from './context/CardContext.jsx';
import Orders from './pages/orders.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // ✅ Done loading
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ✅ Show nothing (or a spinner) while checking localStorage
  if (loading) return null;

  return (
    <CartProvider>
      <div style={{ width: "100%", height: "100vh" }}>
        {user && (
          <Navbar user={user} setUser={setUser} handleLogout={handleLogout} />
        )}

        <Routes>
          <Route
            path="/"
            element={<Navigate to={user ? "/home" : "/register"} />}
          />
          <Route
            path="/register"
            element={!user ? <Register setUser={handleLogin} /> : <Navigate to="/home" />}
          />
          <Route
            path="/login"
            element={!user ? <Login setUser={handleLogin} /> : <Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={user ? <Home user={user} /> : <Navigate to="/register" />}
          />
          <Route
            path="/cart"
            element={user ? <Cart /> : <Navigate to="/register" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/register" />}
          />
          <Route
            path="/product/:id"
            element={user ? <ProductDetails /> : <Navigate to="/register" />}
          />
          <Route
            path="/search/:query"
            element={<SearchResults />}  // Add this route to handle search results
          />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
