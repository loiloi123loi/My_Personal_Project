const sendEmail = require('./sendEmail')

const sendVerifycationEmail = ({ name, email, verifycationToken, origin }) => {
    const urlVerify = `${origin}/verify-email?token=${verifycationToken}&email=${email}`

    const message = `
        <h1>Welcom to LOI CHAT, thank you for registering an account LOI CHAT</h1>
        <p>
            Please confirm your email by clicking on the following link : 
            <a href="${urlVerify}">Verify Email</a> 
        </p>`
    return sendEmail({
        to: email,
        subject: 'Email confirmation',
        html: `<h4>Hello ${name}, ${message}</h4>`,
    })
}

module.exports = sendVerifycationEmail
