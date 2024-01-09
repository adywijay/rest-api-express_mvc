const { createLogger, transports, format } = require('winston');
require('dotenv').config({ path: './.env' });
const timezone = process.env.TIMEZONE;
const moment = require('moment-timezone');
const currentTime = moment().tz(timezone).format('YYYY-MM-DD');

const logger = createLogger({
    transports: [
        new transports.File({ filename: `./logs/${currentTime}.log`, level: 'info' }) // Menyimpan log ke dalam file 'app.log' dengan level 'info'
    ],
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json()
    )
});

module.exports = logger;