import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // cloudinary or any image URL
  brand: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  countInStock: { type: Number, required: true, default: 0 },
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  reviews: [
    {
      name: String,
      rating: Number,
      comment: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ]
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
