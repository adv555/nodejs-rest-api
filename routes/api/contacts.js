const express = require('express')
const router = express.Router()
const {
  contactValidation,
  contactStatusValidation,
} = require('../../middlewares/contactValidation')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
} = require('../../controllers/contactsController')

router.get('/', listContacts)
router.get('/:contactId', getContactById)
router.post('/', contactValidation, addContact)
router.delete('/:contactId', removeContact)
router.put('/:contactId', contactValidation, updateContact)
router.patch('/:contactId/favorite', contactStatusValidation, updateContactStatus)

module.exports = router
