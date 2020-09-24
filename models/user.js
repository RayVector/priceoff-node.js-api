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

/**
 * remove product by id from productList
 * @param id
 * @returns {*}
 */
userSchema.methods.removeProduct = function(id) {
  let productList = [...this.productList]
  productList = productList.filter(product => product.id !== id)
  this.productList = { productList }
  return this.save()
}

module.exports = mongoose.model('user', userSchema, 'users')