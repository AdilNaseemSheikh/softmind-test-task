const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A post must have a title'],
      maxLength: [
        35,
        'A post title must have less than or equal to 35 characters',
      ],
      minLength: [3, 'A post title must have at least 3 characters'],
    },
    content: {
      type: String,
      trim: true,
      required: [true, 'A Post must have a content'],
    },
    thumbnail: {
      type: String,
      required: [true, 'A Post must have a thumbnail'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  },
  // schema options
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
