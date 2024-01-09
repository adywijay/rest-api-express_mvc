let Biodata = require('../model/biodataModel');
let dd = require('../config/debuging/change_debug');

module.exports = {

    sayHello(req, res) {
        return res.status(200).json({ msg: 'Hello World' });
    },
    addBio(req, res) {

        const tempField = {
            nama_lengkap: req.body.nama_lengkap,
            alamat: req.body.alamat,
            kelas: req.body.kelas
        };
        Biodata.createBio(tempField, (err, result) => {
            try {
                if (err) {
                    return res.status(500).send('Internal Server Error');
                }
                dd.Table({
                    result: {
                        affectedRows: result.affectedRows,
                        insertId: result.insertId
                    }
                });
                res.status(201).json({
                    msg: 'data has been successfully added.!'
                });

            } catch (e) {
                console.log(e.stack);
            }
        });
    },

    doUpdateBio(req, res) {
        const { id_bio } = req.body;
        const tempField = {
            nama_lengkap: req.body.nama_lengkap,
            alamat: req.body.alamat,
            kelas: req.body.kelas
        };
        Biodata.updateBio(id_bio, tempField, (err, result) => {

            try {
                switch (true) {
                    case err:
                        return res.status(500).send('Internal Server Error');
                        break;

                    case result.affectedRows === 0:
                        return res.status(404).json({ error: 'Item not found' });
                        break;

                    default:
                        console.info('no actions');
                        break;
                }

                let log_result = {
                    affected: result.affectedRows,
                    msg: result.message
                };

                dd.ConvJson(log_result);

                res.status(201).json({
                    msg: 'data has been successfully updated.!',
                    updated: tempField
                });

            } catch (e) {
                console.log(e.stack);
            }
        });
    },

    doDeleteBio(req, res) {
        const { id_bio } = req.body;
        Biodata.deleteBio(id_bio, (err, result) => {
            try {
                switch (true) {
                    case err:
                        return res.status(500).send('Internal Server Error');
                        break;

                    case result.affectedRows === 0:
                        return res.status(404).json({ error: 'Item not found' });
                        break;

                    default:
                        console.info('no actions');
                        break;
                }

                let log_result = {
                    affected: result.affectedRows,
                    msg: result.message
                };

                dd.ConvJson(log_result);

                res.status(201).json({
                    msg: 'id' + ' ' + `${id_bio}` + ' ' + 'has been successfully deleted.!'
                });

            } catch (e) {
                console.log(e.stack);
            }
        });
    },

    allGetData(req, res) {
        Biodata.getAllBiodata((err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.status(200).json(result);
        });
    },

    GetBy(req, res) {

        const requiredParams = ['id_bio'];
        requiredParams.forEach((value) => {
            if (!req.body[value]) {
                return res.status(400).json({ error: `field '${value}' is missing` });
            }
        });

        Biodata.getBioById(req.body.id_bio, (err, data) => {

            try {
                if (err) {
                    return res.status(500).send('Internal Server Error');
                }
                if (!data || data.length === 0) {
                    return res.status(404).send('Item not found');
                }

                res.status(200).json(data);

            } catch (e) {
                console.log(e.stack);
            }
        });
    }

};