const Joi = require('joi')

const savePostShema = Joi.object({
  description: Joi.string().required().label('Description'),
  user_id: Joi.number().required().label('User Id'),
})

const validateSavePost = (req, res, next) => {
  const { error } = savePostShema.validate(req.body)

  if (error) return res.status(400).json({ message: error.details[0].message })

  next()
}

module.exports = validateSavePost
