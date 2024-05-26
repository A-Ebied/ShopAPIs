import { Router } from "express";
import {
  addOrder,
  allCustomerWithoutOrders,
  avgOrders,
  customersWithMinOrders,
  customersWithOrdersPercentage,
  firstOrderCustomer,
  topCustomerByItems,
  topCustomersBySpending,
} from "./order.controller.js";

const orderRouter = Router();

orderRouter.post("/", addOrder);
orderRouter.get("/avgOrders", avgOrders);
orderRouter.get("/allCustomerWithoutOrders", allCustomerWithoutOrders);
orderRouter.get("/topCustomerByItems", topCustomerByItems);
orderRouter.get("/topCustomersBySpending", topCustomersBySpending);
orderRouter.get("/customersWithMinOrders", customersWithMinOrders);
orderRouter.get("/customersWithOrdersPercentage",customersWithOrdersPercentage);
orderRouter.get("/firstOrderCustomer",firstOrderCustomer);

export default orderRouter;
