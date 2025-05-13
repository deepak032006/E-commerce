import React, { useEffect, useState } from "react";
import mockProducts from "../utils/mockProducts"; // Import mock data
import ProductCard from "../components/ProductCard";

const Home = ({ user }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setProducts(mockProducts);
    }, 500);
  }, []);

  return (
    <>
      {/* Product grid */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {products.map((product) => {
          const reviews = JSON.parse(localStorage.getItem(`reviews_${product._id}`)) || [];
          return (
            <ProductCard key={product._id} product={product} reviews={reviews} />
          );
        })}
      </div>
    </>
  );
};

export default Home;
