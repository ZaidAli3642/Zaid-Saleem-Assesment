const Joi = require('joi')

const PasswordSchema = Joi.object({
  password: Joi.string().min(6).max(8).label('Password'),
})

const validatePassword = (req, res, next) => {
  const { error } = PasswordSchema.validate(req.body)

  if (error) return res.status(400).json({ message: error.details[0].message })

  next()
}

module.exports = validatePassword
