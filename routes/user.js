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
    if (user) {
      const { name, phone } = user
      res.send(prepareResponse(
        { name, phone },
        [],
        'success',
      ))
    } else {
      res.send(prepareResponse(
        {},
        [{
          title: 'Users not found',
          grade: 'warning',
        }],
        'error',
      ))
    }

  } catch (e) {
    res.send(prepareResponse(
      {},
      [{
        title: 'Get user error',
        grade: 'error',
      }],
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
    let productList = []
    if (user) {
      productList = await Product.find({
        '_id': { $in: user.productList },
      })
    } else {
      res.send(prepareResponse(
        {},
        [{
          title: 'User not found',
          grade: 'warning',
        }],
        'error',
      ))
    }

    if (productList.length) {
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
    } else {
      res.send(prepareResponse(
        { preparedProductList: [] },
        [{
          title: 'User products list is empty',
          grade: 'warning',
        }],
        'error',
      ))
    }

  } catch (e) {
    res.send(prepareResponse(
      {},
      [{
        title: 'Get user products error',
        grade: 'error',
      }],
      'error',
    ))
  }
})


module.exports = router