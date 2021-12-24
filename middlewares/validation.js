const Joi = require('joi')
const { BadRequest } = require('http-errors')

const joiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
})

const contactValidation = (req, res, next) => {
  const { error } = joiSchema.validate(req.body)
  if (error) {
    throw new BadRequest(error.message)
  }
  next()
}

module.exports = { contactValidation }
