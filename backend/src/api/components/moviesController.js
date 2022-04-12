const dbMovies = require("../models/movie");
const movieSchema = require("./moviesValidator");
const asyncValidator = require("../helpers/utils");

/**
 * Responsible for getting the movies
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns
 */
async function getMovies(req, res) {
  try {
    const result = await dbMovies.find();
    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
}

async function getMovieById(req, res) {
  try {
    await asyncValidator(movieSchema.getMovieById, {
      id: req.params.id,
    });
    return res.json(true);
  } catch (error) {
    if (error.status !== 200)
      return res.status(error.status).json(error.message);
    return res.json(error);
  }
}

module.exports = { getMovies, getMovieById };
