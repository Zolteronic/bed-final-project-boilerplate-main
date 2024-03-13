import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const updateAmenity = async (id, name) => {
  const prisma = new PrismaClient();

  const amenity = await prisma.amenity.findUnique({
    where: {
      id,
    },
  });

  if (!amenity) {
    throw new NotFoundError("Amenity", "id", id);
  }

  const updatedAmenity = await prisma.amenity.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  return updatedAmenity;
};
export default updateAmenity;
