const Mailgen = require('mailgen')
const sgMail = require('@sendgrid/mail')
const config = require('../configs/config.json')
require('dotenv').config()

class EmailService {
  #sender = sgMail
  #GenerateTemplate = Mailgen
  constructor(env) {
    switch (env) {
      case 'development':
        this.link = config.dev
        break
      case 'stage':
        this.link = config.stage
        break
      case 'production':
        this.link = config.prod
        break
      default:
        this.link = config.dev
        break
    }
  }

  #createTemplate(verifyToken, name = 'Guest') {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'cerberus',
      product: {
        name: 'Contacts project',
        link: this.link,
      },
    })
    const emailTemplate = {
      body: {
        name,
        intro: 'Welcome to Homework 6 Contacts project',
        action: {
          instructions: 'To get started with service, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}api/auth/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    }
    return mailGenerator.generate(emailTemplate)
  }

  async sendEmail(verifyToken, email, name = 'Guest') {
    const emailBody = this.#createTemplate(verifyToken, name)
    this.#sender.setApiKey(process.env.API_KEY_SGRID)
    const msg = {
      to: email,
      from: 'm0933110086@gmail.com', // Use the email address or domain you verified above
      subject: 'Sending with Twilio SendGrid',
      html: emailBody,
    }
    await this.#sender.send(msg)
  }
}

module.exports = EmailService
