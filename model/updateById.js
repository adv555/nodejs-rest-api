const getAll = require('./getAll')
const updateAll = require('./updateAll')

const updateById = async ({ contactId, name, email, phone }) => {
  console.log(contactId, name, email, phone)

  const contacts = await getAll()
  const idx = contacts.findIndex(contact => contact.id === contactId)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { id: contactId, name, email, phone }
  console.table(contacts[idx])
  await updateAll(contacts)
  return contacts[idx]
}

module.exports = updateById
