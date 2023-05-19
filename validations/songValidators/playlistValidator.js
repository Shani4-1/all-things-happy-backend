const Joi = require("joi");
const createValidator = require("../createValidator.js");

const playlistSchema = Joi.object({
    name: Joi.string().required(),
    song_id: Joi.number().required(),
    song_genre_id: Joi.number().required()
});

module.exports = createValidator(playlistSchema);