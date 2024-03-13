import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const getBookings = async (userId) => {
  const prisma = new PrismaClient();
  const bookings = await prisma.booking.findMany({
    where: {
      userId,
    },
  });

  if (bookings.length === 0) {
    throw new NotFoundError("Bookings", "userId", userId);
  }

  return bookings;
};

export default getBookings;
