import { NextFunction, Request, Response } from "express";

export const validationData = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response
      .status(400)
      .json({ message: "Formato de dados inválidos!", success: false });
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
    return response
      .status(400)
      .json({ message: "Email inválido!", success: false });
  }

  return next();
};
