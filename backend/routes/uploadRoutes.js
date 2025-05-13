import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: 'ecommerce/products' },
      (error, result) => {
        if (error) return res.status(500).json({ message: error.message });
        res.json({ url: result.secure_url });
      }
    );

    result.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
