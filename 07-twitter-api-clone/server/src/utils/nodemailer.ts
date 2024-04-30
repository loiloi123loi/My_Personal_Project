import { createTransport } from 'nodemailer'

export const sendEmail = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
  const transport = createTransport()
  return transport.sendMail({
    from: process.env.MAIL_SEND,
    to,
    subject,
    html
  })
}
