const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { createUser, login, logout } = require('./controllers/user');
const auth = require('./middlewares/auth');
const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(5).max(30).required(),
  }),
}), createUser);
app.use(auth);
app.get('/signout', logout);
app.use('/users', userRouter);
app.use('/movies', movieRouter);
app.use('*', (req, res, next) => (
  next(new NotFoundError('Страница не найдена'))
));
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
});
