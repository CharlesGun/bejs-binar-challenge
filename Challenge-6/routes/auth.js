const express = require('express');
const router = express.Router();
const controller = require('../controllers');

// auth (regis dan login)
router.post('/register', controller.auth.register);
router.post('/login', controller.auth.login);

module.exports = router;
