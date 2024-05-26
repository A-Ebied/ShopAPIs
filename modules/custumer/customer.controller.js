import bcrypt from "bcrypt";
import { dbConnection } from "../../database/dbConnection.js";
const conn = dbConnection();

//http://localhost:3000/auth/signup
const signUp = (req, res) => {
  conn.query("insert into customers set ? ", req.body);
  res.status(201).json({ message: "Success" });
};

//http://localhost:3000/auth/signin
const signIn = (req, res) => {
  conn.execute(
    `select id,email,password from customers where email='${req.body.email}'`,
    (err, data) => {
      if (data.length != 0) {
        let match = bcrypt.compareSync(req.body.password, data[0].password);
        if (match) {
          res.json({ message: "Login .... Token", customerId: data[0].id });
        } else {
          res.status(401).json({ message: "Password incorrect." });
        }
      } else {
        res.status(401).json({ message: "Account Not Found." });
      }
    }
  );
};
export { signUp, signIn };
