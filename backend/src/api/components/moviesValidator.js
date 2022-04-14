const Joi = require('joi');

const getMovieById = Joi.object({
  id: Joi.number().required(),
});

module.exports = {
  getMovieById,
};

/* await asyncValidator(movieSchema.id, {
  id: req.params.id,
}); */
