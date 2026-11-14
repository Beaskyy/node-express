import express from "express"
import orderRoute from "./routes/order.route.js";

const app = express();

app.use(express.json())

app.use("/api/orders", orderRoute)

export default app