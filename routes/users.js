const {Router} = require('express');
const router = Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  await User.find({}, (err, result) => {
    if (err) console.log(err);
    else res.json(result.map(user => {
      /**
       * prepare item
       */
      return {
        name: user.name,
        phone: user.phone,
        productList: user.productList,
        favoriteList: user.favoriteList,
      }
    }))
  })
});

module.exports = router;