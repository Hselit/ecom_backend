import {config as loadenv} from 'dotenv'

loadenv();

const config = {
  port: parseInt(process.env.PORT || "3000",10)
}

export default config;