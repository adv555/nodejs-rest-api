const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const { User } = require('../../models')

const { SECRET_KEY } = process.env

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    const passwordCompare = await user?.comparePassword(password)

    if (!user || !passwordCompare) {
      throw new Unauthorized('Email or password is wrong')
    }
    if (!user.verify) {
      throw new Unauthorized('Email not verified')
    }

    const { _id, subscription, avatarURL } = user
    const payload = {
      id: _id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
    await User.findByIdAndUpdate(_id, { token })
    res.json({
      token,
      user: { email, subscription, avatarURL },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = userLogin
