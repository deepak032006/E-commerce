import Product from '../models/Product.js';

// GET /api/products
export const getAllProducts = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
};


// GET /api/products/:id
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
};

// POST /api/products (admin only)
export const createProduct = async (req, res) => {
  const product = new Product({
    name: 'Sample Product',
    image: '/images/sample.jpg',
    brand: 'Brand',
    category: 'Category',
    description: 'Description',
    price: 0,
    countInStock: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// PUT /api/products/:id (admin only)
export const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updated = await product.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// DELETE /api/products/:id (admin only)
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product deleted' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};
