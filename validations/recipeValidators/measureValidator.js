const Joi = require("joi");
const createValidator = require("../createValidator.js");

const measureSchema = Joi.object({
    name: Joi.string().required()
});

module.exports = createValidator(measureSchema);