import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const deleteProperty = async (id) => {
  const prisma = new PrismaClient();

  const deleteResult = await prisma.property.deleteMany({
    where: {
      id: id,
    },
  });

  if (deleteResult.count === 0) {
    throw new NotFoundError("Property", "id", id);
  }

  return id;
};

export default deleteProperty;
