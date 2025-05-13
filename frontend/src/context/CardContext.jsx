// CartContext.js (useCart)
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product._id !== productId));
  };

  const updateQuantity = (productId, action) => {
    setCart((prevCart) =>
      prevCart.map((product) => {
        if (product._id === productId) {
          let newQuantity = product.quantity;
          if (action === 'increase') {
            newQuantity += 1;
          } else if (action === 'decrease' && product.quantity > 1) {
            newQuantity -= 1;
          }
          return { ...product, quantity: newQuantity };
        }
        return product;
      })
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
