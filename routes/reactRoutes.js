const express = require('express');
const reactRouter = express.Router();
const reactionController = require('../controllers/reactControllers');
const { authenticate, authorize } = require('../middleware/middlewares');

reactRouter.post('/like-dislike/:reviewId', authenticate, reactionController.reactToReview);
reactRouter.get('/:reviewId', authenticate, reactionController.getReviewWithReactions);

module.exports = reactRouter;