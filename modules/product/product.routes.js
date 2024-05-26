import { Router } from "express";
import { addProduct, totalItemsSold, totalRevenue } from "./product.controller.js";

const productRouter = Router();

productRouter.post("/", addProduct);
productRouter.get("/totalRevenue", totalRevenue);
productRouter.get("/totalItemsSold",totalItemsSold );
export default productRouter;
