const Post = require('../models/postModel');

exports.getPosts = async (req, res, next) => {
  const posts = await Post.find({}).populate({
    path: 'author',
    select: 'name email',
  });

  try {
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, thumbnail } = req.body;

    const post = await Post.create({
      title,
      content,
      thumbnail,
      author: req?.user?._id,
    });

    // await User.findByIdAndUpdate(req?.user?._id, {
    //   $push: { posts: post._id },
    // });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);

    if (!post)
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPostsByUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ author: userId });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};
