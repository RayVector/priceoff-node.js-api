const prepareResponse = require('../utils/api/prepareResponse')

module.exports = function(req, res, next) {
  if (!req.session.isAuth) {
    return res.send(prepareResponse(
      { isAuth: false },
      [{
        title: 'not authorized',
        grade: 'warning',
      }],
      'error',
    ))
  }
  next()
}