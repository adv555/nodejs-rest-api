const express = require('express')
const router = express.Router()

const { authenticate } = require('../../middlewares/authenticate')
const {
  userValidation,
  userSubscriptionValidation,
  userEmailValidation,
} = require('../../middlewares/userValidation')
const upload = require('../../middlewares/upload')
const {
  userSignup,
  userLogin,
  userLogOut,
  isLoggedIn,
  updateSubscription,
  updateAvatar,
  userEmailVerificationToken,
  resendEmailVerification,
} = require('../../controllers/users')

router.post('/signup', userValidation, userSignup)
router.post('/login', userValidation, userLogin)
router.get('/logout', authenticate, userLogOut)

router.get('/current', authenticate, isLoggedIn)
router.get('/verify/:verificationToken', userEmailVerificationToken)

router.post('/verify', userEmailValidation, resendEmailVerification)

router.patch('/', authenticate, userSubscriptionValidation, updateSubscription)
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar)

module.exports = router
