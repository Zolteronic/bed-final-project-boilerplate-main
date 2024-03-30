import { PrismaClient } from "@prisma/client";
import NotFoundError from "../Errors/NotFoundError.js";

const editUser = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new NotFoundError("User", "id", id);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });

  return updatedUser;
};

export default editUser;
