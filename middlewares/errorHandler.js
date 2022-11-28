module.exports = (err, req, res, next) => {
  const errorCode = err.errorCode || 500;

  const message = errorCode === 500 ? 'Неизвестная ошибка сервера' : err.message;
  res.status(errorCode).send({ message });
  next();
};
