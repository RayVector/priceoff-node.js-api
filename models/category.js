const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('category', categorySchema, 'categories');