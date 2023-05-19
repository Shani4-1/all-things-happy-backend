const Joi = require("joi");
const createValidator = require("../createValidator.js");

const event_menuSchema = Joi.object({
    recipe_id: Joi.number().required()
});

module.exports = createValidator(event_menuSchema);