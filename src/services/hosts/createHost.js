import { PrismaClient } from "@prisma/client";
import ResourceAlreadyExistsError from "../../Errors/ResourceAlreadyExistsError.js";

const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();

  const existingHost = await prisma.host.findUnique({
    where: {
      username,
    },
  });

  if (existingHost) {
    throw new ResourceAlreadyExistsError("Host");
  }

  return prisma.host.create({
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
};

export default createHost;
