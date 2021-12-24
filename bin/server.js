const app = require('../app')
require('dotenv').config()
const mongoose = require('mongoose')
const { exist } = require('joi')

const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful')
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(err => {
    console.log('Error at a server launch', err.message)
    exist(1)
  })
