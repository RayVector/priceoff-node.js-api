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
    if (categoryList && categoryList.length) {
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
    } else {
      res.send(prepareResponse(
        {},
        [{
          title: 'Categories not found',
          grade: 'warning',
        }],
        'error',
      ))
    }
  } catch (e) {
    res.send(prepareResponse(
      {},
      [{
        title: 'get categories error',
        grade: 'error',
      }],
      'error',
    ))
  }
})

module.exports = router