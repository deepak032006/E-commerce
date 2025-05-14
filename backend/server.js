import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.router.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paypalRoutes from './routes/paypalRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { protect, admin } from './middleware/authMiddleware.js';


dotenv.config();
connectDB();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  'http://localhost:5173',
  'https://e-commerce-6-9tm1.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/config/paypal', paypalRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});
if (process.env.NODE_ENV === 'production') {
//   const dirPath = path.resolve();
  app.use(express.static(path.join(__dirPath, "../frontend/dist")));

  app.get('*', (req, res) => {
    res.sendFile(path.join(dirPath, "../frontend", 'dist', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
