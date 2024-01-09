let User = require('../model/userModel');
let dd = require('../config/debuging/change_debug');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './.env' });
const secretKey = process.env.JWT_SECRET;


module.exports = {

    registerAuth(req, res) {


        const { username, email, password } = req.body;

        User.checkExisistEmail(email, (er, rsl) => {

            //console.log(rsl.length);
            if (rsl.length >= 1) {
                return res.status(302).json({ msg: `${email} already exisist` });
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    const rebuildKey = { username, email, password: hash };
                    User.setUser(rebuildKey, (error, results) => {

                        try {
                            if (error) {
                                return res.status(400).json({ error: 'failled registrations' });
                            }
                            res.status(201).json({ message: 'success' });

                        } catch (e) {
                            console.log(e.stack);
                        }
                    });
                });
            }
        });
    },

    Login(req, res) {
        const { username, password } = req.body;
        User.getUser(username, (error, results) => {
            if (error || results.length === 0) {
                return res.status(401).json({ error: 'Username atau password salah' });
            }

            const user = results[0];
            bcrypt.compare(password, user.password, (err, matched) => {
                if (!matched) {
                    return res.status(401).json({ error: 'Username atau password salah' });
                }
                const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '30m' });
                return res.status(200).json({
                    username: username,
                    type: 'Bearer',
                    token: token
                });
            });
        });
    }
};