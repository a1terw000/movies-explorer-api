const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexEmail } = require('../utils/constants');
const { getPresentUser, editUserData } = require('../controllers/users');

router.get('/me', getPresentUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().pattern(regexEmail).required(),
  }),
}), editUserData);

module.exports = router;
