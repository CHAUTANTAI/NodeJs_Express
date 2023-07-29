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
module.exports = {
  getHomepage,
  getDetailPage,
};
