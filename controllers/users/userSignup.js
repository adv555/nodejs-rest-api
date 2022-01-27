const { Conflict } = require('http-errors')
const { User } = require('../../models')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')
const sendEmail = require('../../helpers/sendEmail')
const template = require('../../helpers/templateConformationEmail')

const { SITE_NAME } = process.env

const userSignup = async (req, res, next) => {
  try {
    const { email, password, subscription = 'starter' } = req.body
    const user = await User.findOne({ email })

    if (user) {
      throw new Conflict('Email in use')
    }
    const avatarURL = gravatar.url(email)
    const verificationToken = nanoid()

    const newUser = new User({ email, subscription, avatarURL, verificationToken })
    newUser.setPassword(password)
    newUser.save()

    const data = {
      to: email,
      subject: 'Welcome! Please confirm your email',
      html: template(SITE_NAME, verificationToken),
    }
    sendEmail(data)

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
