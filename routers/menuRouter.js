const express = require('express');
const menuRoutes = express.Router();
const menuCtrl = require('../controllers/menuController');

menuRoutes.post('/addCategory', menuCtrl.addCategory)
menuRoutes.post('/', menuCtrl.getCategories);
menuRoutes.post('/:category', menuCtrl.getItems);
menuRoutes.post('/:category/addItems', menuCtrl.addItem);


module.exports = menuRoutes;