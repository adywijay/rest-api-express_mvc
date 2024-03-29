const logger = require('../middleware/loging_creater');
const loggingMiddleware = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
};

module.exports = loggingMiddleware;