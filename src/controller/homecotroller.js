import connection from "../configs/connnectDB";
let getHomepage = (req, res) => {
  //logic
  let data = [];
  // simple query
  let con = connection.query(
    "SELECT * FROM `users`",
    function (err, results, fields) {
      data = results.map((row) => {
        return row;
      });
      return res.render("index.ejs", { dataUser: data });
    }
  );
};

module.exports = {
  getHomepage,
};
