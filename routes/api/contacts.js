const express = require('express')
const router = express.Router()
const { authenticate } = require('../../middlewares/authenticate')
const {
  contactValidation,
  contactStatusValidation,
} = require('../../middlewares/contactValidation')

const {
  getContactsList,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
} = require('../../controllers/contacts')

router.get('/', authenticate, getContactsList)
router.get('/:contactId', authenticate, getContactById)
router.post('/', authenticate, contactValidation, addContact)
router.delete('/:contactId', authenticate, removeContact)
router.put('/:contactId', authenticate, contactValidation, updateContact)
router.patch('/:contactId/favorite', authenticate, contactStatusValidation, updateContactStatus)

module.exports = router
