import express, { Application, Request, Response } from "express";
import { errandsRoutes } from "../features/errands/errands.routes";
import { userRoutes } from "../features/users/users.routes";

const routesApp = (app: Application) => {
  const router = express.Router();

  app.use("/", router);
  router.get("/", (request: Request, response: Response) =>
    response.send("teste")
  );

  userRoutes(router);
  errandsRoutes(router);
};

export { routesApp };
