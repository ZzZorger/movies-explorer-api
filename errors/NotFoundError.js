class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'notFoundError';
    this.errorCode = 404;
  }
}

module.exports = NotFoundError;
