import { Router } from "express";
import NotFoundErrorHandler from "../Middleware/notFoundErrorHandler.js";
import auth from "../Middleware/auth.js";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenity from "../services/amenities/updateAmenity.js";
import deleteAmenity from "../services/amenities/deleteAmenity.js";
import IdRequiredError from "../Errors/IdRequiredError.js";
import IdRequiredErrorHandler from "../Middleware/IdRequiredErrorHandler.js";
const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const amenities = await getAmenities();
      res.status(200).json(amenities);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const amenity = await getAmenityById(id);
      res.status(200).json(amenity);
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
      const { name } = req.body;

      if (!name) {
        throw new IdRequiredError("name");
      }

      const amenity = await createAmenity(name);
      res.status(201).json(amenity);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler,
  IdRequiredErrorHandler
);
router.put(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const amenity = await updateAmenity(id, name);
      res.status(201).json(amenity);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.delete(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteAmenity(id);
      res.status(200).json({ message: "Amenity deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

export default router;
