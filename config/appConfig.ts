import {config as loadenv} from 'dotenv'
import config from 'config';

loadenv();

const appConfig = {
  port: parseInt(process.env.PORT || String(config.get('port') || "3000"), 10),
  jwt: {
    secret: process.env.JWT_SECRET || config.get<string>('jwt.secret') || "your-secret-key",
    expiresIn: process.env.JWT_EXPIRES_IN || config.get<string>('jwt.expiresIn') || "24h"
  }
}

export default appConfig;