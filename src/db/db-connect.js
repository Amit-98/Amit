const { seq } = require("async");
var mysql = require("mysql2");

let localConfig = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Amit@@0145",
  database: "school",
  multipleStatements: true,
  insecureAuth: true,
  charset: "utf8mb4",
};


let connectSqlDb =  function () 
{
  console.error("---DB connecting:--");

  let sqlConnect = mysql.createConnection(localConfig);
  sqlConnect.connect((err) => {
    if (err) 
    {
      console.error("error connecting: " + err.stack);
      return;
    }
      console.log("connected as id " + sqlConnect.threadId);
  });
  return sqlConnect;
};

module.exports = connectSqlDb
