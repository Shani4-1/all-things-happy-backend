const Joi = require("joi");
const createValidator = require("./createValidator.js");

const eventSchema = Joi.object({
    name: Joi.string().required(),
    playlist_id: Joi.number().required(),
    event_menu_id: Joi.number().required(),
    quote_list_id: Joi.number().required(),
    event_type: Joi.string().required
});



module.exports = createValidator(eventSchema)
