const express = require('express');
const userRoutes = express.Router();
const userCtrl = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

userRoutes.post('/signin', userCtrl.login);
userRoutes.post('/signup', userCtrl.registerUser);
userRoutes.post('/profile', verifyToken, userCtrl.getProfile);

module.exports = userRoutes;