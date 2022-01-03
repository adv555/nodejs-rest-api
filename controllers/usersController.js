// const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Conflict, Unauthorized } = require('http-errors')
const { User } = require('../models')
// const hashPassword = require('../helpers/hashPassword')

const { SECRET_KEY } = process.env

const userSignup = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { email, password, subscription = 'starter' } = req.body
    const user = await User.findOne({ email })

    if (user) {
      throw new Conflict('Email in use')
    }
    // const salt = await bcrypt.genSalt(10)
    // const hashPassword = await bcrypt.hash(password, salt)

    // const newUser = await User.create({
    //   email,
    //   password: hashPassword,
    //   subscription,
    // })

    const newUser = new User({ email, subscription })
    newUser.setPassword(password)
    newUser.save()

    // console.log(newUser)

    res.status(201).json({
      user: {
        email: email,
        subscription: subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      throw new Unauthorized('Email or password is wrong')
    }
    const passwordCompare = user.comparePassword(password)
    // const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      throw new Unauthorized('Email or password is wrong')
    }
    const { _id, subscription } = user
    const payload = {
      id: _id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
    await User.findByIdAndUpdate(_id, { token })
    res.json({
      token,
      user: { email, subscription },
    })
  } catch (error) {
    next(error)
  }
}

const userLogOut = async (req, res, next) => {
  const { _id } = req.user
  await User.findByIdAndUpdate({ _id }, { token: null })

  res.status(204).json()
}

const isLoggedIn = async (req, res, next) => {
  const currentUser = req.user
  const { email, subscription } = currentUser

  res.json({
    email,
    subscription,
  })
}

module.exports = { userSignup, userLogin, userLogOut, isLoggedIn }
