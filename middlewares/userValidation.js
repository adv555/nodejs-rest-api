const Joi = require('joi')
const { BadRequest } = require('http-errors')
const { emailRegExp } = require('../helpers/regExp')

const joiSchemaUser = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().default('starter'),
})

const joiSchemaUserSubscription = Joi.object({
  subscription: Joi.string().valid('starter', 'business', 'pro').required(),
})

const userValidation = (req, res, next) => {
  const { error } = joiSchemaUser.validate(req.body)
  if (error) {
    throw new BadRequest(error.message)
  }
  next()
}
const userSubscriptionValidation = (req, res, next) => {
  const { error } = joiSchemaUserSubscription.validate(req.body)
  if (error) {
    throw new BadRequest(error.message)
  }
  next()
}

module.exports = { userValidation, userSubscriptionValidation }
