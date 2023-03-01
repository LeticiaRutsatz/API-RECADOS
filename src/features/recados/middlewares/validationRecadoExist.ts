import { NextFunction, Request, Response } from "express";
import { listUsers } from "../../../database";

export const validationRecadoExist = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;
  const { idRecado } = request.body;

  const userIndex = listUsers.findIndex((user) => user.id === id);

  if (idRecado) {
    const recadoFiltrado = listUsers[userIndex].recados.some(
      (recado) => recado.id === idRecado
    );

    if (!recadoFiltrado) {
      return response.status(404).send({ message: "Recado não encontrado!" });
    }
  }

  return next();
};
