const cookieHandler = {
  getToken: (req, tokenKey) => req.cookies[tokenKey],
  setToken: (res, tokenKey, token, options) =>
    res.cookie(tokenKey, token, options),
  clearToken: (res, tokenKey) => res.clearCookie(tokenKey),
};

module.exports = cookieHandler;
