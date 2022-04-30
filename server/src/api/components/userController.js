const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = require('../models/users');

const User = mongoose.model('User', userSchema.schema);

/**
 * Responsible for registering a user to the system
 * @param {Object} req - Request object
 * @param {Object} req.body - Request body's session
 * @param {String} req.body.username - User's username
 * @param {String} req.body.email - User's email
 * @param {String} req.body.firstName - User's firstName
 * @param {String} req.body.lastName - User's username lastName
 * @param {String} req.body.description - User's description
 * @param {Array} req.body.watchlist - Title id
 * @param {Object} res - Response object
 * @returns
 */
async function register(req, res) {
  const { username, email, firstName, lastName, description, watchlist } =
    req.body;

  const SALT_ROUNDS = 10;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = {
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      description,
      watchlist,
    };
    await User.insertMany(user);
    return res.json({ message: `User ${user.username} created!` });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).json({ message: error.writeErrors[0].errmsg });
    }
    return res.status(400).json({ message: error.message });
  }
}

/**
 * Responsible for user login
 * @param {String} username - user's username
 * @param {String} password - user's password
 * @returns
 */
async function loginUser(username, password) {
  let passwordDecrypt = false;
  try {
    const user = await User.find({
      username,
    }).lean();

    if (user.length > 0) {
      passwordDecrypt = await bcrypt.compare(password, user[0].password);
    }
    if (user.length === 0 || !passwordDecrypt) {
      return {
        error: {
          status: 403,
          message: 'Wrong credentials!',
        },
      };
    }
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: user[0]._id,
      username: user[0].username,
      email: user[0].email,
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      description: user[0].description,
      watchlist: user[0].watchlist,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

/**
 * Responsible for updating the user's info, including add titles to the user's watchlist
 * @param {Object} req - Request object
 * @param {Object} req.session - Request session object
 * @param {Object} req.session.user - Request session's user object
 * @param {String} req.session.user.id - User's id
 * @param {Object} req.body - Request body's session
 * @param {String} req.body.username - User's username
 * @param {String} req.body.email - User's email
 * @param {String} req.body.firstName - User's firstName
 * @param {String} req.body.lastName - User's username lastName
 * @param {String} req.body.description - User's description
 * @param {String} req.body.title - Title id
 * @param {Object} res - Response object
 * @returns
 */
async function update(req, res) {
  const filter = { _id: req.session.user.id };
  const { username, email, firstName, lastName, description, title } = req.body;

  const updateDoc = {
    $push: { watchlist: title },
    username,
    email,
    firstName,
    lastName,
    description,
  };
  try {
    const verifyIfMovieIsWatchlist = await User.find(
      { watchlist: { $in: title } },
      { _id: 0 },
    );
    if (verifyIfMovieIsWatchlist.length > 0) {
      throw new Error('The title is already on your list');
    }
    const user = await User.updateOne(filter, updateDoc);
    if (user.modifiedCount === 1) {
      return res.json(user.modifiedCount);
    }
    throw new Error('Could not update comment');
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = { register, loginUser, update };
