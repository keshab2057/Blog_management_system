const Joi = require("joi");
//register
const Schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  phone: Joi.number(),
  roles: Joi.array().items(Joi.string().valid("admin", "user")),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const resetSchema = Joi.object({
  userId: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
//profile update
const userSchema = Joi.object({
  userId: Joi.string(),
  name: Joi.string(),
  phone: Joi.number(),
});

const validate = (req, res, next) => {
  const { error, value } = Schema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    next();
  }
};

const resetvalidation = (req, res, next) => {
  const { error, value } = resetSchema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    next();
  }
};

const loginvalidation = (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    next();
  }
};

const uservalidation = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  } else {
    next();
  }
};

module.exports = { validate, resetvalidation, loginvalidation, uservalidation };
