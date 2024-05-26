import bcrypt from "bcrypt";
import { dbConnection } from "../database/dbConnection.js";

const connection = dbConnection();

export const checkEmailExist = (req, res, next) => {
  connection.execute(`select email from customers where email='${req.body.email}'`,
    (err, data) => {
      if (data.length != 0)
        return res.status(409).json({ message: "Email Already Exist." });
      req.body.password = bcrypt.hashSync(req.body.password, 8);

      next();
    }
  );
};
