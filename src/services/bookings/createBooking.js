import { PrismaClient } from "@prisma/client";

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

  const booking = await prisma.booking.create({
    data: {
      userId,
      propertyId,
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
