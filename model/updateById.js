const getAll = require('./getAll')
const updateAll = require('./updateAll')

const updateById = async ({ contactId, name, email, phone }) => {
  console.log(contactId, name, email, phone)
  try {
    const contacts = await getAll()
    const idx = contacts.findIndex(contact => contact.id === contactId)
    if (idx === -1) {
      return null
    }
    contacts[idx] = { contactId, name, email, phone }
    console.table(contacts)
    await updateAll(contacts)
    return contacts[idx]
  } catch (error) {
    console.log('Error at updateById', error)
  }
}

module.exports = updateById
