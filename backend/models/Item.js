const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item; 