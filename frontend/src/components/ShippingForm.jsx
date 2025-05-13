import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PaypalButton';

const ShippingForm = ({ product }) => {
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // After submitting shipping details, show PayPal button
    setIsPaymentVisible(true);
  };

  return (
    <div className="shipping-form p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Shipping Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={shippingDetails.name}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingDetails.address}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingDetails.city}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={shippingDetails.postalCode}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg">
          Submit Shipping Info
        </button>
      </form>

      {/* Display PayPal Button after submitting shipping info */}
      {isPaymentVisible && <PayPalButton amount={product.price} />}
    </div>
  );
};

export default ShippingForm;
