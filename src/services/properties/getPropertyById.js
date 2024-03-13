import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const getPropertyById = async (id) => {
  const prisma = new PrismaClient();

  const findById = await prisma.property.findUnique({
    where: {
      id: id,
    },
    include: {
      amenities: true,
    },
  });

  if (!findById) {
    throw new NotFoundError("Property", "id", id);
  }

  return findById;
};
export default getPropertyById;
