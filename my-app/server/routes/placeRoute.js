const express = require('express');
const { check } = require('express-validator');



const router = express.Router();


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

);

router.patch(
  '/:placeId',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],

);

router.delete('/:placeId', placesControllers.deletePlace);

module.exports = router;
