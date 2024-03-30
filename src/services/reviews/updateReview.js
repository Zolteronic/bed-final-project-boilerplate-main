import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const updateReview = async (id, rating, comment) => {
  const prisma = new PrismaClient();

  const existingReview = await prisma.review.findUnique({ where: { id } });

  if (!existingReview) {
    throw new NotFoundError("Review", "id", id);
  }

  const review = await prisma.review.update({
    where: {
      id,
    },

    data: {
      rating,
      comment,
    },
  });

  return review;
};

export default updateReview;
