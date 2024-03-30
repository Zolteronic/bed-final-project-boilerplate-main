class IdRequiredError extends Error {
  constructor(message) {
    super(message);
    this.name = "IdRequiredError";
  }
}
export default IdRequiredError;
