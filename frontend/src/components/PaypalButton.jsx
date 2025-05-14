import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ amount }) => {
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    fetch('https://e-commerce-5-48ed.onrender.com/api/config/paypal/clientId') // Correct API endpoint
      .then((res) => {
        console.log('Response status:', res.status); // To check the response code
        if (!res.ok) {
          throw new Error('Failed to fetch PayPal client ID');
        }
        return res.json();
      })
      .then((data) => {
        setClientId(data.clientId);
      })
      .catch((error) => {
        console.error('Error fetching PayPal client ID:', error);
      });
  }, []);

  if (!clientId) {
    return <div>Loading PayPal...</div>;
  }

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <PayPalButtons
        style={{
          layout: 'vertical',
          color: 'blue',
          shape: 'pill',
          label: 'checkout',
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount, // The amount for the transaction
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert('Payment Successful! Thank you for your purchase.');
            // Optional: Redirect or clear cart here
          });
        }}
        onError={(err) => {
          alert('An error occurred with the payment. Please try again.');
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
