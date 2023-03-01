import { Router } from "express";
import { validationUserExists } from "../users/middlewares/validationUserExist";
import { RecadosController } from "./controllers/recados.controller";
import { validationRecadoData } from "./middlewares/validationRecadoData";
import { validationRecadoExist } from "./middlewares/validationRecadoExist";

const recadosRoutes = (router: Router) => {
  const recadosController = new RecadosController();
  // POST
  router.post(
    "/users/:id/recados",
    validationUserExists,
    validationRecadoData,
    recadosController.createRecado
  );

  //get by user
  router.get(
    "/users/:id/recados",
    validationUserExists,
    recadosController.getRecadoByUser
  );

  //get by id
  router.get(
    "/users/:id/recados/filtro",
    validationUserExists,
    recadosController.getRecadoByUserAndById
  );

  //put editar
  router.put(
    "/users/:id/recados/:idRecado",
    validationUserExists,
    validationRecadoExist,
    validationRecadoData,
    recadosController.updateRecado
  );

  //deletar
  router.delete(
    "/users/:id/recados/:idRecado",
    validationUserExists,
    validationRecadoExist,
    recadosController.deleteRecado
  );
};
export { recadosRoutes };
