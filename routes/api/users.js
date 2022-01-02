const express = require('express')
const router = express.Router()

const { userValidation } = require('../../middlewares/userValidation')
const { userSignup, userLogin } = require('../../controllers/usersController')

router.post('/signup', userValidation, userSignup)
router.post('/login', userValidation, userLogin)
router.get('/logout')

module.exports = router
