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
      username: username,
    },
  });

  if (existingUser) {
    throw new ResourceAlreadyExistsError("User");
  }

  const user = await prisma.user.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });

  return user;
};
export default createUser;
