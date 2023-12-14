const router = require('express').Router()

const { validateRegister } = require('../validations')
const { hashing, databaseOp, JSONtoken } = require('../../utils')
const { queries } = require('../../db')

router.post('/register', validateRegister, async (req, res) => {
  const { username, name, email, password, color } = req.body

  try {
    const { get, getLatest, insert } = databaseOp

    const user = await get('SELECT * FROM user WHERE email = ? OR username = ?', [email, username])

    if (user) return res.status(409).json({ message: 'Email or username already exist.' })

    const hash = await hashing.hash(password)

    const UTCTime = new Date().getTime()

    await insert(queries.insert.user, [name, username, email, hash, UTCTime, UTCTime, color])

    const result = await getLatest(['*'], 'user')

    delete result.password

    const token = JSONtoken.sign(result)

    res.status(200).json({ message: 'data inserted', success: true, user: result, token })
  } catch (error) {
    console.log('errororqwe :', error)
    res.status(500).json({ message: error.message, error })
  }
})

module.exports = router
