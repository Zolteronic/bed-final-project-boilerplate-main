import express from "express";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../Errors/NotFoundError.js";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();

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
