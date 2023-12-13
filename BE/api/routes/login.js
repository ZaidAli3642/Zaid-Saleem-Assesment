const router = require('express').Router()

const { databaseOp, hashing, JSONtoken } = require('../../utils')
const { validateLogin } = require('../validations')

router.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body

  try {
    const { get } = databaseOp

    const user = await get('SELECT * FROM user WHERE email = ?', [email])

    if (!user) return res.status(404).json({ message: 'User not found', success: false })

    const result = await hashing.compare(password, user.password)

    if (!result) return res.status(401).json({ message: 'Please use the correct password', success: false })

    delete user.password

    const token = JSONtoken.sign(user)

    res.status(200).json({ message: 'Congrats! you are authenticated', success: true, user, token })
  } catch (error) {
    res.status(500).json({ message: error.message, error })
  }
})

module.exports = router
