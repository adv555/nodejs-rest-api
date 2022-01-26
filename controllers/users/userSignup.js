const { Conflict } = require('http-errors')
const { User } = require('../../models')
const gravatar = require('gravatar')

const userSignup = async (req, res, next) => {
  try {
    const { email, password, subscription = 'starter' } = req.body
    const user = await User.findOne({ email })

    if (user) {
      throw new Conflict('Email in use')
    }
    const avatarURL = gravatar.url(email)
    const newUser = new User({ email, subscription, avatarURL })
    newUser.setPassword(password)
    newUser.save()

    res.status(201).json({
      user: {
        email: email,
        subscription: subscription,
        avatar: avatarURL,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = userSignup
