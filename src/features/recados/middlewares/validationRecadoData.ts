import { NextFunction, Request, Response } from "express";

export const validationRecadoData = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { description, detail, arquivado } = request.body;

  if (!description && !detail && !arquivado) {
    return response
      .status(400)
      .json({ message: "Formato de dados inválidos!" });
  }

  return next();
};
