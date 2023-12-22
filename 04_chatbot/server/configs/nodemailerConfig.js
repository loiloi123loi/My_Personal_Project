module.exports = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_SEND,
        pass: process.env.PASS_MAIL_SEND,
    },
}
