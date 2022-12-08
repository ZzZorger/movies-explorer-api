const router = require('express').Router();
const auth = require('../middlewares/auth');
const signin = require('./signin');
const signup = require('./signup');
const signout = require('./signout');
const userRouter = require('./user');
const movieRouter = require('./movie');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', signin);
router.post('/signup', signup);
router.use(auth);
router.get('/signout', signout);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => (
  next(new NotFoundError('Страница не найдена'))
));

module.exports = router;
