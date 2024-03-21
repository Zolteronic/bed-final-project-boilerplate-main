import IdRequiredError from "../Errors/IdRequiredError.js";

const IdRequiredErrorHandler = (err, req, res, next) => {
  if (err instanceof IdRequiredError) {
    res.status(404).json({ message: err.message });
  } else {
    next(err);
  }
};
export default IdRequiredErrorHandler;
