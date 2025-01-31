const express = require('express');
const {
  getUsers,
  createUser,
  getAUser,
  createSuperAdmin,
} = require('../controllers/userController');
const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/create-super-admin').post(createSuperAdmin);

router.route('/:userId').get(getAUser);

// router.route('/:userId').patch().delete();

module.exports = router;
