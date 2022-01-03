const { NotFound } = require('http-errors')
const { Contact } = require('../../models')

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

module.exports = removeContact
