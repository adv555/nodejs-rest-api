const { customAlphabet } = require('nanoid/async')
const nanoid = customAlphabet('1234567890', 10)
const getAll = require('./getAll')
const updateAll = require('./updateAll')

const add = async body => {
  const newContact = { id: await nanoid(), ...body }
  const contacts = await getAll()
  contacts.push(newContact)

  await updateAll(contacts)
  console.table(newContact)
  return newContact
}

module.exports = add
