const sendEmail = require('./sendEmail')

const sendVerifycationEmail = ({ name, email, verifycationToken, origin }) => {
    const urlVerify = `${origin}/user/verify-email?token=${verifycationToken}&email=${email}`

    const message = `<p>Please confirm your email by clicking on the following link : <a href="${urlVerify}">Verify Email</a> </p>`
    return sendEmail({
        to: email,
        subject: 'Email confirmation',
        html: `<h4>Hello ${name}, ${message}</h4>`,
    })
}

module.exports = sendVerifycationEmail
