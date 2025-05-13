import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CardContext'; // Don't forget this!

const ProductCard = ({ product, reviews = [] }) => { // Default to an empty array
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Function to calculate the average rating
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((total, review) => total + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  // Function to render stars based on the rating
  const renderRatingStars = (rating) => {
    const filledStars = '★'.repeat(Math.round(rating)); // Create filled stars
    const emptyStars = '☆'.repeat(5 - Math.round(rating)); // Create empty stars
    return <span className="text-yellow-500">{filledStars}{emptyStars}</span>;
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="border p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain rounded-lg"
      />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{product.description}</p>
      <p className="text-xl font-bold mt-2">${product.price}</p>

      {/* Display the rating stars */}
      <div className="mt-2">
        {renderRatingStars(calculateAverageRating())} {/* Pass the calculated average rating */}
        <span className="ml-2 text-sm text-gray-600">({calculateAverageRating()})</span>
      </div>
    </div>
  );
};

export default ProductCard;
