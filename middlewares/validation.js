const Joi = require('joi')
const { BadRequest } = require('http-errors')

const joiSchemaContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
})

const joiSchemaContactStatus = Joi.object({
  favorite: Joi.boolean().required(),
})

const contactValidation = (req, res, next) => {
  const { error } = joiSchemaContact.validate(req.body)
  if (error) {
    throw new BadRequest(error.message)
  }
  next()
}
const contactStatusValidation = (req, res, next) => {
  const { error } = joiSchemaContactStatus.validate(req.body)
  if (error) {
    throw new BadRequest(error.message)
  }
  next()
}

module.exports = { contactValidation, contactStatusValidation }
