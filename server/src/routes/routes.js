const routes = require('express').Router();
const authController = require('../controllers/authController');
const addingController = require('../controllers/userAddingController');
const getDataController = require('../controllers/getDataController');

routes.use('/', getDataController);

routes.use('/user', authController);

routes.use('/user/adding/', addingController);

module.exports = routes;