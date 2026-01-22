import config from "config";
import App from "./app";
import logger from "./libs/logger";

const PORT = config.get<number>('port');

async function main() {
  try {
    await App.startServer(PORT);
  } catch (error) {
    logger.error('Failed to start the server:', error);
    process.exit(1);
  }
}

main();