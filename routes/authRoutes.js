const express = require('express');
const authRouter = express.Router();
const authControllers = require('../controllers/authControllers');

// Add routes
authRouter.post('/login', authControllers.login);
authRouter.post('/register', authControllers.register);

module.exports = authRouter;