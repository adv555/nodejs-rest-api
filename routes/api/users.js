const express = require('express')
const router = express.Router()

const { authenticate } = require('../../middlewares/authenticate')
const { userValidation } = require('../../middlewares/userValidation')
const { userSignup, userLogin, userLogOut, isLoggedIn } = require('../../controllers/users')

router.post('/signup', userValidation, userSignup)
router.post('/login', userValidation, userLogin)
router.get('/logout', authenticate, userLogOut)

router.get('/current', authenticate, isLoggedIn)

module.exports = router
