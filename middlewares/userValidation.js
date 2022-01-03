const Joi = require('joi')
const { BadRequest } = require('http-errors')
const { emailRegExp } = require('../helpers/regExp')

const joiSchemaUser = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().default('starter'),
})

const userValidation = (req, res, next) => {
  const { error } = joiSchemaUser.validate(req.body)
  if (error) {
    throw new BadRequest(error.message)
  }
  next()
}

module.exports = { userValidation }
