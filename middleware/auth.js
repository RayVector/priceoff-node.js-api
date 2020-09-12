module.exports = function(req, res, next) {
  if (!req.session.isAuth) return res.send('not authorized')
  next()
}