const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, prettyPrint } = format;
let logger = null;

const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp}, ${level}: ${typeof message == 'string' ? message : JSON.stringify(message)}`;
});

logger = createLogger({
    level: process.env.NODE_ENV == 'production' ? 'debug' : 'silly',
    format: combine(colorize(), timestamp({ format: "HH:mm:ss" }), customFormat),
    transports: [
        new transports.Console()
    ],
});

module.exports = logger;