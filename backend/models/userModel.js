const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User must have a name'],
    },

    email: {
      type: String,
      required: [true, 'User must have an email'],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },

    password: {
      type: String,
      select: false,
    },

    role: {
      type: String,
      enum: ['user', 'admin', 'super-admin'],
      default: 'user',
    },

    active: {
      type: Boolean,
      default: true,
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
        default: [],
      },
    ],
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);

  if (!this.isNew && this.isModified('password')) {
    this.passwordChangedAt = Date.now() - 1000;
  }

  next();
});

userSchema.methods.verifyPassword = async (enteredPassword, actualPassword) => {
  return await bcrypt.compare(enteredPassword, actualPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
