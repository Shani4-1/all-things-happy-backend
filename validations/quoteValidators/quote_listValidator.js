const Joi = require("joi");
const createValidator = require("../createValidator");

const quote_listSchema = Joi.object({
    quote_id: Joi.number().required(),
    category_id: Joi.number().required()
});

module.exports = createValidator(quote_listSchema);