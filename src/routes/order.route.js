import { Router } from "express"
import { creatOrder } from "../controllers/order.controller.js";

const orderRoute = Router();

orderRoute.get("/bsk", creatOrder)

export default orderRoute