const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getMovies, postMovie,
} = require('../controllers/movie');

const linkRegexp = /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*,]|(?:%[0-9a-fA-F][0-9a-fA-F]))+\./;

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkRegexp),
    trailerLink: Joi.string().required().pattern(linkRegexp),
    thumbnail: Joi.string().required().pattern(linkRegexp),
    // owner: Joi.string().length(24).hex().required(),
    // movieId: Joi.string().length(24).hex().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), postMovie);
// router.delete('/:id', celebrate({
//   body: Joi.object().keys({
//     id: Joi.string().length(24).hex().required(),
//   }),
// }), deleteMovie);

module.exports = router;
