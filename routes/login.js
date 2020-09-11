const { Router } = require('express')
const router = Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
  res.send(req.session)
})

router.post('/', async (req, res) => {
  const { phone, name } = req.body

  /**
   * Validation:
   */
  if (!phone || phone.length < 11) throw res.send('Incorrect required phone: 11 symbols at minimum')

  const logUser = await User.findOne({ phone })
  if (logUser) {
    /**
     * Login
     */
    req.session.user = logUser
    req.session.isAuthenticated = true
    req.session.save(err => {
      if (err) throw err
      res.send({
        data: { name: logUser.name, phone: logUser.phone },
        msg: `Authenticated: ${logUser.name}, ${logUser.phone}`,
      })
    })
  } else {
    /**
     * Authorization
     */
    const newUser = new User({ name, phone })
    const savedUser = await newUser.save()
    res.send({
      data: { name: savedUser.name, phone: savedUser.phone },
      msg: `New User Created: ${savedUser.name}, ${savedUser.phone}`,
    })
  }

})

router.get('/logout', async (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
    res.send('Logout')
  })
})

module.exports = router