const { NotFound } = require('http-errors')
const { getAll, getById, removeById, add, updateById } = require('../model/index')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await getAll()
    res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params

  try {
    const contactById = await getById(contactId)
    console.log(contactId)
    if (!contactById) {
      throw new NotFound()
    }
    res.json({ status: 'success', code: 200, data: { contactById } })
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  console.log(contactId)
  try {
    const deletedContact = await removeById(contactId)
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

    const newContact = await add(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'contact added',
      data: { newContact },
    })
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    console.log(req.body)

    const updatedContact = await updateById({ contactId, ...req.body })

    res.json({ status: 'success', code: 200, message: 'contact updated', data: { updatedContact } })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
