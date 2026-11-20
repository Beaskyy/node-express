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
import asyncHandler from "../utils/asyncHandler.js";

const orderRoute = Router();

orderRoute
  .route("/")
  .post(validate(createOrderSchema), asyncHandler(createOrder))
  .get(asyncHandler(getOrders));

orderRoute
  .route("/:id")
  .get(asyncHandler(getSingleOrder))
  .patch(validate(updateOrderSchema), asyncHandler(updateOrder))
  .delete(asyncHandler(deleteOrder));

export default orderRoute;
