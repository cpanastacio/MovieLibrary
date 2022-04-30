const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

/* Note Session data is not saved in the cookie itself, just the session ID.
Session data is stored server-side. */
const session = require('express-session');

const validator = require('./middleware/validator');
const authenticator = require('./middleware/authenticator');
const movies = require('./components/moviesController');
const user = require('./components/userController');
const posts = require('./components/posts');
const schemas = require('./schemas');

router.use(
  session({
    genid: () => uuidv4(), // use UUIDs for session IDs
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: parseInt(process.env.SESSION_MAX_AGE, 10) },
    resave: false,
    saveUninitialized: true,
  }),
);
let sessionData;

router.get('/movies', movies.getMovies);
router.get('/movies/:id', movies.getMovieById);
router.get('/movie/:name', movies.getMovieIfNotExistsAddsDB);
router.post('/movies/watchlist', authenticator, movies.getMoviesWithArray);

// Endpoint responsible for creating a new user in the system
router.post('/register', validator(schemas.user.register), user.register);

// Endpoint responsible for authenticating a user based on its password and username
router.post(
  '/authenticate',
  validator(schemas.user.login),
  async (req, res) => {
    sessionData = req.session;
    sessionData.user = {};
    const { username, password } = req.body;
    const result = await user.loginUser(username, password);
    if (result.error) {
      return res
        .status(result.error.status)
        .json({ error: result.error.message });
    }
    sessionData.user = result;
    return res.json(result);
  },
);

// Responsible for fetching a user's session
router.get('/get_session', authenticator, (req, res) => {
  sessionData = req.session;
  const userObj = {};
  userObj.user = sessionData.user;
  return res.status(200).json(userObj.user);
});

// Responsible for destroying a session
router.get('/destroysession', authenticator, (req, res) => {
  sessionData = req.session;
  sessionData.destroy((err) => {
    if (err) {
      return res.json({ message: 'Error destroying session' });
    }
    return res.json({ message: 'Session destroyed successfully' });
  });
});

router.patch(
  '/user',
  validator(schemas.user.update),
  authenticator,
  user.update,
);

// Responsible for creating a new post
router.post(
  '/post',
  validator(schemas.post.createPost),
  authenticator,
  posts.createPost,
);

// Responsible for fetching all the posts by title
router.get('/post/:title', posts.getCommentsByTitle);

// Responsible for updating a post
router.patch(
  '/post/:id',
  validator(schemas.post.update),
  authenticator,
  posts.updateCommentById,
);

// Responsible for deleting a post
router.delete('/post/:id', authenticator, posts.deleteCommentById);

module.exports = router;
