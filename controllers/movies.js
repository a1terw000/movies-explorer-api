const mongoose = require('mongoose');
const IncorrectRequestError = require('../errors/IncorrectRequestError');
const OwnerError = require('../errors/IncorrectRequestError');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  /* eslint-disable */
  const {
    country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({ country, director, duration, year, description, image, trailerLink, thumbnail, owner: req.user._id, movieId, nameRU, nameEN, })
    /* eslint-enable */
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const ownerId = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail()
    .then((movie) => {
      if (!movie.owner.equals(ownerId)) {
        throw new OwnerError('Выберите свой фильм');
      } else {
        Movie.deleteOne(movie)
          .then(() => {
            res.status(200).send({ message: 'Фильм успешно удален' });
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Фильм не найден'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new IncorrectRequestError('Передан не валидный ID'));
      } else {
        next(err);
      }
    });
};
