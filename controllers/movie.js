const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => next(err));
};
module.exports.postMovie = (req, res, next) => {
  console.log(req.params);
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
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send({ data: movie }))
    .catch((err) => {
      console.log(err)
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};
