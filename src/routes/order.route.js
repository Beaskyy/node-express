import { Router } from "express";
import { createOrder, deleteOrder, getOrders, getSingleOrder, updateOrder } from "../controllers/order.controller.js";

const orderRoute = Router();

orderRoute.route("/")
  .post(createOrder)
  .get(getOrders);

orderRoute.route("/:id")
.get(getSingleOrder)
.patch(updateOrder)
.delete(deleteOrder)


// orderRoute.post("/", createOrder)
// orderRoute.get("/", getOrders)

export default orderRoute;
