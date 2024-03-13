import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const getHostById = async (id) => {
  const prisma = new PrismaClient();

  const findById = await prisma.host.findUnique({
    where: {
      id: id,
    },
  });

  if (!findById) {
    throw new NotFoundError("Host", "id", id);
  }

  return findById;
};

export default getHostById;
