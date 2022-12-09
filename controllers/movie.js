const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
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
    movieId,
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
    movieId,
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
  const { movieId } = req.params;
  const ownerId = req.user._id;
  Movie.findById(movieId)
    .orFail(new NotFoundError(`Фильм с id '${movieId}' не найден`))
    .then((movie) => {
      if (movie) {
        if (movie.owner.toString() === ownerId) {
          movie.delete()
            .then(() => res.status(200).send({ message: `Фильм с id '${movieId}' успешно удален` }))
            .catch(next);
        } else { throw new ForbiddenError('Фильм пренадлежит другому пользователю'); }
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`'${movieId}' не является корректным идентификатором`));
      } else {
        next(err);
      }
    });
};
