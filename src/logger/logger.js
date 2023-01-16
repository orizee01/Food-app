import { format, createLogger, transports } from "winston";

const { timestamp, combine, errors, printf, json } = format;

export const prodLogger = () => {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: "user-service" },
    transports: [
      new transports.File({
        filename: "./server.log",
      }),
      new transports.Console(),
    ],
  });
}

export const devLogger = ()=> {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} - ${level.toUpperCase().padEnd(5)} - ${ stack || message }`;
  });

  return createLogger({
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console()],
  });
}

export const testLogger = () => {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} - ${level.toUpperCase().padEnd(5)} - ${ stack || message }`;
  });

  return createLogger({
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console()],
  });
}