const Joi = require("joi");
const createValidator = require("../createValidator.js");

const song_genreSchema = Joi.object({
    genre_type: Joi.string().required()
});

module.exports = createValidator(song_genreSchema);