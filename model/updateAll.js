const fs = require('fs').promises
const contactsPath = require('./contactsPath')

const updateAll = async data => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, '\t'))
  } catch (error) {
    console.log('Error at updateAll', error)
    throw error.message
  }
}

module.exports = updateAll
