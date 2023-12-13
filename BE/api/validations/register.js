const Joi = require("joi");

const RegisterSchema = Joi.object({
  username: Joi.string().min(8).label("Username"),
  name: Joi.string().label("Name"),
  email: Joi.string().email().label("Email"),
  password: Joi.string().min(6).max(8).label("Password"),
});

const validateRegister = (req, res, next) => {
  const { error } = RegisterSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

module.exports = validateRegister;
