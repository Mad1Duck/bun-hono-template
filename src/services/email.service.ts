import * as nodemailer from 'nodemailer';
import { emailConfig } from '../bin/config';

const transporter = nodemailer.createTransport(emailConfig);

export const sendEmail = async (type: string, to: string, data: Record<string, any>) => {
  let subject, text;

  switch (type) {
    case 'confirmation':
      subject = 'Email Confirmation';
      text = `Please confirm your email by clicking this link: ${data.confirmationLink}`;
      break;

    case 'otp':
      subject = 'Your OTP Code';
      text = `Your OTP code is: ${data.otpCode}`;
      break;

    case 'reset-password':
      subject = 'Reset Your Password';
      text = `Click this link to reset your password: ${data.resetLink}`;
      break;

    default:
      throw new Error('Unknown email type');
  }

  await transporter.sendMail({
    from: '"Your App" <no-reply@example.com>',
    to,
    subject,
    text,
  });
};
