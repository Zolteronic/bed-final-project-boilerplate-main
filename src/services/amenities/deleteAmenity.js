import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const deleteAmenity = async (id) => {
  const prisma = new PrismaClient();

  const amenity = await prisma.amenity.findUnique({
    where: {
      id,
    },
  });

  if (!amenity) {
    throw new NotFoundError("Amenity", "id", id);
  }

  await prisma.amenity.delete({
    where: {
      id,
    },
  });

  return id;
};

export default deleteAmenity;
