const userControllers = require('../controllers/userControllers');
const express = require('express');
const userRouter = express.Router();
const { authenticate, authorize } = require('../middleware/middlewares');

userRouter.get('/:username', userControllers.getUserByUsername);
userRouter.put('/:id', authenticate, authorize(['user', 'admin']), userControllers.updateUser);

module.exports = userRouter;