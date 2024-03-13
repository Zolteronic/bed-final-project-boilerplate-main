import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const deleteBooking = async (id) => {
  const prisma = new PrismaClient();

  const deleteBooking = await prisma.booking.deleteMany({
    where: {
      id,
    },
  });

  if (deleteBooking.count === 0) {
    throw new NotFoundError("Booking", "id", id);
  }

  return id;
};
export default deleteBooking;
