import express from "express";
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");
import homeController from "../controller/homecotroller";
let router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });
const initWebRoute = (app) => {
  router.get("/", homeController.getHomepage);
  router.get("/detail/user/:id", homeController.getDetailPage);
  router.post("/create-new-user", homeController.createNewUser);
  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-user/:id", homeController.editUser);
  router.post("/modify-change", homeController.modifyChange);
  router.get("/upload", homeController.getUploadFilePage);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homeController.handleUploadFile
  );
  router.post(
    "/upload-multiple-pic",
    upload.array("profile_pic_mutiple", 3),
    homeController.uploadMultipleFiles
  );
  return app.use("/", router);
};
module.exports = initWebRoute;
