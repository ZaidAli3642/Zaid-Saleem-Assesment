const { JSONtoken } = require('../../utils')

const auth = (req, res, next) => {
  const authToken = req.headers['authorization']
  const token = authToken?.split(' ')[1]
  const result = JSONtoken.verify(token)

  if (!authToken || !result) return res.status(401).json({ message: 'User not authenticated.' })

  next()
}

module.exports = auth
