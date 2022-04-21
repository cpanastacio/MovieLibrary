const mongoose = require('mongoose');

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
  try {
    const user = await User.find({
      username,
      password,
    }).lean();
    if (user.length === 0) {
      return {
        error: {
          status: 403,
          message: 'Wrong username or password!',
        },
      };
    }
    const response = {
      // eslint-disable-next-line no-underscore-dangle
      id: user[0]._id,
      username: user[0].username,
      email: user[0].email,
    };
    return response;
  } catch (error) {
    return { error };
  }
}

module.exports = { register, loginUser };
