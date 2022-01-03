const getContactsList = require('./getContactsList')
const getContactById = require('./getContactById')
const removeContact = require('./removeContact')
const addContact = require('./addContact')
const updateContact = require('./updateContact')
const updateContactStatus = require('./updateContactStatus')

module.exports = {
  getContactsList,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
}
