const router = require('express').Router();
const Order = require('../models/Order');


router.get('/', async (req, res) => {
  const orders = await Order.find({})
    .populate('product', 'name')
    .populate('customer', 'name');
  res.json(orders);
});


router.post('/', async (req, res) => {
  console.log('Order POST body:', req.body); 
  try {
    const billNumber = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { product, customer, quantity, price } = req.body;

  
    if (!product || !customer) return res.status(400).json({ error: 'Select product and customer' });
    if (!Number(quantity) || !Number(price))
      return res.status(400).json({ error: 'Invalid quantity or price' });

    const totalAmount = Number(quantity) * Number(price);
    const order = await Order.create({
      product, customer,
      quantity: Number(quantity),
      price: Number(price),
      billNumber, totalAmount
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: 'Add failed', details: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed' });
  }
});

module.exports = router;
