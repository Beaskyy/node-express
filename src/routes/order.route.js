import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrders,
  getSingleOrder,
  updateOrder,
} from "../controllers/order.controller.js";
import validate from "../middleware/validate.js";
import {
  createOrderSchema,
  updateOrderSchema,
} from "../validators/order.validator.js";

const orderRoute = Router();

orderRoute
  .route("/")
  .post(validate(createOrderSchema), createOrder)
  .get(getOrders);

orderRoute
  .route("/:id")
  .get(getSingleOrder)
  .patch(validate(updateOrderSchema), updateOrder)
  .delete(deleteOrder);

export default orderRoute;
