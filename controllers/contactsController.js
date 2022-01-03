const { NotFound } = require('http-errors')
const { Contact } = require('../models')

const listContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query
    // let { page = 1, limit = 20 } = req.query
    // limit = parseInt(limit) > 10 ? 10 : parseInt(limit)

    const skip = (page - 1) * limit
    const { _id } = req.user
    const contacts = await Contact.find({ owner: _id }, '-createdAt -updatedAt', {
      skip,
      limit: +limit,
    })

    res.json({ status: 'success', code: 200, data: { contacts }, skip, limit })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const { _id } = req.user

  try {
    const contactById = await Contact.findOne({ _id: contactId, owner: _id })

    if (!contactById) {
      throw new NotFound('Not Found1')
    }
    res.json({ status: 'success', code: 200, data: { contactById } })
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404
      error.message = 'Not Found2'
    }
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const { _id } = req.user

  try {
    // const deletedContact = await Contact.findByIdAndRemove(contactId)
    const deletedContact = await Contact.findOneAndRemove({ _id: contactId, owner: _id })

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
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404
      error.message = 'Not Found'
    }
    next(error)
  }
}

const addContact = async (req, res, next) => {
  // console.log(req.user)
  try {
    const { _id } = req.user
    const newContact = await Contact.create({ ...req.body, owner: _id })
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'contact added',
      data: { newContact },
    })
  } catch (error) {
    if (error.message.includes('validation failed')) {
      error.status = 400
    }
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { _id } = req.user

    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: _id },
      req.body,
      { new: true },
    )
    if (!updatedContact) {
      throw new NotFound()
    }
    res.json({ status: 'success', code: 200, message: 'contact updated', data: { updatedContact } })
  } catch (error) {
    if (error.message.includes('validation failed')) {
      error.status = 400
    }
    next(error)
  }
}

const updateContactStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body
    const { _id } = req.user
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner: _id },
      { favorite },
      { new: true },
    )
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
