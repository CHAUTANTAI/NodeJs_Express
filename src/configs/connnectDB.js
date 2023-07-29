// get the client
import mysql from "mysql2/promise";

//// create the connection to database
// const connection = (mysql.createConnection = {
//   host: "localhost",
//   user: "root",
//   database: "nodejsbasic",
// });
//export default connection;

const connectDB = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "nodejsbasic",
  });

  return connection;
};
module.exports = { connectDB };
