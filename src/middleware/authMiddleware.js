const { verifyToken } = require("../tokenUtils");

/**
 * Middleware to validate access token and set `req.auth`.
 * @param {Object} options - Configuration options.
 * @param {string} options.accessTokenSecret - Secret key for access tokens.
 * @param {function} tokenGetter - Function to get the token (e.g., from cookies or headers).
 * @returns {function} Express middleware.
 */
const authMiddleware = ({ accessTokenSecret, tokenGetter }) => {
  return (req, res, next) => {
    const token = tokenGetter(req);

    if (!token) {
      return res.status(401).json({ error: "Access token is missing" });
    }

    const payload = verifyToken(token, accessTokenSecret);

    if (!payload) {
      return res.status(401).json({ error: "Invalid or expired access token" });
    }

    req.auth = payload; // Attach payload to the request
    next();
  };
};

module.exports = authMiddleware;
