/**
 * 
 
const validator = require('validator');

const validate = (req, res, next) => {

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'field is required' });
    }

    next();
};
module.exports = validate;

*/


const Joi = require('joi');
const schema = Joi.object({
    nama_lengkap: Joi.string().required(),
    alamat: Joi.string().required(),
    kelas: Joi.string().required()
});
const validateInput = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = validateInput;
