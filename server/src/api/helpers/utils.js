const bcrypt = require('bcrypt');

/**
 * Responsible for hashing a password
 * @param {string} password - Password to be hashed
 * @returns {string} - Returns the hashed password
 */
async function hashPassword(password) {
  const SALT_ROUNDS = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
}

/**
 * Responsible for comparing the password with the hashed one to check if it's a match
 * @param {string} password - Password to be compared
 * @param {string} hashed - Hashed to be compared with the password
 * @returns {boolean} - returns true if it's a match, false otherwise.
 */
async function comparePassword(password, hashed) {
  return bcrypt.compare(password, hashed);
}

module.exports = {
  hashPassword,
  comparePassword,
};
