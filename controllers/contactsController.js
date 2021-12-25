const { NotFound } = require('http-errors')
const { Contact } = require('../models')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find()
    res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contactById = await Contact.findById(contactId)

    if (!contactById) {
      throw new NotFound()
    }
    res.json({ status: 'success', code: 200, data: { contactById } })
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404
      // error.message = 'Not Found'
    }
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params

  try {
    const deletedContact = await Contact.findByIdAndRemove(contactId)

    if (!deletedContact) {
      throw new NotFound()
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: { deletedContact },
    })
  } catch (error) {
    next(error)
  }
}
const addContact = async (req, res, next) => {
  try {
    console.log('body', req.body)
    const newContact = await Contact.create(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'contact added',
      data: { newContact },
    })
  } catch (error) {
    if (error.message.includes('validation failed')) {
      error.status = 400
      error.message = 'bad request'
    }
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    console.log(req.body)
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    res.json({ status: 'success', code: 200, message: 'contact updated', data: { updatedContact } })
  } catch (error) {
    if (error.message.includes('validation failed')) {
      error.status = 400
      error.message = 'bad request'
    }
    next(error)
  }
}
const updateContactStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body
    const updatedContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
    res.json({
      status: 'success',
      code: 200,
      message: 'contact status updated',
      data: { updatedContact },
    })
  } catch (error) {
    if (error.message.includes('validation failed')) {
      error.status = 400
      error.message = 'missing field favorite'
    }
    next(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
}
