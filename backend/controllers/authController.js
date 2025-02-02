const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const { signToken } = require('../utils/signToken');

const createAndSendToken = (user, res, req, statusCode) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (req.secure || req.headers['x-forwarded-proto'] === 'https')
    cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({ status: 'success', token, data: { user } });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({ email: email }).select('+password');

    if (
      !user ||
      !(await user.verifyPassword(password, user.password)) ||
      user.role !== role
    ) {
      return next(new AppError('Incorrect email or password', 401));
    }

    createAndSendToken(user, res, req, 200);
  } catch (error) {
    next(error);
  }
};

exports.isLoggedIn = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies?.jwt;
  }

  try {
    if (token) {
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET,
      );

      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return res.status(200).json({ isAuthenticated: false, user: {} });
      }

      return res.status(200).json({ isAuthenticated: true, user: currentUser });
    }
    return res.status(200).json({ isAuthenticated: false, user: {} });
  } catch (err) {
    return res.status(200).json({ isAuthenticated: false, user: {} });
  }
};

exports.restrictTo = (roles = []) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!roles.includes(req.user.role))
      next(
        new AppError('You do not have permission to perform this action.', 403),
      );
    next();
  };
};

exports.protect = async (req, res, next) => {
  try {
    let token;

    // READ TOKEN FROM REQUEST
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.jwt) {
      token = req.cookies?.jwt;
    }

    if (!token)
      return next(
        new AppError('You are not logged in. Please login to get access', 401),
      );

    // VERIFY TOKEN
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // CHECK IF USER STILL EXISTS IN DB
    const user = await User.findById(decoded.id);
    if (!user)
      return next(
        new AppError(
          'The user belonging to this token does no longer exists.',
          401,
        ),
      );

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 0,
    });

    res.status(200).json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};
