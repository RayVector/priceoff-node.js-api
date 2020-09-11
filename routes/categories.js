const {Router} = require('express');
const router = Router();
const Category = require('../models/category');

router.get('/', async (req, res) => {
  await Category.find({}, (err, result) => {
    if (err) console.log(err);
    else res.json(result.map(category => {
      /**
       * prepare item
       */
      const {type: value, title} = category;
      return {
        value,
        title,
      }
    }))
  });

});

module.exports = router;