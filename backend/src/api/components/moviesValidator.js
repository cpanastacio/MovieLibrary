const Joi = require("joi");

const id = Joi.object({
  id: Joi.number().required(),
});

module.exports = { getMovieById };
