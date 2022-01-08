const { NotFound } = require('http-errors')
const { Contact } = require('../../models')

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

module.exports = getContactById
