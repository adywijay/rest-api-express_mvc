/**
 * ==============================================================================+
 *                                                                               |
 *                         Call Modul or Config Library                          |
 *                                                                               |
 * ==============================================================================+
 */
const express = require('express');
const app = express();
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');

require('dotenv').config({ path: './.env' });
const port = process.env.APP_PORT;
const timezone = process.env.TIMEZONE;
var bodyParser = require('body-parser');
const moment = require('moment-timezone');
const authvalidation = require('./config/middleware/utils/authVerify');
const currentTime = moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');

const logger = require('./config/middleware/loging_creater');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authvalidation.verifyToken);

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`); // Catat setiap permintaan yang masuk
    next();
});
/**
 * ==============================================================================+
 *                                                                               |
 *                         Call Modul or config routing                          |
 *                                                                               |
 * ==============================================================================+
 */
let route_testing = require('./route/testing');
app.use('/testing', route_testing);

let routing_auth = require('./route/auth');
app.use('/api/v1/auth', routing_auth);













/**
 * ==============================================================================+
 *                                                                               |
 *                               Lister or Create Log Server                     |
 *                                                                               |
 * ==============================================================================+
 */

app.listen(port, () =>
    console.log(
        `App listening to port http://localhost:${port}, Running at: ${currentTime}`
    )
);