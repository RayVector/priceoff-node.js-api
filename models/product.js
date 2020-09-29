const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  categoryId: {
    type: String,
    ref: 'Category',
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    require: true,
    default: Date.now,
  },
  address: {
    lat: String,
    lng: String,
  },
  description: String,
  email: String,
  images: [{
    title: String,
    src: String,
    isMain: Boolean,
  }],
})

module.exports = mongoose.model('product', productSchema, 'products')