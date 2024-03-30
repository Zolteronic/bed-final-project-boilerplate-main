import NotFoundErrorHandler from "../Middleware/notFoundErrorHandler.js";
import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import updateReview from "../services/reviews/updateReview.js";
import deleteReview from "../services/reviews/deleteReview.js";
import auth from "../Middleware/auth.js";
import IdRequiredError from "../Errors/IdRequiredError.js";
import IdRequiredErrorHandler from "../Middleware/IdRequiredErrorHandler.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const reviews = await getReviews();
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.post(
  "/",
  auth,
  async (req, res, next) => {
    try {
      const { userId, propertyId, rating, comment } = req.body;

      if (!userId) {
        throw new IdRequiredError("userId");
      }

      const review = await createReview(userId, propertyId, rating, comment);
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler,
  IdRequiredErrorHandler
);

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = await getReviewById(id);
      res.status(200).json(review);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.put(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rating, comment } = req.body;

      const review = await updateReview(id, rating, comment);

      res.status(200).json(review);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler,
  IdRequiredErrorHandler
);
router.delete(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = await deleteReview(id);
      res.status(200).json({ message: "Review deleted", review });
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

export default router;
