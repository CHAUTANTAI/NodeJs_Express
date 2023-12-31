import express from "express";
import APIController from "../controller/APIController";
let router = express.Router();
const initAPIRoute = (app) => {
  router.get("/users", APIController.getAllUsers);
  router.post("/create-user", APIController.getCreateUser);
  router.put("/update-user", APIController.getUpdateUser);
  router.delete("/delete-user/:id", APIController.getDeleteUser);
  return app.use("/api/v1/", router);
};
module.exports = initAPIRoute;
