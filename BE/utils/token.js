var jwt = require('jsonwebtoken')

const sign = data => jwt.sign(data, 'secret_key')

const verify = token => {
  try {
    return jwt.verify(token, 'secret_key')
  } catch (error) {
    return false
  }
}

module.exports = {
  sign,
  verify,
}
