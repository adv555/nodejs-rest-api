const { Contact } = require('../../models')

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

module.exports = updateContactStatus
