import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const getProperties = async (location, pricePerNight, amenitiesName) => {
  const prisma = new PrismaClient();

  let properties = await prisma.property.findMany({
    where: {
      location: location ? { contains: location } : undefined,
      pricePerNight: pricePerNight ? { lte: pricePerNight } : undefined,
    },
    include: {
      amenities: true,
    },
  });

  if (amenitiesName) {
    properties = properties.filter((property) =>
      property.amenities.some((amenity) => amenity.name === amenitiesName)
    );
  }

  if (properties.length === 0) {
    if (amenitiesName) {
      throw new NotFoundError("Properties", "amenities", amenitiesName);
    } else if (location) {
      throw new NotFoundError("Properties", "location", location);
    } else if (pricePerNight) {
      throw new NotFoundError("Properties", "pricePerNight", pricePerNight);
    }
  }

  return properties;
};

export default getProperties;
