const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { regexEmail } = require('../utils/constants');
const AuthorizationError = require('../errors/AuthorizationError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Обязательное поле'],
    unique: true,
    validate: {
      validator(email) {
        return regexEmail.test(email);
      },
      message: 'Введите корректный Email',
    },
  },
  password: {
    type: String,
    required: [true, 'Обязательное поле'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Обязательное поле'],
    minlength: [2, 'Минимальная длина поля - 2 символа'],
    maxlength: [30, 'Максимальная длина поля - 30 символов'],
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthorizationError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
