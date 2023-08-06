import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import initAPIRoute from "./route/api";

// //connectDB
// import connection from "./configs/connnectDB";
require("dotenv").config();
const app = express();
const port = process.env.PORT;

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Set up View Engine
configViewEngine(app);
//init Web route
initWebRoute(app);
//init APIRoute
initAPIRoute(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
