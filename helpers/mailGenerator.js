const Mailgen = require('mailgen')

// Создание шаблона
const createTemplate = (email, site, verifyToken) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'System Contacts',
      link: `${site}/api/users/verify/${verifyToken}`,
    },
  })

  const template = {
    body: {
      name: email,
      intro: "Welcome to System Contacts! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with System Contacts, please click here:',
        button: {
          color: '#22BC66',
          text: 'Confirm Your Email',
          link: `${site}/api/users/verify/${verifyToken}`,
        },
      },
      outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  }

  const emailBody = mailGenerator.generate(template)
  return emailBody
}

module.exports = createTemplate
