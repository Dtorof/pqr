import nodemailer from 'nodemailer'
import dotenv from 'dotenv/config'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: 'jorgetarifa33@gmail.com', 
      pass: 'tddfunoyhpzuzxcu', 
    },
  });

  transporter.verify().then((t) => t => console.log('Ready for emailer'))

  let info = await transporter.sendMail({
    from: '"PQR has been updated. Please, verify your process." <jorgetarifa33@gmail.com>', 
    to: user.username,
    subject: "PQR has been updated ✔", 
    text: "", 
    html: `
    <b> Status in your current process has been updated, please verify the changes. @Market Mix Team.</b>
    <a href="${verificationLink}" > ${verificationLink}  </a>
    `

  });