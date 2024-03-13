import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const getReviewById = async (id) => {
  const prisma = new PrismaClient();

  const findById = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  if (!findById) {
    throw new NotFoundError("Review", "id", id);
  }

  return findById;
};
export default getReviewById;
