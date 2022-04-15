const router = require('express').Router();

const movies = require('./components/moviesController');

router.get('/movies', movies.getMovies);
router.get('/movies/:id', movies.getMovieById);
router.get('/movie/:name', movies.getMovieIfNotExistsAddsDB);
module.exports = router;
