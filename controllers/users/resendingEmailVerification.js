const { User } = require('../../models')
const { BadRequest, NotFound } = require('http-errors')
const sendEmail = require('../../helpers/sendEmail')
// const createTemplate = require('../../helpers/mailGenerator')
const template = require('../../helpers/templateConformationEmail')

const { SITE_NAME } = process.env

const resendingEmailVerification = async (req, res, next) => {
  try {
    const { email } = req.body
    console.log(email)

    const user = await User.findOne({ email })
    if (!user) {
      throw new NotFound('User not found')
    }
    if (user.verify) {
      throw new BadRequest('Verification has already been passed')
    }

    const { verificationToken } = user

    const data = {
      to: email,
      subject: 'Welcome! Please confirm your email',

      html: template(SITE_NAME, verificationToken),
      // html: createTemplate(email, SITE_NAME, verificationToken),
    }
    sendEmail(data)

    res.status(200).json({ message: 'Verification email sent' })
  } catch (error) {
    next(error)
  }
}

module.exports = resendingEmailVerification
