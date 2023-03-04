const express = require('express');
const cartRouter = express.Router();
const userCtrl = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

cartRouter.post('/get/:user_id', verifyToken, userCtrl.getCart);
cartRouter.post('/addItem/:user_id', verifyToken, userCtrl.addItemToCart);
cartRouter.post('/clear/:user_id', verifyToken, userCtrl.clearCart);
cartRouter.post('/removeItem/:user_id', verifyToken, userCtrl.removeItemToCart);
cartRouter.post('/update/:user_id', verifyToken, userCtrl.updateItemCount);


module.exports = cartRouter;