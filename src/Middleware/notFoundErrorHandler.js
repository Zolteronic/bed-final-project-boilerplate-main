import NotFoundError from "../Errors/NotFoundError.js";

const NotFoundErrorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).json({ message: err.message });
  } else {
    next(err);
  }
};

export default NotFoundErrorHandler;
