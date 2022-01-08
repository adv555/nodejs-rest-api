const express = require('express')
const router = express.Router()

const { authenticate } = require('../../middlewares/authenticate')
const { userValidation, userSubscriptionValidation } = require('../../middlewares/userValidation')
const {
  userSignup,
  userLogin,
  userLogOut,
  isLoggedIn,
  updateSubscription,
} = require('../../controllers/users')

router.post('/signup', userValidation, userSignup)
router.post('/login', userValidation, userLogin)
router.get('/logout', authenticate, userLogOut)

router.get('/current', authenticate, isLoggedIn)
router.patch('/', authenticate, userSubscriptionValidation, updateSubscription)

module.exports = router
