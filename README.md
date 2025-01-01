# @tushar/authy

A lightweight and customizable authentication library for Node.js applications. `@tushar/authy` provides tools for handling authentication tokens, cookies, and middleware, making it easier to integrate authentication into your project.

---

## Features

- Generate and validate **Access Tokens (AT)** and **Session Tokens (ST)**.
- Middleware for validating tokens and attaching user payload to requests.
- Utility functions for cookie and header management.
- Supports **expiration handling** for tokens.
- Easy integration into any Node.js application.

---

## Installation

```bash
npm install @tushar/authy
```

---

## Setup
- Ensure you have the following environment variables configured in a .env file:
```javascript
ACCESS_TOKEN_SECRET=your_access_token_secret
SESSION_TOKEN_SECRET=your_session_token_secret
ACCESS_TOKEN_EXPIRES_IN=15m
SESSION_TOKEN_EXPIRES_IN=7d
```

---

## Example Usage
```javascript
const express = require('express');
const {
    generateAccessToken,
    generateSessionToken,
    setAccessToken,
    setSessionToken,
    clearTokens,
    authMiddleware,
} = require('@tushar/authy');

const app = express();

app.use(express.json());

// Environment Variables
require('dotenv').config();

// Mock user data
const user = { id: '123', username: 'testuser' };

// Login Route: Generate and Set Tokens
app.post('/login', (req, res) => {
    const accessToken = generateAccessToken(user);
    const sessionToken = generateSessionToken(user);

    setAccessToken(res, accessToken);
    setSessionToken(res, sessionToken);

    res.json({ message: 'Login successful!' });
});

// Protected Route: Validate Tokens
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome to the protected route!', user: req.auth });
});

// Logout Route: Clear Tokens
app.post('/logout', (req, res) => {
    clearTokens(res);
    res.json({ message: 'Logged out successfully!' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```
---

## How It Works
### Login:
- The /login route generates an access token and a session token.
- The tokens are set as cookies in the client’s browser.

### Protected Route:
- The /protected route is secured using authMiddleware.
- It validates the access token, and if valid, attaches the token payload to req.auth.

### Logout:
- The /logout route clears both tokens from cookies.

## Utilities
- ```generateAccessToken(user)```

Generates a short-lived access token for a given user object.

__Example:__
```javascript
const token = generateAccessToken(user);
generateSessionToken(user)
```

- ```setAccessToken(res, token)```

Sets the access token as an HTTP-only cookie.

__Example:__
```javascript
setAccessToken(res, accessToken);
```

- ```setSessionToken(res, token)```

Sets the session token as an HTTP-only cookie.

__Example:__
```javascript
setSessionToken(res, sessionToken);
```

- ```clearTokens(res)```

Clears both access and session tokens from the client's cookies.

__Example:__
```javascript
clearTokens(res);
```

- ```authMiddleware(req, res, next)```

Middleware that validates the access token and sets req.auth with the token payload. If the token is invalid, it responds with a 401 error.

__Example:__
```javascript
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected Route', user: req.auth });
});
```
