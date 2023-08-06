import connect from "../configs/connnectDB";
let getAllUsers = async (req, res) => {
  let connection = await connect.connectDB();
  const [rows, fields] = await connection.execute("select * from users");
  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};
let getCreateUser = async (req, res) => {
  let connection = await connect.connectDB();
  let { firstName, lastName, email, address } = req.body;
  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: "missing required params",
    });
  }
  await connection.execute(
    "insert into users(firstName, lastName, email, address) values(?,?,?,?)",
    [firstName, lastName, email, address]
  );
  return res.status(200).json({
    message: "ok",
    f: firstName,
    l: lastName,
    e: email,
    a: address,
  });
};
let getDeleteUser = async (req, res) => {
  let connection = await connect.connectDB();
  let id = req.params.id;
  if (!id) {
    return res.status(200).json({
      message: "missing required params",
    });
  }
  await connection.execute("delete from users where id = ?", [id]);
  return res.status(200).json({
    message: "ok",
  });
};
let getUpdateUser = async (req, res) => {
  let connection = await connect.connectDB();
  let { firstName, lastName, email, address, id } = req.body;
  if (!firstName || !lastName || !email || !address || !id) {
    return res.status(200).json({
      message: "missing required params",
    });
  }
  await connection.execute(
    "update users set firstName = ?, lastName = ?, email= ?, address = ? where id = ?",
    [firstName, lastName, email, address, id]
  );
  return res.status(200).json({
    message: "ok",
  });
};
module.exports = {
  getAllUsers,
  getCreateUser,
  getUpdateUser,
  getDeleteUser,
};
