class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'forbiddenError';
    this.errorCode = 403;
  }
}

module.exports = ForbiddenError;
