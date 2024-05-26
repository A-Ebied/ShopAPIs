import mysql from "mysql2";
export const dbConnection = () => {
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shop_db",
  });
  conn.connect((err) => {
    if (err) console.log("dataBase is Not Connection.");
    console.log("dataBase is  Connection Successfully.");
  });
  return conn;
};
