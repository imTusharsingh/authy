const headerHandler = {
  getToken: (req, tokenKey) => req.headers[tokenKey],
  setToken: (res, tokenKey, token) => res.setHeader(tokenKey, token),
  clearToken: (res, tokenKey) => res.setHeader(tokenKey, ""),
};

module.exports = headerHandler;
