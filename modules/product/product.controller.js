import { dbConnection } from "../../database/dbConnection.js";
const conn = dbConnection();

//http://localhost:3000/products
const addProduct = (req, res) => {
  conn.query("insert into products set ?", req.body);
  res.status(201).json({ message: "Success" });
};
//http://localhost:3000/products/totalRevenue
const totalRevenue = (req, res) => {
  conn.query(
    ` SELECT products.category, SUM(order_items.quantity * order_items.unit_price) AS total_revenue
    FROM order_items
    JOIN products  ON order_items.product_id = products.id
    GROUP BY products.category
  `,
    (err, data) => {
      if (err) throw err;
      res.status(200).json({ message: "Success", data });
    }
  );
};

//http://localhost:3000/products/totalItemsSold
const totalItemsSold = (req, res) => {
  conn.query(
    ` SELECT products.product_name, SUM(order_items.quantity) AS total_items_sold
      FROM order_items
      JOIN products  ON order_items.product_id = products.id
      GROUP BY products.product_name
    `,
    (err, data) => {
      if (err) throw err;
      res.status(200).json({ message: "Success", data });
    }
  );
};

export { addProduct, totalRevenue, totalItemsSold };
