const Joi = require('joi')
const { BadRequest } = require('http-errors')
const { emailRegExp, phoneRegExp } = require('../helpers/regExp')

const joiSchemaContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  phone: Joi.string().pattern(phoneRegExp).required(),
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
