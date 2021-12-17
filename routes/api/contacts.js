const express = require('express')
const router = express.Router()
const { contactValidation } = require('../../middlewares/validation')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../controllers/contactsController')

router.get('/', listContacts)
router.get('/:contactId', getContactById)
router.post('/', contactValidation, addContact)
router.delete('/:contactId', removeContact)
router.put('/:contactId', contactValidation, updateContact)

module.exports = router
