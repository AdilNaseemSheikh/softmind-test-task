const express = require('express');
const {
  getUsers,
  createUser,
  getAUser,
  createSuperAdmin,
} = require('../controllers/userController');
const { protect, restrictTo } = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(getUsers)
  .post(protect, restrictTo(['admin', 'super-admin']), createUser);

router
  .route('/create-super-admin')
  .post(protect, restrictTo(['super-admin']), createSuperAdmin);

router.route('/:userId').get(getAUser);

module.exports = router;
