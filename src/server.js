import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import initAPIRoute from "./route/api";
var morgan = require("morgan");
// //connectDB
// import connection from "./configs/connnectDB";
require("dotenv").config();
const app = express();
const port = process.env.PORT;
app.use(morgan("combined"));
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Set up View Engine
configViewEngine(app);
//init Web route
initWebRoute(app);
//init APIRoute
initAPIRoute(app);

//Handle 404 not found
app.use((req, res) => {
  return res.render("404.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
