const {Router} = require('express');
const router = Router();
const userList = require('../db/user');

router.get('/', (req, res) => {
  res.json(userList)
});

module.exports = router;