const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  billNumber: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', OrderSchema);
