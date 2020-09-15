const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth')
const prepareResponse = require('../utils/api/prepareResponse')
// models
const Product = require('../models/product')
const User = require('../models/user')

/**
 *  add new product
 */
router.post('/', auth, async (req, res) => {
  try {
    const newProduct = new Product(Object.assign(req.body, { userId: req.session.userId }))
    const savedProduct = await newProduct.save()
    await User.findByIdAndUpdate(req.session.userId, { $push: { productList: { $each: [savedProduct._id] } } })
    res.send(prepareResponse(
      {},
      [`Product ${savedProduct.title} created`],
      'success')
    )
  } catch (e) {
    res.send(prepareResponse({}, ['Product creation error'], 'error'))
  }
})

/**
 *  get product by id
 */
router.get('/:id', async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.id)
    if (foundProduct) {
      res.send(prepareResponse(foundProduct, [], 'success'))
    } else {
      res.send(prepareResponse({}, ['Product not found'], 'error'))
    }
  } catch (e) {
    throw new Error()
  }

})

/**
 *  remove product by id and remove product in user
 */
router.delete('/:id', async (req, res) => {
  try {
    const removedProduct = await Product.findOneAndRemove(req.params.id)
    await User.findByIdAndUpdate(
      req.session.userId,
      { $pull: { productList: { $in: req.params.id } } })
    if (removedProduct) {
      res.send(prepareResponse(
        {},
        [`Product ${removedProduct.title} deleted`],
        'success'))
    } else {
      res.send(prepareResponse({}, ['Product not found'], 'error'))
    }
  } catch (e) {
    res.send(prepareResponse({}, ['Product deleting error'], 'error'))
  }
})

module.exports = router