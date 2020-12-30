const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../model/errorModel');
const User = require('../model/userModel');

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, '-password');
  } catch (err) {
    return next(new HttpError('Could not find users'), 500);
  }

  res.status(200).json({
    users: users.map(user => user.toObject({ getters: true }))
  });
};
