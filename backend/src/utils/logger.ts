import * as winston from 'winston';

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.cli(),
      winston.format.splat(),
    ),
  }),
];

const logger = winston.createLogger({
  level: 'silly',
  transports,
  format: winston.format.combine(
    winston.format.json(),
  ),
});

export default logger;
