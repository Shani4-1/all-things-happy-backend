const Joi = require("joi");
const createValidator = require("../createValidator.js");

const categorySchema = Joi.object({
    name: Joi.string().required()
});

module.exports = createValidator(categorySchema);