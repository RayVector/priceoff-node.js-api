const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth')
const prepareResponse = require('../utils/api/prepareResponse')
// models
const User = require('../models/user')
const Product = require('../models/product')


/**
 * get user
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
    const { name, phone } = user
    res.send(prepareResponse(
      {
        name,
        phone,
      },
      [],
      'success',
    ))
  } catch (e) {
    res.send(prepareResponse(
      {},
      ['Users not found'],
      'error',
    ))
  }
})

/**
 * get user products
 */
router.get('/products', auth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
    const productList = await Product.find({
      '_id': { $in: user.productList },
    })
    // prepare list:
    const preparedProductList = productList.map(product => {
      const {
        _id: id,
        images,
        categoryId,
        title,
        description,
        email,
        createdDate,
      } = product
      return {
        id,
        images,
        categoryId,
        title,
        description,
        email,
        createdDate,
      }
    })
    res.send(prepareResponse({ preparedProductList }, [], 'success'))
  } catch (e) {
    res.send(prepareResponse({}, ['Get user products error'], 'error'))
  }
})

module.exports = router