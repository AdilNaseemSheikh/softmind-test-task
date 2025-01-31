const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.createSuperAdmin = async (req, res, next) => {
  try {
    const { name, email, password, role, securityKey } = req.body;

    if (role !== 'super-admin')
      return next(
        new AppError(
          'please use /api/v1/users/ route for creating a non super-admin user',
          400,
        ),
      );

    if (securityKey !== process.env.SECURITY_KEY)
      return next(
        new AppError('You are unauthorized to create a super-admin', 403),
      );

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (role === 'super-admin')
      new AppError(
        'please use /create-super-admin/ route for creating a super-admin user',
        400,
      );

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
