import React from 'react';
import { useCart } from '../context/CardContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart(); // Access updateQuantity function

  const handleIncreaseQuantity = (productId) => {
    updateQuantity(productId, 'increase');
  };

  const handleDecreaseQuantity = (productId) => {
    updateQuantity(productId, 'decrease');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((product) => (
            <div key={product._id} className="flex justify-between items-center border-b py-2">
              <div className="flex items-center">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">${product.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Quantity Adjust */}
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => handleDecreaseQuantity(product._id)}
                    className="bg-gray-600 text-white px-3 py-1 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-4">{product.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(product._id)}
                    className="bg-gray-600 text-white px-3 py-1 rounded-r"
                  >
                    +
                  </button>
                </div>
                <p className="text-xl font-bold">${(product.price * product.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="ml-4 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
