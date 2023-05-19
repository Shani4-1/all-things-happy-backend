const Joi = require("joi");
const createValidator = require("./createValidator.js");

const songSchema = Joi.object({
    genre_id: Joi.number().required(),
    title: Joi.string().required(),
    song_url: Joi.string().required(),
    artist: Joi.string().required(),
    length: Joi.string().required()
});

module.exports = createValidator(songSchema);