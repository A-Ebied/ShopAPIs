import { dbConnection } from "../../database/dbConnection.js";

const conn = dbConnection();

// http://localhost:3000/orders
const addOrder = (req, res) => {
  const { customer_id, order_date, order_items } = req.body;
  const total_amount = order_items.reduce(
    (sum, item) => sum + item.quantity * item.unit_price,
    0
  );

  conn.query(
    `INSERT INTO orders (customer_id, order_date, total_amount) VALUES (${customer_id}, ${order_date}, ${total_amount})`,
    (err, data) => {
      if (err) throw err;
      const orderId = data.insertId;
      const orderItemsData = order_items.map((item) => [
        orderId,
        item.product_id,
        item.quantity,
        item.unit_price,
      ]);
      conn.query(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (${orderItemsData})`,
        (err, data) => {
          if (err) throw err;
          res.status(201).json({ message: "Success", id: orderId });
        }
      );
    }
  );
};

//http://localhost:3000/orders/avgOrders
const avgOrders = (req, res) => {
  conn.query(
    `SELECT AVG(total_amount) AS avgOrders FROM orders`,
    (err, data) => {
      if (err) throw err;
      res.status(200).json({ message: "Success", data });
    }
  );
};

//http://localhost:3000/orders/allCustomerWithoutOrders
const allCustomerWithoutOrders = (req, res) => {
  conn.query(
    ` SELECT * FROM customers WHERE id NOT IN (SELECT customer_id FROM orders)`,
    (err, data) => {
      if (err) throw err;
      res.status(200).json({ message: "Success", data });
    }
  );
};

//http://localhost:3000/orders/topCustomerByItems
const topCustomerByItems = (req, res) => {
  conn.query(
    `
    SELECT customers.*, SUM(order_items.quantity) AS total_items
    FROM customers 
    JOIN orders  ON customers.id = orders.customer_id
    JOIN order_items  ON orders.id = order_items.order_id
    GROUP BY customers.id
    ORDER BY total_items DESC
    LIMIT 1`,
    (err, data) => {
      if (err) throw err;
      res.status(200).json({ message: "Success", data });
    }
  );
};

//http://localhost:3000/orders/topCustomersBySpending
const topCustomersBySpending = (req, res) => {
  conn.query(
    `SELECT customers.*, SUM(orders.total_amount) AS total_spent
    FROM customers 
    JOIN orders  ON customers.id = orders.customer_id
    GROUP BY customers.id
    ORDER BY total_spent DESC
    LIMIT 10`,
    (err, data) => {
      if (err) throw err;
      res.status(200).json({ message: "Success", data });
    }
  );
};

//http://localhost:3000/orders/customersWithMinOrders
const customersWithMinOrders = (req, res) => {
  conn.query(
    ` SELECT customers.*, COUNT(orders.id) AS orders_count
    FROM customers 
    JOIN orders  ON customers.id = orders.customer_id
    GROUP BY customers.id
    HAVING orders_count >= 5`,
    (err, data) => {
      if (err) throw err;
      res.status(200).json({ message: "Success", data });
    }
  );
};
//http://localhost:3000/orders/customersWithOrdersPercentage
const customersWithOrdersPercentage = (req, res) => {
  conn.query(
    `SELECT (COUNT(DISTINCT orders.customer_id) / (SELECT COUNT(*) FROM customers) * 100) AS percentage FROM orders 
    GROUP BY orders.customer_id
    HAVING COUNT(orders.id) > 1`,
    (err, data) => {
      if (err) throw err;
      //   res.status(200).json({ message: "Success" ,data});
      res.status(200).json(data[0]);
    }
  );
};

//http://localhost:3000/orders/firstOrderCustomer
const firstOrderCustomer = (req, res) => {
  conn.query(
    `SELECT customers.*, orders.order_date
    FROM customers 
    JOIN orders  ON customers.id = orders.customer_id
    ORDER BY orders.order_date ASC
    LIMIT 1`,
    (err, data) => {
      if (err) throw err;
        res.status(200).json({ message: "Success" ,data});
    }
  );
};

export {
  addOrder,
  avgOrders,
  allCustomerWithoutOrders,
  topCustomerByItems,
  topCustomersBySpending,
  customersWithMinOrders,
  customersWithOrdersPercentage,
  firstOrderCustomer,
};
