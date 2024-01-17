const nodemailer = require('nodemailer')
const nodemailerConfig = require('../configs/nodemailer/nodemailerConfig')

const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport(nodemailerConfig)
    return transporter.sendMail({
        from: process.env.MAIL_SEND,
        to,
        subject,
        html,
    })
}

module.exports = sendEmail
