import { NextFunction, Request, Response } from "express";
import { listUsers } from "../../../database";

export const validationEmailExists = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email } = request.body;

  const emailExist = listUsers.some((user) => user.email === email);

  if (emailExist) {
    return response.status(400).json({ message: "E-mail já cadastrado!" });
  }

  next();
};
