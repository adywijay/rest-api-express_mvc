const Joi = require('joi');

const schema = Joi.object({
    id_bio: Joi.number().required()
});
const validateInput = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = validateInput;