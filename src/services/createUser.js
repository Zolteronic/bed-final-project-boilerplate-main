import express from "express";
import { PrismaClient } from "@prisma/client";
import ResourceAlreadyExistsError from "../Errors/ResourceAlreadyExistsError.js";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    throw new ResourceAlreadyExistsError("User");
  }

  return prisma.user.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });
};
export default createUser;
