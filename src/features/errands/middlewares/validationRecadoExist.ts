import { NextFunction, Request, Response } from "express";
import { listUsers } from "../../../database";

export const validationRecadoExist = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;
  const { idRecado, name } = request.query;

  if (idRecado && name) {
    const userIndex = listUsers.findIndex((user) => user.id === id);

    const recadoFiltrado = listUsers[userIndex].errands.some(
      (recado) => recado.id === idRecado && recado.name === name
    );

    if (!recadoFiltrado) {
      return response.status(404).send({
        message: "Recado não encontrado!",
        success: false,
      });
    }

    return next();
  }
  return next();
};
