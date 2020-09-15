const User = require('../models/user')

module.exports = async function(req, res, next) {
  if (!req.session.userId) return next()
  req.userId = await User.findById(req.session.userId)
  next()
}