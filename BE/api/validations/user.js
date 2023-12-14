const Joi = require('joi')

const UserSchema = Joi.object({
  password: Joi.string().min(8).label('Password'),
  username: Joi.string().min(8).label('Username'),
  name: Joi.string().label('Name'),
  email: Joi.string().email().label('Email'),
})

const validateUser = (req, res, next) => {
  const { error } = UserSchema.validate(req.body)

  if (error) return res.status(400).json({ message: error.details[0].message })

  next()
}

module.exports = validateUser
