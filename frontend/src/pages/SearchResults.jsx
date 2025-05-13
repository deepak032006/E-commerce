import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import mockProducts from "../utils/mockProducts";  // Replace with your actual product data

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Filter mock products based on search query
    const filteredProducts = mockProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredProducts);
  }, [query]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.length > 0 ? (
          results.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="border p-4 rounded-lg block hover:shadow-lg transition-shadow">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-blue-600 text-xl">${product.price}</p>
            </Link>
          ))
        ) : (
          <p>No products found for your search.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
    