import NotFoundErrorHandler from "../Middleware/notFoundErrorHandler.js";
import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHost from "../services/hosts/updateHost.js";
import deleteHost from "../services/hosts/deleteHost.js";
import auth from "../Middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const hosts = await getHosts();
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getHostById(id);
      res.status(200).json(host);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.post(
  "/",
  auth,
  async (req, res, next) => {
    try {
      const {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;
      const host = await createHost(
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
      );
      res.status(201).json(host);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.put(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;
      const host = await updateHost(
        id,
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
      );
      res.status(201).json(host);
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

router.delete(
  "/:id",
  auth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteHost(id);
      res.status(200).json({ message: "Host deleted" });
    } catch (error) {
      next(error);
    }
  },
  NotFoundErrorHandler
);

export default router;
