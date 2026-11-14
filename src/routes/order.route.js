import { Router } from "express"
import { createOrder } from "../controllers/order.controller.js";

const orderRoute = Router();

orderRoute.post("/", createOrder)

export default orderRoute