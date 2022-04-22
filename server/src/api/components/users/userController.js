const mongoose = require('mongoose');

const userSchema = require('../../models/users');
const { hashPassword, comparePassword } = require('../../helpers/utils');

const User = mongoose.model('User', userSchema.schema);

/**
 * Responsible for registering a user to the system
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns
 */
async function register(req, res) {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = {
      username,
      password: hashedPassword,
      email,
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
      passwordDecrypt = await comparePassword(password, user[0].password);
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
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

module.exports = { register, loginUser };
