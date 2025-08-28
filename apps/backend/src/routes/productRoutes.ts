import { Router } from 'express';
import { getProductById, getAllProducts } from '../controllers/productController';

const router = Router();

// GET /api/products - Get all products with optional filters
router.get('/', getAllProducts);

// GET /api/products/:id - Get a specific product by ID
router.get('/:id', getProductById);

export default router;