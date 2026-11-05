import express from "express";

import logger from "./middleware/logger.js";
import timestampMiddleware from "./middleware/timestamp.js";
import requestCounter from "./middleware/requestCounter.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.locals.requestCount = 0;

const PORT = 3000;

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 500000,
  },
  {
    id: 2,
    name: "Phone",
    price: 250000,
  },
];

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Michael" },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use(timestampMiddleware);
app.use(requestCounter);

app.get("/", (req, res) => {
  res.send("Welcome to my first Express API!");
});

app.get("/customers", (req, res) => {
  const status = req.query.status;
  const limit = req.query.limit;

  res.json({
    message: "All customers retrieved",
    status,
    limit,
    customers: [],
  });
});

app.post("/customers", (req, res) => {
  console.log(req.body)
  res.status(201).json({
    success: true,
    data: req.body
  });
});

app.get("/customers/:id", (req, res) => {
  res.json({
    message: "Single customer retrieved",
    id: req.params.id,
  });
});

app.patch("/customers/:id", (req, res) => {
  res.json({
    message: "Customer updated successfully",
    id: req.params.id,
  });
});

app.delete("/customers/:id", (req, res) => {
  res.json({
    message: "Customer deleted successfully",
    id: req.params.id,
  });
});

app.get("/products", (req, res) => {
  if (products.length === 0) {
    return res.status(200).json({
      success: false,
      products: [],
    });
  }
  res.status(200).json({
    success: true,
    products,
  });
});

app.get("/products/search", (req, res) => {
  const { name } = req.query;
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      success: true,
      message: "Please provide a product name to search",
    });
  }
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(name.toLowerCase()),
  );
  if (filteredProducts.length === 0) {
    return res.status(200).json({
      success: true,
      products: [],
    });
  }
  res.status(200).json({
    success: true,
    products: filteredProducts,
  });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
});

app.get("/test-error", (req, res, next) => {
  const error = new Error("Something went wrong!");

  next(error);
});

app.get("/users/:id", (req, res, next) => {
  const { id } = req.params;

  const userId = Number(id);

  if (!Number.isInteger(userId) || userId <= 0) {
    const error = new Error("User not found");

    error.statusCode = 404;

    return next(error);
  }

  const user = users.find((u) => u.id === userId);

  if(!user) {
    const error = new Error("User not found");
    error.statusCode = 404;

    return next(error);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
