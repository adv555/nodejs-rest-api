const { Contact } = require('../../models')

const getContactsList = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query

    const skip = (page - 1) * limit
    const { _id } = req.user

    const contacts = await Contact.find({ owner: _id, ...req.query }, '-createdAt -updatedAt', {
      skip,
      limit: +limit,
    })

    res.json({
      status: 'success',
      code: 200,
      data: { contacts },
      skip,
      limit,
      total: contacts.length,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getContactsList
