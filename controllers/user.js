const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/user');

const { JWT_SECRET = 'secret_default' } = process.env;
module.exports.createUser = (req, res, next) => {
  const {
    email, name,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then(() => res.send({
      email,
      name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с данной почтой уже зарегестрирован'));
      } else {
        next(err);
      }
    });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.status(200).cookie('token', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send({ token });
    })
    .catch(next);
};
module.exports.logout = (req, res, next) => {
  res.clearCookie('token').send({ message: 'Выход' })
    .catch(next);
};
