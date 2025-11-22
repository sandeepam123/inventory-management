const router = require('express').Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Add product
router.post('/', async (req, res) => {
  try {
    const prod = await Product.create(req.body);
    res.status(201).json(prod);
  } catch (err) {
    res.status(400).json({ error: 'Add failed' });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const prod = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(prod);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Deletion failed' });
  }
});

module.exports = router;
