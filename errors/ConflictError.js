class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'conflictError';
    this.errorCode = 409;
  }
}

module.exports = ConflictError;
