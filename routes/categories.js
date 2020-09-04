const {Router} = require('express');
const router = Router();
const categoriesList = require('../db/categories');

router.get('/', (req, res) => {
  res.json(categoriesList)
});

module.exports = router;