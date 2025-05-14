import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockProducts from '../utils/mockProducts';
import { useCart } from '../context/CardContext';
import ShippingForm from '../components/ShippingForm';
import PayPalButton from '../components/PaypalButton';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(1); // Default to 1 star
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const found = mockProducts.find(p => p._id === id);
    setProduct(found);

    const savedReviews = JSON.parse(localStorage.getItem(`reviews_${id}`)) || [];
    setReviews(savedReviews);
  }, [id]);

  const handleBuyNow = () => {
    if (!user) {
      localStorage.setItem("buy_intent_product_id", id);
      setShowShippingForm(false);
      navigate("/register");
    } else {
      setShowShippingForm(true);
    }
  };

  const handleAddReview = () => {
    if (!user || !reviewText.trim()) return;

    const newReview = {
      name: user.name || 'Anonymous',
      text: reviewText,
      rating: reviewRating,
      date: new Date().toLocaleString(),
    };

    const updatedReviews = [...reviews, newReview];
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setReviewText('');
    setReviewRating(1); // Reset rating
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Add product with the selected quantity to the cart
    addToCart({ ...product, quantity });
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((total, review) => total + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  if (!product) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image Section */}
      <div className="w-full h-[400px] bg-white border p-4 flex justify-center items-center rounded-lg shadow">
        <img src={product.image} alt={product.name} className="max-h-full object-contain" />
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-2xl font-semibold text-blue-600">${product.price}</p>

        {/* Average Rating */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">
            {'★'.repeat(Math.round(calculateAverageRating()))}
            {'☆'.repeat(5 - Math.round(calculateAverageRating()))}
          </span>
          <span className="ml-2 text-sm text-gray-600">
            {reviews.length > 0 ? `(${calculateAverageRating()})` : '(No ratings yet)'}
          </span>
        </div>

        {/* Quantity Adjust */}
        <div className="flex items-center mt-4">
          <button
            onClick={handleDecreaseQuantity}
            className="bg-gray-600 text-white py-1 px-3 rounded-l"
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="text-center w-12 border-t border-b border-gray-300"
          />
          <button
            onClick={handleIncreaseQuantity}
            className="bg-gray-600 text-white py-1 px-3 rounded-r"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 mt-4"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="ml-4 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 mt-4"
        >
          Buy Now
        </button>

        {/* Specifications */}
        <div className="mt-6">
          <h4 className="font-semibold text-lg mb-2">Specifications:</h4>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Brand: Sample Brand</li>
            <li>Model: XYZ123</li>
            <li>Category: Electronics</li>
            <li>Warranty: 1 year</li>
          </ul>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Customer Reviews</h3>
          <div className="space-y-3">
            {reviews.length > 0 ? reviews.map((review, idx) => (
              <div key={idx} className="bg-gray-100 p-3 rounded">
                <p className="text-sm text-gray-600">By <strong>{review.name}</strong> on {review.date}</p>
                <div className="text-yellow-500">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p className="text-gray-800">{review.text}</p>
              </div>
            )) : <p className="text-gray-500">No reviews yet.</p>}
          </div>

          {/* Review Form */}
          {user && (
            <div className="mt-4">
              <textarea
                className="w-full p-2 border rounded"
                rows="3"
                placeholder="Write your review..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <div className="mt-2">
                <label className="mr-2">Rating:</label>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setReviewRating(rating)}
                    className={`text-${rating <= reviewRating ? 'yellow' : 'gray'}-500`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <button
                onClick={handleAddReview}
                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Submit Review
              </button>
            </div>
          )}
          {!user && (
            <p className="text-sm text-red-500 mt-2">Please <span onClick={() => navigate('/login')} className="underline cursor-pointer">login</span> to leave a review.</p>
          )}
        </div>
      </div>

      

      {/* Shipping Form */}
      {showShippingForm && <ShippingForm product={product} />}
    </div>
  );
};

export default ProductDetails;
