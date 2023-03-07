import { Router } from "express";
import { validationUserExists } from "../users/middlewares/validationUserExist";
import { ErrandsController } from "./controllers/errands.controller";
import { validationRecadoData } from "./middlewares/validationErrandData";
import { validationRecadoExist } from "./middlewares/validationRecadoExist";

const errandsRoutes = (router: Router) => {
  const errandsController = new ErrandsController();
  // POST
  router.post(
    "/users/:id/recados",
    validationUserExists,
    validationRecadoData,
    errandsController.createErrand
  );

  //GET
  router.get(
    "/users/:id/recados",
    validationUserExists,
    validationRecadoExist,
    errandsController.geterrandByUser
  );

  //PUT
  router.put(
    "/users/:id/recados/:idRecado",
    validationUserExists,
    validationRecadoExist,
    validationRecadoData,
    errandsController.updateRecado
  );

  //DELETE
  router.delete(
    "/users/:id/recados/:idRecado",
    validationUserExists,
    validationRecadoExist,
    errandsController.deleteRecado
  );
};
export { errandsRoutes };
