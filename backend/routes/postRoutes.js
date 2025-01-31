const express = require('express');
const {
  getPosts,
  createPost,
  getAPost,
  getPostsByUser,
} = require('../controllers/postController');
const { protect, restrictTo } = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(getPosts)
  .post(protect, restrictTo(['user']), createPost);

router.route('/:postId').get(getAPost);

router.route('/user/:userId').get(getPostsByUser);

// router.route('/:postId').patch().delete();

module.exports = router;
