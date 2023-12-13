var jwt = require('jsonwebtoken')

const sign = data => jwt.sign(data, 'secret_key')

const verify = token => jwt.verify(token, 'secret_key')

module.exports = {
  sign,
  verify,
}
