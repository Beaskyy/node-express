import express from "express";

import logger from "./middleware/logger.js";
import timestampMiddleware from "./middleware/timestamp.js";
import requestCounter from "./middleware/requestCounter.js";

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use(timestampMiddleware)
app.use(requestCounter)

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
  res.json({
    message: "Customer created successfully",
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
