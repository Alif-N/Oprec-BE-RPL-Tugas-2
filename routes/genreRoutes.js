const express = require('express');
const genreRouter = express.Router();
const genreController = require('../controllers/genreControllers');
const { authenticate, authorize } = require('../middleware/middlewares');

genreRouter.post('/add', authenticate, authorize([ 'admin' ]), genreController.addGenre);

module.exports = genreRouter;