const getAll = require('./getAll')
const updateAll = require('./updateAll')

const removeById = async contactId => {
  try {
    const contacts = await getAll()

    const idx = contacts.findIndex(contact => contact.id === contactId)
    console.log(idx)
    if (idx === -1) {
      return null
    }
    const newContacts = contacts.filter(contact => contact.id !== contactId)
    console.table(newContacts)
    await updateAll(newContacts)
    console.table(contacts[idx])
    return contacts[idx]
  } catch (error) {
    console.log('Error at removeById', error)
  }
}

module.exports = removeById
