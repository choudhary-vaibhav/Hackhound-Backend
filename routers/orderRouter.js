const express = require('express');
const orderRouter = express.Router();
const orderCtrl = require('../controllers/orderController');
const verifyToken = require('../middlewares/authMiddleware');

orderRouter.post('/book', verifyToken, orderCtrl.createOrder);
orderRouter.post('/cancel', verifyToken, orderCtrl.cancelOrder);
orderRouter.post('/get/All', verifyToken, orderCtrl.getOrderAll);
orderRouter.post('/get/One', verifyToken, orderCtrl.getOrderOne);


module.exports = orderRouter;