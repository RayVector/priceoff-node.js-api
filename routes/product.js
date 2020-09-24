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
      'success'),
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
      res.send(prepareResponse(
        {},
        [{
          title: 'Product not found',
          grade: 'warning',
        }],
        'error',
      ))
    }
  } catch (e) {
    throw new Error()
  }

})

/**
 *  remove product by id and remove product in user
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const removedProduct = await Product.findByIdAndRemove(req.params.id)
    const user = await User.findById(req.session.userId)
    user.removeProduct(req.params.id)

    if (removedProduct) {
      res.send(prepareResponse(
        {},
        [{
          title: `Product ${removedProduct.title} deleted`,
          grade: 'success',
        }],
        'success'),
      )
    } else {
      res.send(prepareResponse(
        {},
        [{
          title: 'Product not found',
          grade: 'warning',
        }],
        'error'),
      )
    }
  } catch (e) {
    res.send(prepareResponse(
      {},
      [{
        title: 'Product deleting error',
        grade: 'error',
      }],
      'error',
    ))
  }
})

module.exports = router