import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const createBooking = async (
  userId,
  propertyId,
  numberOfGuests,
  totalPrice,
  bookingStatus,
  checkinDate,
  checkoutDate
) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new NotFoundError("User", "id", userId);
  }

  if (!propertyId) {
    throw new NotFoundError("Property", "id", propertyId);
  }

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new NotFoundError("Property", "id", propertyId);
  }

  const booking = await prisma.booking.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      property: {
        connect: {
          id: propertyId,
        },
      },
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });

  return booking;
};

export default createBooking;
