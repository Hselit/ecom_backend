import winston from 'winston';

const readableConsole = winston.format.printf((info) => {
  const { level, message, timestamp, stack, ...meta } = info;
  const ts = typeof timestamp === 'string' ? timestamp : new Date().toISOString();
  const lvl = String(level).toUpperCase().padEnd(5);
  let msg: string;
  if (typeof message === 'string') {
    msg = message;
  } else if (message instanceof Error) {
    msg = `${message.name}: ${message.message}`;
  } else if (message !== undefined && message !== null) {
    msg = JSON.stringify(message);
  } else {
    msg = '';
  }
  const stackPart = stack ? `\n${stack}` : '';
  const metaKeys = Object.keys(meta).filter((k) => !k.startsWith('Symbol(') && k !== 'splat');
  const extra =
    metaKeys.length > 0 ? ` ${JSON.stringify(Object.fromEntries(metaKeys.map((k) => [k, meta[k]])))}` : '';
  return `${ts} ${lvl} ${msg}${extra}${stackPart}`;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    readableConsole,
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
