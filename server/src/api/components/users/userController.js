const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = require('../../models/users');

const User = mongoose.model('User', userSchema.schema);

/**
 * Responsible for registering a user to the system
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns
 */
async function register(req, res) {
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  try {
    await User.insertMany(user);
    return res.json({ message: `User ${user.username} created!` });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).json({ message: error.writeErrors[0].errmsg });
    }
    return res.status(400).json(error);
  }
}

/**
 * Responsible for user login
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns
 */
async function login(req, res) {
  try {
    const user = await User.find({
      username: req.body.username,
      password: req.body.password,
    });
    const token = jwt.sign(
      { username: req.body.username, password: req.body.password },
      process.env.ACCESS_TOKEN_SECRET,
    );
    const response = {
      // eslint-disable-next-line no-underscore-dangle
      id: user[0]._id,
      username: user[0].username,
      password: user[0].password,
      email: user[0].email,
    };
    return res.json({ ...response, token });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}

async function deleteUser(req, res) {
  try {
    console.log('yes');
    return res.json('provisorio');
  } catch (error) {
    console.log('no');
    return res.status(500).json(error);
  }
}

module.exports = { register, login, deleteUser };
