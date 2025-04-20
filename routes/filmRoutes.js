const express = require('express');
const filmRouter = express.Router();
const filmController = require('../controllers/filmControllers');
const { authenticate, authorize } = require('../middleware/middlewares');

// endpoint untuk film
filmRouter.get('/', filmController.getAllFilms);
filmRouter.get('/:judul', filmController.getFilmByJudul);
filmRouter.post('/', authenticate, authorize([ 'admin' ]), filmController.createFilm);
filmRouter.put('/:id', authenticate, authorize([ 'admin' ]), filmController.updateFilm);
filmRouter.delete('/:id', authenticate, authorize([ 'admin' ]), filmController.deleteFilm);

module.exports = filmRouter;