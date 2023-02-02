import { createTransport } from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();
const sendUser = process.env.EMAIL_HOST_USER;
const userPass = process.env.EMAIL_HOST_PASSWORD;

const transporter = createTransport({
  service: 'Gmail',
  auth: {
    user: sendUser,
    pass: userPass,
  },
});

export default transporter;