const bcrypt = require('bcrypt')

const saltRounds = 10

const hash = data => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(data, saltRounds, (err, hash) => {
      if (err) reject(new Error('Error generating hash'))

      resolve(hash)
    })
  })
}

const compare = async (data, encryptedData) => {
  try {
    return await bcrypt.compare(data, encryptedData)
  } catch (error) {
    throw new Error('Error comparing the data')
  }
}

module.exports = {
  hash,
  compare,
}
