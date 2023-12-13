const router = require('express').Router()

const { validateRegister } = require('../validations')
const { hashing, databaseOp, JSONtoken } = require('../../utils')
const { queries } = require('../../db')

router.post('/register', validateRegister, async (req, res) => {
  const { username, name, email, password } = req.body

  try {
    const { get, getLatest, insert } = databaseOp

    const user = await get('SELECT * FROM user WHERE email = ?', [email])
    console.log('resulstqwe :', user)

    if (user) return res.status(409).json({ message: 'Email already exist. Please use other email' })

    const hash = await hashing.hash(password)

    const UTCTime = new Date().getTime()

    await insert(queries.insert.user, [name, username, email, hash, UTCTime, UTCTime])

    const result = await getLatest(['*'], 'user')

    delete result.password

    const token = JSONtoken.sign(user)

    res.status(200).json({ message: 'data inserted', success: true, data: result, token })
  } catch (error) {
    res.status(500).json({ message: error.message, error })
  }
})

module.exports = router
