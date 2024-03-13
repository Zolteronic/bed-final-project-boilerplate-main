import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
      password: password,
    },
  });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.status(200).json({ message: "success", token });
});

export default router;
