const Joi = require("joi");
const createValidator = require("../createValidator.js");

const ingredientSchema = Joi.object({
    name: Joi.string().required()
});

module.exports = createValidator(ingredientSchema);