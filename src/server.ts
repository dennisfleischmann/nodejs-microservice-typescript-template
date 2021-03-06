import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import securityHandlers from "./middleware/securityHandlers";
import jwt from "jsonwebtoken";

import routes from "./services";

/**
 * Error handling
 */

process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
  });

process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
  });


const router = express();

applyMiddleware(securityHandlers, router);
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);
