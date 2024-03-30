import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const deleteHost = async (id) => {
  const prisma = new PrismaClient();

  const host = await prisma.host.findUnique({
    where: {
      id,
    },
  });

  if (!host) {
    throw new NotFoundError("Host", "id", id);
  }

  await prisma.property.deleteMany({
    where: {
      hostId: id,
    },
  });

  await prisma.host.delete({
    where: {
      id,
    },
  });

  return id;
};

export default deleteHost;
