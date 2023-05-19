const Joi = require("joi");
const createValidator = require("../createValidator.js");

const recipe_detailsSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    instructions: Joi.string().required(),
    servings: Joi.number().required,
    calories: Joi.number()
});

module.exports = createValidator(recipe_detailsSchema)