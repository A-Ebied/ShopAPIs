import express, { json } from "express";
import customerRouter from "./modules/custumer/customer.routes.js";
import productRouter from "./modules/product/product.routes.js";
import orderRouter from "./modules/order/order.routes.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use("/auth", customerRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.listen(port, () => console.log(`app listening on port ${port}!`));
