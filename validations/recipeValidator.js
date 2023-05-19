const Joi = require("joi");
const createValidator = require("./createValidator.js");

const recipeSchema = Joi.object({
    recipe_details_id: Joi.number().required(),
    ingredient_id: Joi.number().required(),
    measure_id: Joi.number().required(),
    amount: Joi.number()
});

module.exports = createValidator(recipeSchema);