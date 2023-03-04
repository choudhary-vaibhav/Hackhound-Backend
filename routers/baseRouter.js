const express = require('express');
const cartRouter = require('./cartRouter');
const menuRoutes = require('./menuRouter');

//File Modules

const userRouter = require('./userRouter');

//Router
const router = express.Router();

//Modules Routing
router.use('/user', userRouter);
router.use('/menu', menuRoutes);
router.use('/cart', cartRouter);


module.exports = router;