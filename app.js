const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

// const jwt = require('jsonwebtoken')
// const SECRET_KEY = '2reIIONjkll;;;jhjkl'
// const payload = {
//   id: '61d20a9c714cacf94f51e94c',
// }
// const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
// console.log(token)
// const decodToken = jwt.decode(token)
// console.log(decodToken)
// try {
//   const verifyToken = jwt.verify(`${token}2`, SECRET_KEY)
//   console.log(verifyToken)
// } catch (error) {
//   console.log(error.message)
// }

const usersRouter = require('./routes/api/users')
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message: `${message} in app.js` })
})

module.exports = app
