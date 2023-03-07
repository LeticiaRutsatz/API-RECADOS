import { Request, Response } from "express";
import { listUsers } from "../../../database";
import { Errand } from "../../../models/errand.model";

export class ErrandsController {
  createErrand(request: Request, response: Response) {
    try {
      const { name, detail } = request.body;
      const { id } = request.params;

      const userIndex = listUsers.findIndex((user) => user.id === id);

      const newErrand = new Errand({ name, detail });
      listUsers[userIndex].errands.push(newErrand);

      return response.status(200).json({
        message: "Recado adicionado com sucesso!",
        data: newErrand.handleProperties(),
        success: true,
      });
    } catch (error) {
      return response.status(400).json({
        message: error,
        success: false,
      });
    }
  }

  geterrandByUser(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, idRecado } = request.query;

      const userIndex = listUsers.findIndex((user) => user.id === id);

      if (name && idRecado) {
        const filterErrand = listUsers[userIndex].errands.filter((recado) => {
          return recado.id == idRecado && recado.name === name;
        });

        return response.status(201).json({
          message: "Recado Filtrado com sucesso!",
          data: filterErrand.map((recado) => recado.handleProperties()),
          success: true,
        });
      }

      return response.status(200).json({
        message: `Lista de recados de ${listUsers[userIndex].name}`,
        data: listUsers[userIndex].errands.map((recado) =>
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

  // getErrandByUserAndById(request: Request, response: Response) {
  //   try {
  //     const { id } = request.params;
  //     const { name, idRecado } = request.query;

  //     const userIndex = listUsers.findIndex((user) => user.id === id);

  //     const filterErrand = listUsers[userIndex].errands.filter((recado) => {
  //       return recado.id == idRecado && recado.name === name;
  //     });

  //     return response.status(201).json({
  //       message: "Recado Filtrado com sucesso!",
  //       data: filterErrand.map((recado) => recado.handleProperties()),
  //       success: true,
  //     });
  //   } catch (error) {
  //     return response.status(400).json({
  //       message: error,
  //       success: false,
  //     });
  //   }
  // }

  updateRecado(request: Request, response: Response) {
    try {
      const { id, idRecado } = request.params;
      const { name, detail } = request.body;
      let { filed } = request.body;

      if (filed) {
        if (filed == "true" || filed == "True") {
          filed = true;
        }

        if (filed == "false" || filed == "False") {
          filed = false;
        }
      }

      const userIndex = listUsers.findIndex((user) => user.id === id);
      const recadoIndex = listUsers[userIndex].errands.findIndex(
        (recado) => recado.id === idRecado
      );

      listUsers[userIndex].errands[recadoIndex].name =
        name ?? listUsers[userIndex].errands[recadoIndex].name;
      listUsers[userIndex].errands[recadoIndex].detail =
        detail ?? listUsers[userIndex].errands[recadoIndex].detail;
      listUsers[userIndex].errands[recadoIndex].filed =
        filed ?? listUsers[userIndex].errands[recadoIndex].filed;
      listUsers[userIndex].errands[recadoIndex].changeIcon =
        listUsers[userIndex].errands[recadoIndex].changeIcon;

      return response.status(200).send({
        message: `Recado atualizado com sucesso!`,
        data: listUsers[userIndex].errands[recadoIndex].handleProperties(),
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
      const recadoIndex = listUsers[userIndex].errands.findIndex(
        (recado) => recado.id === idRecado
      );

      listUsers[userIndex].errands.splice(recadoIndex, 1);

      return response.status(200).send({
        message: `Recado deletado!`,
        data: listUsers[userIndex].errands.map((recado) =>
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
