import { PrismaClient } from "@prisma/client";
import NotFoundError from "../Errors/NotFoundError.js";

const deleteUser = async (id) => {
  const prisma = new PrismaClient();

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

  const deleteUser = await prisma.user.deleteMany({
    where: {
      id,
    },
  });

  if (!deleteUser) {
    throw new NotFoundError("User", "id", id);
  }
  return id;
};

export default deleteUser;
