import express from 'express';
import authMiddleware from '../middleware/auth.js';
import Product from '../model/Product.js';

const router = express.Router();

// Dashboard - seller stats
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.userId });
    res.json({
      success: true,
      stats: {
        totalProducts: products.length,
        products
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get seller's own products
router.get('/products', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.userId });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;