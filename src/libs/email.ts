import nodemailer from 'nodemailer';
import config from 'config';
import logger from './logger.js';

type EmailConfig = {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
};

const emailConfig = config.get<EmailConfig>('email');

// Create transporter
const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: emailConfig.secure,
  auth: {
    user: emailConfig.auth.user,
    pass: emailConfig.auth.pass,
  },
});

export async function sendVerificationEmail(email: string, verificationCode: string): Promise<void> {
  try {
    const mailOptions = {
      from: emailConfig.from,
      to: email,
      subject: 'Email Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Thank you for registering! Please use the following code to verify your email address:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; margin: 0; font-size: 32px; letter-spacing: 5px;">${verificationCode}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't create an account, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Verification email sent to ${email}`);
  } catch (error) {
    logger.error('Failed to send verification email:', error);
    throw new Error('Failed to send verification email');
  }
}

export function generateVerificationCode(): string {
  // Generate a 6-digit verification code
  return Math.floor(100000 + Math.random() * 900000).toString();
}

