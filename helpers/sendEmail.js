const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID_API_KEY, SENDGRID_EMAIL_FROM } = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

const sendEmail = async data => {
  try {
    const email = { ...data, from: SENDGRID_EMAIL_FROM }
    await sgMail.send(email)
    console.log('Email sent')
    return true
  } catch (error) {
    console.error(error)
  }
}

module.exports = sendEmail
