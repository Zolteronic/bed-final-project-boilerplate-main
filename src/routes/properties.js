import NotFoundErrorHandler from "../Middleware/notFoundErrorHandler.js";
import { Router } from "express";
import deleteProperty from "../services/properties/deleteProperty.js";
import updateProperties from "../services/properties/updateProperties.js";
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import auth from "../Middleware/auth.js";
import IdRequiredError from "../Errors/IdRequiredError.js";
import IdRequiredErrorHandler from "../Middleware/IdRequiredErrorHandler.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const { location, amenities } = req.query;
      const pricePerNight = Number(req.query.pricePerNight);
      const properties = await getProperties(
        location,
        pricePerNight,
        amenities
      );
      res.status(200).json(properties);
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
      const property = await getPropertyById(id);
      res.status(200).json(property);
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
      const id = req.params.id;
      const data = req.body;
      const property = await updateProperties(id, data);
      res.status(201).json(property);
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
      const {
        hostId,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        rating,
        amenities,
      } = req.body;

      if (!hostId) {
        throw new IdRequiredError("hostId");
      }

      const property = await createProperty(
        hostId,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        rating,
        amenities
      );
      res.status(201).json(property);
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
      const property = await deleteProperty(id);
      res.status(200).json(property);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

export default router;
