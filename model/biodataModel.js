const db = require('../config/db/mysql');

module.exports = {
    getAllBiodata(params) {
        db.query('SELECT * FROM biodata', params);
    },

    getBioById(id_bio, callback) {
        db.query('SELECT * FROM biodata WHERE id_bio = ?', [id_bio], callback);
    },

    createBio(data, callback) {
        db.query('INSERT INTO biodata SET ?', data, callback);
    },

    updateBio(id_bio, data, callback) {
        db.query('UPDATE biodata SET ? WHERE id_bio = ?', [data, id_bio], callback);
    },

    deleteBio(id_bio, callback) {
        db.query('DELETE FROM biodata WHERE id_bio = ?', [id_bio], callback);
    }
};
