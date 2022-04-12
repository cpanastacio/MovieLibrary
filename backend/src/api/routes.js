const router = require("express").Router();

const movies = require("./components/moviesController");

router.get("/movies", movies.getMovies);
router.get("/movies/:id", movies.getMovieById);

module.exports = router;
