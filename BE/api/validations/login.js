const Joi = require('joi')

const LoginSchema = Joi.object({
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().required().min(6).max(8).label('Password'),
})

const validateLogin = (req, res, next) => {
  const { error } = LoginSchema.validate(req.body)

  if (error) return res.status(400).json({ message: error.details[0].message })

  next()
}

module.exports = validateLogin
