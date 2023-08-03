import connect from "../configs/connnectDB";
let getHomepage = async (req, res) => {
  // query database
  let connection = await connect.connectDB();
  const [rows, fields] = await connection.execute("SELECT * FROM users");
  res.render("index.ejs", { dataUser: rows });
};
let getDetailPage = async (req, res) => {
  let connection = await connect.connectDB();
  let id = req.params.id;
  let user = await connection.execute("Select * from users where id = ?", [id]);

  return res.send(user);
};
let createNewUser = async (req, res) => {
  let connection = await connect.connectDB();
  let { firstName, lastName, email, address } = req.body;
  await connection.execute(
    "insert into users(firstName, lastName, email, address) values(?,?,?,?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};
let deleteUser = async (req, res) => {
  let connection = await connect.connectDB();
  let id = req.body.userID;
  await connection.execute("delete from users where id = ?", [id]);
  return res.redirect("/");
};
let editUser = async (req, res) => {
  let connection = await connect.connectDB();
  let id = req.params.id;
  let user = await connection.execute("select * from users where id = ?", [id]);
  return res.render("editUser.ejs", { dataUser: user });
};
let modifyChange = async (req, res) => {
  let connection = await connect.connectDB();
  let { firstName, lastName, email, address, id } = req.body;
  await connection.execute(
    "update users set firstName = ?, lastName = ?, email= ?, address = ? where id = ?",
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};
module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteUser,
  editUser,
  modifyChange,
};
