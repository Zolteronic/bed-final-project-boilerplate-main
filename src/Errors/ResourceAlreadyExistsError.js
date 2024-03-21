class ResourceAlreadyExistsError extends Error {
  constructor(resourceType) {
    super(`${resourceType} already exists`);
    this.name = "ResourceAlreadyExistsError";
  }
}
export default ResourceAlreadyExistsError;
