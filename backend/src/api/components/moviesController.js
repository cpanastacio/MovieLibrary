const mongoose = require('mongoose');
const movieSchema = require('../models/movie');

const Movie = mongoose.model('Movie', movieSchema.schema);
// const asyncValidator = require('../helpers/utils');

/**
 * Responsible for getting the movies
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns
 */
async function getMovies(req, res) {
  try {
    const result = await Movie.find();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}

async function insertMovie(req, res) {
  try {
    const m = {
      title: 'Game of Thrones',
      year: '2011–2019',
      released: '17 Apr 2011',
      genre: 'Action, Adventure, Drama',
      plot: 'In the mythical continent of Westeros, several powerful families fight for control of the Seven Kingdoms. As conflict erupts in the kingdoms of men, an ancient enemy rises once again to threaten them all. Meanwhile, the last heirs of a recently usurped dynasty plot to take back their homeland from across the Narrow Sea.',
      poster: 'https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg',
      rating: '9.3 / 10 ',
      type: 'series',
      totalSeasons: '8',
    };
    const newMovie = await Movie.insertMany(m);
    return res.json({
      message: 'Movie added',
      movie: newMovie,
    });
  } catch (error) {
    return res.json(error);
  }
}

/**
 * Responsible for fetching a movie by its id
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns
 */
async function getMovieById(req, res) {
  try {
    const m = await Movie.findById(req.params.id);
    return res.status(200).json({
      m,
    });
  } catch (error) {
    if (error && error.status && error.status !== 200) {
      return res.status(error.status).json(error.message);
    }
    return res.json(error);
  }
}

module.exports = {
  getMovies,
  getMovieById,
  insertMovie,
};
