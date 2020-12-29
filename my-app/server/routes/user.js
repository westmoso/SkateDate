const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', usersController.getUsers);
router.post(
  '/signup',
  fileUpload.single('image'),
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 8 })
  ],
);
router.post('/login', usersController.logIn);

module.exports = router;
