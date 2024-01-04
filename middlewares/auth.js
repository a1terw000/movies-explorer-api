const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const AuthorizationError = require('../errors/AuthorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Необходимо авторизоваться');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthorizationError('Необходимо авторизоваться');
  }
  req.user = payload;
  next();
};
