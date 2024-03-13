import { PrismaClient } from "@prisma/client";
import NotFoundError from "../Errors/NotFoundError.js";

const findUserById = async (id) => {
  const prisma = new PrismaClient();

  const findById = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!findById) {
    throw new NotFoundError("User", "id", id);
  }
  return findById;
};

export default findUserById;
