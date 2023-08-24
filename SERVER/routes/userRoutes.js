const express = require('express');
const userRoute  = express.Router();
const userController = require('../controllers/userController');


userRoute.post('/register',userController.register);

module.exports = userRoute;