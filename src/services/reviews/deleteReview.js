import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const deleteReview = async (id) => {
  const prisma = new PrismaClient();

  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  if (!review) {
    throw new NotFoundError("Review", "id", id);
  }

  await prisma.review.delete({
    where: {
      id,
    },
  });

  return id;
};

export default deleteReview;
