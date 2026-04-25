import {config as loadenv} from 'dotenv'
import config from 'config';

loadenv({ quiet: true });

const appConfig = {
  port: parseInt(process.env.PORT || String(config.get('port') || "3000"), 10),
  jwt: {
    secret: process.env.JWT_SECRET || config.get<string>('jwt.secret') || "your-secret-key",
    expiresIn: process.env.JWT_EXPIRES_IN || config.get<string>('jwt.expiresIn') || "24h"
  },
  email: {
    host: process.env.EMAIL_HOST || config.get<string>('email.host') || 'smtp.example.com',
    port: parseInt(process.env.EMAIL_PORT || String(config.get<number>('email.port') || "587"), 10),
    secure: process.env.EMAIL_SECURE === 'true' || config.get<boolean>('email.secure') || false,
    auth: {
      user: process.env.EMAIL_USER || config.get<string>('email.auth.user') || '',
      pass: process.env.EMAIL_PASS || config.get<string>('email.auth.pass') || ''
    },
    from: config.get<string>('email.from') || ''
  }
}

export default appConfig;