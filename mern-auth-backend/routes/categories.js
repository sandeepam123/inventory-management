const router = require('express').Router();
const Category = require('../models/Category');


router.get('/', async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});


router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const cat = await Category.create({ name });
    res.status(201).json(cat);
  } catch (err) {
    res.status(400).json({ error: 'Category already exists' });
  }
});


router.put('/:id', async (req, res) => {
  const { name } = req.body;
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.json(cat);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Deletion failed' });
  }
});

module.exports = router;
