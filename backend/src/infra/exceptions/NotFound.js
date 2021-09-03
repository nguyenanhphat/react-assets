export default class NotFound extends Error {
  constructor(message) {
    super(message);
    this.code = 404;
    this.message = message;
  }
}
