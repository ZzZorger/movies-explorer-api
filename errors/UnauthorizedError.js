class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'unauthorizedError';
    this.errorCode = 401;
  }
}

module.exports = UnauthorizedError;
