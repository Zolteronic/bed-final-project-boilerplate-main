import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const updateReview = async (id, userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();

  const idExists = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  if (!idExists) {
    throw new NotFoundError("Review", "id", id);
  }

  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userExists) {
    throw new NotFoundError("User", "id", userId);
  }

  const propertyExists = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!propertyExists) {
    throw new NotFoundError("Property", "id", propertyId);
  }

  const review = await prisma.review.update({
    where: {
      id,
    },
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });

  return review;
};

export default updateReview;
