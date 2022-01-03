const { Schema, SchemaTypes, model } = require('mongoose')
const { emailRegExp, phoneRegExp } = require('../helpers/regExp')

const contactShema = Schema(
  {
    name: { type: String, required: [true, 'Set name for contact'] },
    email: { type: String, match: emailRegExp },
    phone: { type: String, match: phoneRegExp },
    favorite: { type: Boolean, default: false },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)

const Contact = model('contact', contactShema)

module.exports = { Contact }
