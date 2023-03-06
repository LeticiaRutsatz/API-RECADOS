import { NextFunction, Request, Response } from "express";

export const validationRecadoData = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let { name, detail, filed } = request.body;

  if (!name && !detail && !filed) {
    return response
      .status(400)
      .json({ message: "Formato de dados inválidos!", success: false });
  }

  return next();
};
