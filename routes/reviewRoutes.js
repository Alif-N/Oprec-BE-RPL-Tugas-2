const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../controllers/reviewControllers');
const { authenticate } = require('../middleware/middlewares');

reviewRouter.post('/', authenticate, reviewController.createReview);
reviewRouter.get('/', authenticate, reviewController.getReviews);
reviewRouter.put('/:id', authenticate, reviewController.updateReview);
reviewRouter.delete('/:id', authenticate, reviewController.deleteReview);

module.exports = reviewRouter;