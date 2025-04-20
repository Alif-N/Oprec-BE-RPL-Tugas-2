const listController = require('../controllers/listControllers');
const express = require('express');
const { authenticate, authorize } = require('../middleware/middlewares');
const listRouter = express.Router();

listRouter.post('/', authenticate, authorize([ 'user' ]), listController.addList);
listRouter.put('/:id', authenticate, authorize([ 'user' ]), listController.updateListStatus);
listRouter.get('/user/:userId', listController.getUserLists);

module.exports = listRouter;