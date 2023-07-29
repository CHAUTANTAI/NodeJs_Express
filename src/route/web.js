import express from "express";
import homeController from "../controller/homecotroller";
let router = express.Router();
const initWebRoute = (app) => {
  router.get("/", homeController.getHomepage);
  router.get("/detail/user/:id", homeController.getDetailPage);
  router.get("/about", (req, res) => {
    res.send(`I'm Tan Tai!`);
  });
  return app.use("/", router);
};
module.exports = initWebRoute;
