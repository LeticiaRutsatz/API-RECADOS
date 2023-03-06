import { NextFunction, Request, Response } from "express";
import { listUsers } from "../../../database";

export const validationUserExists = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;

  if (!id) {
    return response.status(400).json({ message: "Informe um ID" });
  }

  const usuario = listUsers.some((user) => user.id === id);

  if (!usuario) {
    return response
      .status(404)
      .json({
        message: "Usuário não encontrado, tente novamente!",
        success: false,
      });
  }

  next();
};
