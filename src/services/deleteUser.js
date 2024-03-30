import { PrismaClient } from "@prisma/client";
import NotFoundError from "../Errors/NotFoundError.js";

const deleteUser = async (id) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new NotFoundError("User", "id", id);
  }

  await prisma.review.deleteMany({
    where: {
      userId: id,
    },
  });

  await prisma.booking.deleteMany({
    where: {
      userId: id,
    },
  });

  await prisma.user.delete({
    where: {
      id,
    },
  });

  return id;
};

export default deleteUser;
