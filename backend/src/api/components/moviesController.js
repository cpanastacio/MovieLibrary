const mongoose = require('mongoose');
const axios = require('axios');
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
      title: req.body.title,
      year: req.body.year,
      released: req.body.released,
      genre: req.body.genre,
      plot: req.body.plot,
      poster: req.body.poster,
      rating: req.body.rating,
      type: req.body.type,
      totalSeasons: req.body.totalSeasons,
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
  console.log('Rota errada');
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

async function getMovieIfNotExistsAddsDB(req, res) {
  try {
    const m = await Movie.find({ title: { $regex: req.params.name } });
    if (m.length > 0) {
      return res.json(m);
    }
    const baseUrl = `https://www.omdbapi.com/?t=${req.params.name}&plot=short&apikey=${process.env.API_KEY}`;
    const result = await axios.get(baseUrl);
    const newMovieObj = {
      title: result.data.Title,
      year: result.data.Year,
      released: result.data.Released,
      genre: result.data.Genre,
      plot: result.data.Plot,
      poster: result.data.Poster,
      rating: result.data.imdbRating,
      type: result.data.Type,
      totalSeasons: result.data.totalSeasons,
    };
    await Movie.insertMany(newMovieObj);
    return res.json(newMovieObj);
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
  getMovieIfNotExistsAddsDB,
};
