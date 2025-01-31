const express = require('express');
const router = express.Router();

const { isLoggedIn, login, protect } = require('../controllers/authController');

router.route('/').get(isLoggedIn);

router.route('/login').post(login);

// router.route('/signup').post();

module.exports = router;
