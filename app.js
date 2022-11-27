const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { login, createUser, logout } = require('./controllers/user');
const auth = require('./middlewares/auth');
const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(5).required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(5).max(30).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.use(auth);
app.get('/signout', logout);
app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.listen(PORT, () => {
});
