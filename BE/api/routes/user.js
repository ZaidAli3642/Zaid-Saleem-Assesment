const route = require('express').Router()

const { auth } = require('../middleware')
const { databaseOp, hashing, JSONtoken } = require('../../utils')
const { validateUser, validatePassword } = require('../validations')
const { queries } = require('../../db')

route.put('/update_user', auth, validateUser, async (req, res) => {
  try {
    const { user_id } = req.query
    const { username, email, name, password } = req.body

    const user = await databaseOp.get('SELECT * from user WHERE id = ?', [user_id])

    if (!user) return res.status(404).json({ message: 'User not exist.' })

    let query = queries.update.user
    const params = [username, email, name]

    if (password) {
      const hash = await hashing.hash(password)

      query = queries.update.updateUserWithPassword
      params.push(hash)
    }

    await databaseOp.update(query, [...params, user_id])

    const updated_user = await databaseOp.get('SELECT * FROM user WHERE id = ?', [user_id])

    delete updated_user.password

    const token = JSONtoken.sign(updated_user)

    res.status(200).json({ message: 'User updated.', success: true, user: updated_user, token })
  } catch (error) {
    res.status(500).json({ message: error.message, error })
  }
})

// route.patch('/change-password', auth, validatePassword, async (req, res) => {
//   try {
//     const { user_id } = req.query
//     const { password } = req.body

//     const user = await databaseOp.get('SELECT * from user WHERE id = ?', [user_id])

//     if (!user) return res.status(404).json({ message: 'User not exist.' })

//     const hash = await hashing.hash(password)

//     await databaseOp.update('UPDATE user SET password = ? WHERE id = ?', [hash, user_id])

//     res.status(200).json({ message: 'Password updated.', success: true })
//   } catch (error) {
//     res.status(500).json({ message: error.message, error })
//   }
// })

module.exports = route
