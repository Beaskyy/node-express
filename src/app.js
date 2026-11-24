import express from "express";
import orderRoute from "./routes/order.route.js";
import errorHandler from "./middleware/ErrorHandler.js";
import notFound from "./middleware/NotFound.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Maakleans API is running. This is the homepage");
});

app.use("/api/orders", orderRoute);

app.use(notFound);

// must come after routes
app.use(errorHandler);

export default app;
