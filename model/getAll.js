const contactsPath = require('./contactsPath')
const fs = require('fs').promises

const getAll = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = await JSON.parse(data)
    console.table(contacts)
    return contacts
  } catch (error) {
    console.log('Error at getAll', error.message)

    throw error.message
  }
}

module.exports = getAll
