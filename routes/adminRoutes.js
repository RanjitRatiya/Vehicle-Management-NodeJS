const express = require('express');
const { registerAdmin, loginAdmin, currentAdmin } = require('../controllers/adminController');
const validateToken = require('../middleware/validateTokenHandler');
const route = express.Router();

route.post('/register', registerAdmin);
route.post('/login', loginAdmin);
route.get('/current', validateToken, currentAdmin);

module.exports = route