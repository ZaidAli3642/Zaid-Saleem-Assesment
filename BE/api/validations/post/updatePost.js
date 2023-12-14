const Joi = require('joi')

const updatePostSchema = Joi.object({
  description: Joi.string().required().label('Description'),
})

const validateUpdatePost = (req, res, next) => {
  const { error } = updatePostSchema.validate(req.body)

  if (error) return res.status(400).json({ message: error.details[0].message })

  next()
}

module.exports = validateUpdatePost
