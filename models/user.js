const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  phone: String,
  productList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  favoriteList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
})

module.exports = mongoose.model('user', userSchema, 'users')