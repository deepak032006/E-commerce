import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      const storedOrders = JSON.parse(localStorage.getItem(`orders_${user._id}`)) || [];
      setOrders(storedOrders);
    }
  }, [user]);

  if (!user) return <div className="p-4 text-red-600">Please login to view your orders.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4 shadow-md bg-white">
            <p className="text-sm text-gray-500">Order Date: {order.date}</p>
            <div className="flex gap-4 mt-2">
              <img src={order.product.image} alt={order.product.name} className="w-24 h-24 object-cover" />
              <div>
                <h3 className="text-lg font-semibold">{order.product.name}</h3>
                <p className="text-blue-600 font-bold">${order.product.price}</p>
                <p className="text-sm mt-2">Shipping To:</p>
                <ul className="text-sm text-gray-700 ml-4 list-disc">
                  <li><strong>Name:</strong> {order.shippingDetails.name}</li>
                  <li><strong>Address:</strong> {order.shippingDetails.address}</li>
                  <li><strong>City:</strong> {order.shippingDetails.city}</li>
                  <li><strong>Postal Code:</strong> {order.shippingDetails.postalCode}</li>
                </ul>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
