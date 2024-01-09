const db = require('../config/db/mysql');

module.exports = {


    getUser(username, callback) {
        db.query('SELECT * FROM users WHERE username = ?', username, callback);
    },

    checkExisistEmail(email, callback) {
        db.query('SELECT email FROM users WHERE email = ?', email, callback);
    },

    setUser(data, callback) {
        db.query('INSERT INTO users SET ?', data, callback);
    },

    updateBio(id_bio, data, callback) {
        db.query('UPDATE biodata SET ? WHERE id_bio = ?', [data, id_bio], callback);
    },

    deleteBio(id_bio, callback) {
        db.query('DELETE FROM biodata WHERE id_bio = ?', [id_bio], callback);
    }
};
