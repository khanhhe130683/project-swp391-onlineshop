import { config } from 'dotenv';
config();

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
};
<<<<<<< HEAD
=======

export const sendGridConfig = {
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  sesSendFrom: 'longtt1@vmodev.com',
  subjectMail: 'FORGOT PASSWORD SUCCESS',
};
>>>>>>> khanhtq
