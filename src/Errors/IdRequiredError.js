class IdRequiredError extends Error {
  constructor() {
    super("id is required");
    this.name = "IdRequiredError";
  }
}
export default IdRequiredError;
