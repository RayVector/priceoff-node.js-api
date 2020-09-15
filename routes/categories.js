const { Router } = require('express')
const router = Router()
const Category = require('../models/category')
const auth = require('../middleware/auth')
const prepareResponse = require('../utils/api/prepareResponse')

/**
 * get all categories
 */
router.get('/', auth, async (req, res) => {
  try {
    const categoryList = await Category.find()
    res.send(prepareResponse(
      {
        categoryList: categoryList.map(category => {
          const { type: value, title } = category
          return { value, title }
        }),
      },
      [],
      'success',
    ))
  } catch (e) {
    res.send(prepareResponse(
      {},
      ['Categories not found'],
      'error',
    ))
  }
})

module.exports = router