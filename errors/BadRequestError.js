class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'badRequestError';
    this.errorCode = 400;
  }
}

module.exports = BadRequestError;
