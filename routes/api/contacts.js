const express = require("express");

const { validateBody, isValidId, autentificate } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

const controllers = require("../../controllers/contacts");

router.get("/", autentificate, controllers.getAll);

router.get("/:id", autentificate, isValidId, controllers.getContact);

router.post("/", autentificate, validateBody(schemas.addSchema), controllers.addNewContact);

router.delete("/:id", autentificate, isValidId, controllers.deleteContact);

router.put(
  "/:id",
  autentificate,
  isValidId,
  validateBody(schemas.addSchema),
  controllers.updateStatusContact
);

router.patch(
  "/:id/favorite",
  autentificate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controllers.updateFavorite
);


module.exports = router;