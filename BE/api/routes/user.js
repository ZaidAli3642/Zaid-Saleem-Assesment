const route = require('express').Router()

const { auth } = require('../middleware')
const { databaseOp, hashing } = require('../../utils')
const { validateUser, validatePassword } = require('../validations')

route.put('/user', auth, validateUser, async (req, res) => {
  try {
    const { user_id } = req.query
    const { username, email, name } = req.body

    const user = await databaseOp.get('SELECT * from user WHERE id = ?', [user_id])

    if (!user) return res.status(404).json({ message: 'User not exist.' })

    await databaseOp.update('UPDATE user SET username = ?, email = ?, name = ? WHERE id = ?', [username, email, name, user_id])

    const updated_user = await databaseOp.get('SELECT * FROM user WHERE id = ?', [user_id])

    delete user.password

    res.status(200).json({ message: 'User updated.', success: true, user: updated_user })
  } catch (error) {
    res.status(500).json({ message: error.message, error })
  }
})

route.patch('/change-password', auth, validatePassword, async (req, res) => {
  try {
    const { user_id } = req.query
    const { password } = req.body

    const user = await databaseOp.get('SELECT * from user WHERE id = ?', [user_id])

    if (!user) return res.status(404).json({ message: 'User not exist.' })

    const hash = await hashing.hash(password)

    await databaseOp.update('UPDATE user SET password = ? WHERE id = ?', [hash, user_id])

    res.status(200).json({ message: 'Password updated.', success: true })
  } catch (error) {
    res.status(500).json({ message: error.message, error })
  }
})

module.exports = route
