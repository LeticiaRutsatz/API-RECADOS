import { Request, Response } from "express";
import { listUsers } from "../../../database";
import { User } from "../../../models/user.model";

export class UserController {
  createUser(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      const newUser = new User({ name, email, password });
      listUsers.push(newUser);
      console.log(listUsers);

      return response.status(200).json({
        message: "Usuario Adicionado",
        data: newUser.handleProperties(),
        success: true,
      });
    } catch (error) {
      return response.status(400).json({
        message: error,
        success: false,
      });
    }
  }

  getUsers(request: Request, response: Response) {
    try {
      return response.status(201).json({
        message: "Lista de Usuários",
        data: listUsers,
        success: true,
      });
    } catch (error) {
      return response.status(400).send({
        message: error,
        success: false,
      });
    }
  }

  getUserById(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const user = listUsers.find((user) => user.id === id) as User;

      return response.status(201).json({
        message: "Usuário Filtrado",
        data: user.handleProperties(),
        success: true,
      });
    } catch (error) {
      return response.status(400).json({
        message: error,
        success: false,
      });
    }
  }
}
