import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const createProperty = async (
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
) => {
  const prisma = new PrismaClient();
  const host = await prisma.host.findUnique({
    where: { id: hostId },
  });

  if (!host) {
    throw new NotFoundError("Host not found");
  }

  const property = await prisma.property.create({
    data: {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      amenities: {
        connect: amenities ? amenities.map((id) => ({ id })) : [],
      },
    },
    include: {
      amenities: true,
    },
  });

  return property;
};

export default createProperty;
