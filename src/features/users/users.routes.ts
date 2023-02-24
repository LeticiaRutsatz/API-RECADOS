import express, { Router } from "express";
import { UserController } from "./controllers/users.controller";
import { validationEmailExists } from "./middlewares/validationEmailExiste";
import { validationData } from "./middlewares/validationUserdata";
import { validationUserExists } from "./middlewares/validationUserExist";

const userRoutes = (router: Router) => {
  const userController = new UserController();

  // POST
  router.post(
    "/users",
    validationData,
    validationEmailExists,
    userController.createUser
  );

  // GET All
  router.get("/users", userController.getUsers);

  // GET - ID
  router.get("/users/:id", validationUserExists, userController.getUserById);
};

export { userRoutes };
