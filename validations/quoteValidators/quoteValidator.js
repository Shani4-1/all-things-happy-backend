const Joi = require("joi");
const createValidator = require("../createValidator.js");

const quoteSchema = Joi.object({
    category_id: Joi.number().required(),
    quotee: Joi.string().required(),
    quote: Joi.string().required()
});

module.exports = createValidator(quoteSchema);