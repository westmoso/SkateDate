const express = require('express');
const { check } = require('express-validator');

const placeController = require('../controllers/placeController');
const fileUpload = require('../middleware/upload');
const checkAuth = require('../middleware/auth');

const router = express.Router();

router.get('/:placeId', placeController.getPlaceById);

router.get('/user/:userId', placeController.getPlacesByUserId);

router.use(checkAuth);

router.post(
  '/',
  fileUpload.single('image'),
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address')
      .not()
      .isEmpty()
  ],
  placeController.createPlace
);

router.patch(
  '/:placeId',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  placeController.updatePlace
);

router.delete('/:placeId', placeController.deletePlace);

module.exports = router;
