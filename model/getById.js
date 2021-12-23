const getAll = require('./getAll')

const getById = async contactId => {
  console.log(contactId)

  const contacts = await getAll()
  const contactById = contacts.find(contact => contact.id === contactId)
  if (!contactById) {
    return null
  }
  console.table(contactById)
  return contactById
}

module.exports = getById
