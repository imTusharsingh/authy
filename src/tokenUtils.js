const jwt = require("jsonwebtoken");

/**
 * Create a JWT access token.
 * @param {Object} payload - Payload for the token.
 * @param {string} secret - Secret key for signing the token.
 * @param {string} expiresIn - Token expiration time (e.g., "15m").
 * @returns {string} Signed JWT.
 */
const createAccessToken = (payload, secret, expiresIn = "15m") => {
  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Create a JWT session token.
 * @param {Object} payload - Payload for the token.
 * @param {string} secret - Secret key for signing the token.
 * @param {string} expiresIn - Token expiration time (e.g., "7d").
 * @returns {string} Signed JWT.
 */
const createSessionToken = (payload, secret, expiresIn = "7d") => {
  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Verify a JWT token.
 * @param {string} token - Token to verify.
 * @param {string} secret - Secret key for verification.
 * @returns {Object|null} Decoded payload if valid; otherwise, null.
 */
const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

module.exports = { createAccessToken, createSessionToken, verifyToken };
