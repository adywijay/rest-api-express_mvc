const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './.env' });
const secretKey = process.env.JWT_SECRET;

module.exports = {
    verifyToken: (req, res, next) => {
        let exceptRoutes = [
            '/api/v1/auth/login',
            '/api/v1/auth/register'
        ];

        if (exceptRoutes.includes(req.path, exceptRoutes) === true) {

            return next();

        } else {
            const authHeader = req.headers.authorization;
            if (authHeader) {

                const token = authHeader.split(' ')[1];
                jwt.verify(token, secretKey, (err, user) => {
                    if (err) {
                        return res.status(403).json({ error: 'token not match' });
                    }

                    req.user = user;
                    next();
                });

            } else {
                res.status(401).json({ error: 'not authority' });
            }
        }


    }
};