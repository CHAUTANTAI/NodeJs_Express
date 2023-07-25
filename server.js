const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!My name is Chau Tan Tai");
});
app.get("/about", (req, res) => {
  res.send(`I'm Tan Tai!`);
});
app.get("/Product", (req, res) => {
  res.send(`Empty!!!`);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
