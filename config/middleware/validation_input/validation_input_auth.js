const Joi = require('joi');

module.exports = {
    validateAuthInpRegis: (req, res, next) => {
        const schema = Joi.object({
            username: Joi.string().min(3).max(30).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().min(8).max(15).required()
        });

        const { error } = schema.validate(req.body);

        switch (true) {
            case error:
                return res.status(400).json({ error: error.details[0].message });
                break;
            case error:
                return res.status(400).json({ error: error.details[0].message });
                break;

            default:
                break;
        }
        if (error) {

        }
        next();
    },
    validateAuthInpLogin: (req, res, next) => {
        const schema = Joi.object({
            username: Joi.string().min(3).max(30).required(),
            password: Joi.string().min(8).max(15).required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    }

};
