const express = require('express');
const { check, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Create order
router.post('/', [
  authMiddleware,
  check('items', 'Items are required').isArray({ min: 1 }),
  check('items.*.product', 'Product ID is required').not().isEmpty(),
  check('items.*.quantity', 'Quantity must be a number').isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { items } = req.body;
    let totalPrice = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: `Product ${item.product} not found` });
      if (product.stock < item.quantity) return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      totalPrice += product.price * item.quantity;
      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      user: req.user.id,
      items,
      totalPrice
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;