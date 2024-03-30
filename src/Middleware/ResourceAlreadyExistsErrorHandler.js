import ResourceAlreadyExistsError from "../Errors/ResourceAlreadyExistsError.js";

const ResourceAlreadyExistsErrorHandler = (err, req, res, next) => {
  if (err instanceof ResourceAlreadyExistsError) {
    res.status(400).json({ message: err.message });
  } else {
    next(err);
  }
};
export default ResourceAlreadyExistsErrorHandler;
