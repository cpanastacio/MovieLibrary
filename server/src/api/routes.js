const router = require('express').Router();

const authenticate = require('./middleware/authenticator');
const validator = require('./middleware/validator');

const movies = require('./components/movies/moviesController');
const user = require('./components/users/userController');
const schemas = require('./schemas');

router.get('/movies', movies.getMovies);
router.get('/movies/:id', movies.getMovieById);
router.get('/movie/:name', movies.getMovieIfNotExistsAddsDB);

router.post('/register', validator(schemas.user.register), user.register);
router.post('/login', user.login);
router.delete('/:id', authenticate, user.deleteUser);

module.exports = router;
