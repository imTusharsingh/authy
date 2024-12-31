require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const {
  createAccessToken,
  createSessionToken,
  authMiddleware,
  cookieHandler,
} = require("../src");

const app = express();
app.use(cookieParser());
app.use(express.json());

// Secrets
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "default-access-secret";
const sessionTokenSecret =
  process.env.SESSION_TOKEN_SECRET || "default-session-secret";

// Login route
app.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const accessToken = createAccessToken({ username }, accessTokenSecret);
  const sessionToken = createSessionToken({ username }, sessionTokenSecret);

  cookieHandler.setToken(res, "at", accessToken, { httpOnly: true });
  cookieHandler.setToken(res, "st", sessionToken, { httpOnly: true });

  res.status(200).send("Login successful");
});

// Protected route
app.get(
  "/protected",
  authMiddleware({
    accessTokenSecret,
    tokenGetter: (req) => cookieHandler.getToken(req, "at"),
  }),
  (req, res) => {
    res.json({ message: "Access granted", user: req.auth });
  }
);

// Logout route
app.post("/logout", (req, res) => {
  cookieHandler.clearToken(res, "at");
  cookieHandler.clearToken(res, "st");
  res.status(200).send("Logged out");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
