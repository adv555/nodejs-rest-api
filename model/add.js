const { customAlphabet } = require('nanoid/async')
const nanoid = customAlphabet('1234567890', 10)
const getAll = require('./getAll')
const updateAll = require('./updateAll')

const add = async body => {
  //   console.log(body)

  try {
    const newContact = { id: await nanoid(), ...body }
    // console.table(newContact)

    const contacts = await getAll()

    contacts.push(newContact)
    // console.table(contacts)
    await updateAll(contacts)
    return newContact
  } catch (error) {
    console.log('Error at add', error)
  }
}

module.exports = add
