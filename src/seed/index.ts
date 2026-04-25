import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import logger from '../../src/libs/logger';

const execAsync = promisify(exec);

const seeds: string[] = [
  'src/seed/load-data/load-role-data.ts',
  'src/seed/load-data/load-user-data.ts'
];

async function runSeed(seed: string) {
  logger.info(`▶ Running seed: ${seed}`);

  const { stdout, stderr } = await execAsync(`npx tsx ${seed}`);

  if (stderr) {
    throw new Error(stderr);
  }

  if (stdout) {
    logger.info(stdout);
  }
}

async function main() {
  try {
    for (const seed of seeds) {
      await runSeed(seed); // sequential execution
    }

    logger.info('✅ All seeds executed successfully');
    process.exit(0);
  } catch (err) {
    const detail =
      err instanceof Error
        ? `${err.name}: ${err.message}${err.stack ? `\n${err.stack}` : ''}`
        : String(err);
    logger.error(`Seeding failed: ${detail}`);
    process.exit(1);
  }
}

main();
