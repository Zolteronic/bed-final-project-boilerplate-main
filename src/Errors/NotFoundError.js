class NotFoundError extends Error {
  constructor(resourceType, field, value) {
    super(`${resourceType} with ${field} ${value} not found`);
    this.name = "NotFoundError";
  }
}
export default NotFoundError;
