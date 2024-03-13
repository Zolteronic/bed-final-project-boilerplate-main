import { Router } from "express";
import NotFoundErrorHandler from "../Middleware/notFoundErrorHandler.js";
import updateBooking from "../services/bookings/updateBooking.js";
import createBooking from "../services/bookings/createBooking.js";
import deleteBooking from "../services/bookings/deleteBooking.js";
import getBookingById from "../services/bookings/getBookingById.js";
import auth from "../Middleware/auth.js";
import getBookings from "../services/bookings/getBookings.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const { userId } = req.query;
      const bookings = await getBookings(userId);
      res.status(200).json(bookings);
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
        userId,
        propertyId,
        numberOfGuests,
        totalPrice,
        bookingStatus,
        checkinDate,
        checkoutDate,
      } = req.body;

      const booking = await createBooking(
        userId,
        propertyId,
        numberOfGuests,
        totalPrice,
        bookingStatus,
        checkinDate,
        checkoutDate
      );
      res.status(201).json(booking);
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
      const booking = await updateBooking(id, req.body);
      res.status(201).json(booking);
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
      const booking = await getBookingById(id);
      res.status(200).json(booking);
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
      const booking = await deleteBooking(id);
      res.status(200).json({ message: "Booking deleted", booking });
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

export default router;
