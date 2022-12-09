const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUserMe, updateUser,
} = require('../controllers/user');

const emailRegexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

router.get('/me', getUserMe);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().pattern(emailRegexp).required().email(),
  }),
}), updateUser);

module.exports = router;
