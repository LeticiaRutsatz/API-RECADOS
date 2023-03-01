import { Request, Response } from "express";
import { listUsers } from "../../../database";
import { Recado } from "../../../models/recado.model";

export class RecadosController {
  createRecado(request: Request, response: Response) {
    try {
      const { description, detail } = request.body;
      const { id } = request.params;

      const userIndex = listUsers.findIndex((user) => user.id === id);

      const newRecado = new Recado({ description, detail });
      listUsers[userIndex].recados.push(newRecado);

      return response.status(200).json({
        message: "Recado adicionado com sucesso",
        data: newRecado.handleProperties(),
        success: true,
      });
    } catch (error) {
      return response.status(400).json({
        message: error,
        success: false,
      });
    }
  }

  getRecadoByUser(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const userIndex = listUsers.findIndex((user) => user.id === id);

      return response.status(200).json({
        message: `Lista de recados de ${listUsers[userIndex].name}`,
        data: listUsers[userIndex].recados.map((recado) =>
          recado.handleProperties()
        ),
        success: true,
      });
    } catch (error) {
      return response.status(400).json({
        message: error,
        success: false,
      });
    }
  }

  getRecadoByUserAndById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { description, idRecado } = request.body;

      const userIndex = listUsers.findIndex((user) => user.id === id);

      const recadoFiltrado = listUsers[userIndex].recados.filter((recado) => {
        if (description || idRecado) {
          return (
            recado.description.includes(description) || recado.id == idRecado
          );
        }

        if (idRecado && description) {
          return (
            recado.id == idRecado && recado.description.includes(description)
          );
        }

        return false;
      });

      if (recadoFiltrado.length === 0) {
        return response.status(404).json({
          message: "Recado não encontrado!",
          data: listUsers[userIndex].recados.map((recado) =>
            recado.handleProperties()
          ),
          success: false,
        });
      }

      return response.status(201).json({
        message: "Recado Filtrado",
        data: recadoFiltrado.map((recado) => recado.handleProperties()),
        success: true,
      });
    } catch (error) {
      return response.status(400).json({
        message: error,
        success: false,
      });
    }
  }

  updateRecado(request: Request, response: Response) {
    try {
      const { id, idRecado } = request.params;
      const { description, detail } = request.body;
      let { arquivado } = request.body;

      if (arquivado) {
        if (arquivado == "true" || arquivado == "True") {
          arquivado = true;
        }

        if (arquivado == "false" || arquivado == "False") {
          arquivado = false;
        }
      }

      const userIndex = listUsers.findIndex((user) => user.id === id);
      const recadoIndex = listUsers[userIndex].recados.findIndex(
        (recado) => recado.id === idRecado
      );

      const recadoATT = listUsers[userIndex].recados.forEach((recado) => {
        recado.description = description ?? recado.description;
        recado.detail = detail ?? recado.detail;
        recado.arquivado = arquivado ?? recado.arquivado;
      });

      return response.status(200).send({
        message: `Recado atualizado`,
        data: listUsers[userIndex].recados[recadoIndex].handleProperties(),
        success: true,
      });
    } catch (error) {
      return response.status(400).send({
        message: error,
        success: false,
      });
    }
  }

  deleteRecado(request: Request, response: Response) {
    try {
      const { id, idRecado } = request.params;

      const userIndex = listUsers.findIndex((user) => user.id === id);
      const recadoIndex = listUsers[userIndex].recados.findIndex(
        (recado) => recado.id === idRecado
      );

      listUsers[recadoIndex].recados.splice(recadoIndex, 1);

      return response.status(200).send({
        message: `Recado deletado`,
        data: listUsers[userIndex].recados.map((recado) =>
          recado.handleProperties()
        ),
        success: true,
      });
    } catch (error) {
      return response.status(400).send({
        message: error,
        success: false,
      });
    }
  }
}
