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
      const {name, phone, productList, favoriteList} = user;
      return {
        name,
        phone,
        productList,
        favoriteList,
      }
    }))
  })
});

module.exports = router;