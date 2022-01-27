const { NotFound } = require('http-errors')
const { User } = require('../../models')

const userEmailVerificationToken = async (req, res, next) => {
  try {
    const { verificationToken } = req.params
    const user = await User.findOne({ verificationToken })
    if (!user) {
      throw new NotFound('User not found')
    }
    await User.findByIdAndUpdate(user._id, { verificationToken: null, verify: true })

    res.status(200).json({ message: 'Verification successful' })
  } catch (error) {
    next(error)
  }
}

module.exports = userEmailVerificationToken
