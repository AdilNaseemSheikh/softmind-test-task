const express = require('express');
const router = express.Router();

const { isLoggedIn, login, protect, logout } = require('../controllers/authController');

router.route('/').get(isLoggedIn);

router.route('/login').post(login);

router.route('/logout').post(logout);

// router.route('/signup').post();

module.exports = router;
