import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../Errors/NotFoundError.js";

const updateHost = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();

  const host = await prisma.host.findUnique({
    where: {
      id,
    },
  });

  if (!host) {
    throw new NotFoundError("Host", "id", id);
  }

  const updatedHost = await prisma.host.update({
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
      aboutMe,
    },
  });

  return updatedHost;
};

export default updateHost;
