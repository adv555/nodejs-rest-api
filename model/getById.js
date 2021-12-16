const getAll = require('./getAll')

const getById = async contactId => {
  try {
    const contacts = await getAll()
    const contactById = contacts.filter(contact => contact.id === contactId)
    if (contactById) {
      return null
    }
    console.table(contactById)
    return contactById
  } catch (error) {
    console.log('Error at getById', error)
  }
}

module.exports = getById
