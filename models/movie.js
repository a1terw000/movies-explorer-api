const mongoose = require('mongoose');
const { regexUrl } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  director: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  duration: {
    type: Number,
    required: [true, 'Обязательное поле'],
  },
  year: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  description: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  image: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator(url) {
        return regexUrl.test(url);
      },
      message: 'Необходимо передать URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator(url) {
        return regexUrl.test(url);
      },
      message: 'Необходимо передать URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator(url) {
        return regexUrl.test(url);
      },
      message: 'Необходимо передать URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Обязательное поле'],
  },
  movieId: {
    type: Number,
    required: [true, 'Обязательное поле'],
  },
  nameRU: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  nameEN: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
