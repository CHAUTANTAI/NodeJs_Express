import connect from "../configs/connnectDB";
import multer from "multer";
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
let getUploadFilePage = async (req, res) => {
  return res.render("uploadFile.ejs");
};
//
let handleUploadFile = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }
  res.send(
    `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500" height = "500"><hr /><a href="/upload">Upload another image</a>`
  );
};

let uploadMultipleFiles = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.send("Please select an image to upload");
  }

  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/image/${files[index].filename}" width="300" height="300" border = "1px" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="/upload">Upload more images</a>';
  res.send(result);
};
module.exports = {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteUser,
  editUser,
  modifyChange,
  getUploadFilePage,
  handleUploadFile,
  uploadMultipleFiles,
};
