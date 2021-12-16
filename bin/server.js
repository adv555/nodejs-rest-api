const app = require('../app')
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.listen(PORT, err => {
  if (err) {
    console.log('Error at a server launch', err)
  }
  console.log(`Server running. Use our API on port: ${PORT}`)
})
