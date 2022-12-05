const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => next(err));
};
module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId: req.user._id,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};
module.exports.deleteMovie = (req, res, next) => {
  // console.log(req.params.id)
  // console.log(req.user)
  const ownerId = req.user._id;
  Movie.findById(req.params.id)
    .orFail(new NotFoundError(`Карточка с id '${req.params.id}' не найдена`))
    .then((movie) => {
      if (movie) {
        if (movie.owner.toString() === ownerId) {
          movie.delete()
            .then(() => res.status(200).send({ message: `Фильм с id '${req.params.id}' успешно удален` }))
            .catch(next);
        } else { throw new ForbiddenError('Фильм пренадлежит другому пользователю'); }
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`'${req.params.id}' не является корректным идентификатором`));
      } else {
        next(err);
      }
    });
};
