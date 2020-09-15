const { Router } = require('express')
const router = Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const prepareResponse = require('../utils/api/prepareResponse')

function loginUser(logUser, req, res) {
  try {
    req.session.userId = logUser._id
    req.session.isAuth = true
    req.session.save(err => {
      if (err) throw err
      res.send(prepareResponse(
        { name: logUser.name, phone: logUser.phone },
        [`Authenticated: ${logUser.name}`],
        'success',
      ))
    })
  } catch (e) {
    res.send(prepareResponse(
      {},
      ['Login error'],
      'error',
    ))
  }
}

/**
 * get active user
 * 4DEV
 */
router.get('/', auth, async (req, res) => {
  res.send(prepareResponse(req.session, [], 'success'))
})

/**
 * login/Auth
 */
router.post('/', async (req, res) => {
  const { phone, name } = req.body

  /**
   * Validation:
   * TODO: create validation utility
   */
  if (!phone || phone.length < 11) {
    res.send(prepareResponse(
      {},
      ['Incorrect required phone: 11 symbols at minimum'],
      'error',
    ))
  } else if (name.length < 3 && typeof name === 'string') {
    res.send(prepareResponse(
      {},
      ['Incorrect required name: 3 letters at minimum'],
      'error',
    ))
  }
  const logUser = await User.findOne({ phone })
  if (logUser) {

    /**
     * Login
     */
    loginUser(logUser, req, res)
  } else {

    /**
     * Authorization + Login
     */
    try {
      const newUser = new User({ name, phone })
      const savedUser = await newUser.save()
      loginUser(savedUser, req, res)
    } catch (e) {
      res.send(prepareResponse(
        {},
        ['Authentication error'],
        'error',
      ))
    }
  }
})

/**
 * Logout
 */
router.get('/logout', async (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
    res.send(prepareResponse(
      {},
      ['Sign Out'],
      'success',
    ))
  })
})

module.exports = router