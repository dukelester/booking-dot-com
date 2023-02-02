/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { createTransport } from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();
const sendUser = process.env.EMAIL_HOST_USER;
const userPass = process.env.EMAIL_HOST_PASSWORD;

const transport = createTransport({
  service: 'Gmail',
  auth: {
    user: sendUser,
    pass: userPass,
  },
});

const sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log('check ...');
  transport.sendMail({
    from: sendUser,
    to: email,
    subject: 'Please confirm your email',
    html: `<h1>Email Confirmation</h1>
    <h2>Hello ${name}</h2>
    <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
    <a href=http://localhost:5000/api/auth/confirm/${confirmationCode}> Click here</a>
    </div>`,
  }).catch((error) => {
    console.log(error);
  });
};

export default sendConfirmationEmail;
