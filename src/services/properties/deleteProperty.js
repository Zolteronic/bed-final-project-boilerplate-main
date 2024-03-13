import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const deleteProperty = async (id) => {
  const prisma = new PrismaClient();

  const property = await prisma.property.deleteMany({
    where: {
      id: id,
    },
  });

  if (!property) {
    throw new NotFoundError("Property", "id", id);
  }

  return id;
};
export default deleteProperty;
