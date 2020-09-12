const { Router } = require('express')
const router = Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

function loginUser(logUser, req, res) {
  req.session.user = logUser
  req.session.isAuth = true
  const resBody = {
    data: { name: logUser.name, phone: logUser.phone },
    msg: `Authenticated: ${logUser.name}, ${logUser.phone}`,
  }
  req.session.save(err => {
    if (err) throw err
    res.send(resBody)
  })
}


/**
 * get active session
 */
router.get('/', auth, async (req, res) => {
  res.send(req.session)
})

/**
 * login/Auth
 */
router.post('/', async (req, res) => {
  const { phone, name } = req.body

  /**
   * Validation:
   */
  if (!phone || phone.length < 11) throw res.send('Incorrect required phone: 11 symbols at minimum')
  else if (name.length < 3 && typeof name === 'string') throw res.send('Incorrect required name: 3 letters at minimum')

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
    const newUser = new User({ name, phone })
    const savedUser = await newUser.save()
    loginUser(savedUser, req, res)
  }

})

/**
 * Logout
 */
router.get('/logout', async (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
    res.send('Sign Out')
  })
})

module.exports = router