const express = require('express');
const routes = express.Router();
const { postLogin, postRegister } = require('../controllers/auth.controller')

routes.post('/register', postRegister)

routes.post('/login', postLogin)

module.exports = routes;