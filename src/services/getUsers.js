import express from "express";
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../Errors/NotFoundError.js";

const getUsers = async (name, email, username, id) => {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany({
    where: {
      id: id,
      name,
      email,
      username,
    },
  });

  if (users.length === 0) {
    if (id) {
      throw new NotFoundError("User", "id", id);
    } else if (name) {
      throw new NotFoundError("User", "name", name);
    } else if (email) {
      throw new NotFoundError("User", "email", email);
    } else if (username) {
      throw new NotFoundError("User", "username", username);
    }
  }

  return users;
};

export default getUsers;
