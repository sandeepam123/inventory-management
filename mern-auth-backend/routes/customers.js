const router = require('express').Router();
const Customer = require('../models/Customer');

// Get all customers
router.get('/', async (req, res) => {
  const customers = await Customer.find({});
  res.json(customers);
});

// Add a customer
router.post('/', async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: 'Add failed' });
  }
});

// Update a customer
router.put('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
});

// Delete a customer
router.delete('/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed' });
  }
});

module.exports = router;
