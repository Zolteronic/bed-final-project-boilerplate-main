import express from "express";
import logger from "../utils/Log.js";

const log = (req, res, next) => {
  const start = new Date();

  next();

  const ms = new Date() - start;

  logger.info(
    `${req.method} ${req.originalUrl}. status: ${res.statusCode}. Duration: ${ms}ms`
  );
};

export default log;
