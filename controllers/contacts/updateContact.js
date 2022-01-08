const { NotFound } = require('http-errors')
const { Contact } = require('../../models')

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

module.exports = updateContact
