const express = require('express');
const userRoutes = express.Router();
const userCtrl = require('../controllers/userController');

userRoutes.post('/signin', userCtrl.login);
userRoutes.post('/signup', userCtrl.registerUser);
// userRoutes.get('/profile', userCtrl.profile);

module.exports = userRoutes;