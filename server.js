import express from "express";

import logger from "./middleware/logger.js";
import timestampMiddleware from "./middleware/timestamp.js";
import requestCounter from "./middleware/requestCounter.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.locals.requestCount = 0;

const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use(timestampMiddleware);
app.use(requestCounter);

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

// Temporary database
let customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "08012345678",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "08098765432",
  },
];

const orders = [
  {
    id: 1,
    customerName: "John Doe",
    service: "Washing",
    quantity: 5,
    status: "pending",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    service: "Dry Cleaning",
    quantity: 3,
    status: "completed",
  },
];

// CREATE CUSTOMER
app.post("/customers", (req, res) => {
  const { name, email, phone } = req.body;
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    typeof phone !== "string" ||
    !phone.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and phone are required",
    });
  }

  const newCustomer = {
    id: customers.length
      ? Math.max(...customers.map((customer) => customer.id)) + 1
      : 1,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
  };
  customers.push(newCustomer);

  res.status(201).json({
    success: true,
    message: "Customer created successfully",
    data: newCustomer,
  });
});

// GET SINGLE CUSTOMER
app.get("/customers/:id", (req, res) => {
  const { id } = req.params;
  const customerId = Number(id);

  if (!Number.isInteger(customerId) || customerId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid customer ID",
    });
  }

  const customer = customers.find((c) => c.id === customerId);

  if (!customer) {
    return res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }

  res.status(200).json({
    success: true,
    data: customer,
  });
});

// UPDATE CUSTOMER
app.patch("/customers/:id", (req, res) => {
  const { id } = req.params;

  const customerId = Number(id);

  if (!Number.isInteger(customerId) || customerId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid customer id",
    });
  }
  const customer = customers.find((c) => c.id === customerId);

  if (!customer) {
    res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }

  const allowedFields = ["name", "email", "phone"];
  const updates = req.body;

  if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
    return res.status(400).json({
      success: false,
      message: "Request body must be an object",
    });
  }

  const fields = Object.keys(updates);

  if (
    fields.length === 0 ||
    fields.some((field) => !allowedFields.includes(field))
  ) {
    return res.status(400).json({
      success: false,
      message: "Provide valid customer fields to update",
    });
  }

  for (const field of fields) {
    if (typeof updates[fields] !== "string" || !updates[fields].trim()) {
      return res.status(400).json({
        success: false,
        message: `Invalid value for ${field}`,
      });
    }
  }

  Object.assign(customer, updates);

  if (updates.name) customer.name = updates.name.trim();
  if (updates.email) customer.email = updates.email.trim().toLowerCase();
  if (updates.phone) customer.phone = updates.phone.trim();

  res.status(200).json({
    success: true,
    message: "Customer updated successfully",
    data: customer,
  });
});

// DELETE CUSTOMER
app.delete("/customers/:id", (req, res) => {
  const { id } = req.params;
  const customerId = Number(id);

  if (!Number.isInteger(customerId) || customerId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid customer ID",
    });
  }

  const customerIndex = customers.findIndex((c) => c.id === customerId);

  if (customerIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }

  const [deletedCustomer] = customers.splice(customerIndex, 1);

  res.status(200).json({
    success: false,
    message: "Customer deleted successfully",
    data: deletedCustomer,
  });
});

// Get all orders
app.get("/orders", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    data: orders,
  });
});

// Get a single order
app.get("/orders/:id", (req, res) => {
  const { id } = req.params;

  const orderId = Number(id);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid Order ID",
    });
  }

  const order = orders.find((order) => order.id === orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  res.status(200).json({
    success: true,
    message: `fetch order of id ${orderId}`,
    data: order,
  });
});

// Create orders
app.post("/orders", (req, res) => {
  const { customerName, service, quantity } = req.body;

  if (typeof customerName !== "string" || !customerName.trim()) {
    return res.status(400).json({
      success: false,
      message: "customerName is required",
    });
  }
  if (typeof service !== "string" || !service.trim()) {
    return res.status(400).json({
      success: false,
      message: "service is required",
    });
  }

  if (typeof quantity !== "number" || !quantity) {
    return res.status(400).json({
      success: false,
      message: "quantity must be a number",
    });
  }

  const newOrder = {
    id: orders.length ? Math.max(...orders.map((order) => order.id)) + 1 : 1,
    service: service.trim(),
    quantity: quantity,
    staus: "pending",
  };
  orders.push(newOrder);

  res.status(201).json({
    success: true,
    message: "New order created successfully",
    data: newOrder,
  });
});

// update an order
app.patch("/orders/:id", (req, res) => {
  const { id } = req.params;

  const orderId = Number(id);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid order ID",
    });
  }
  const order = orders.find((order) => order.id === orderId);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  const allowedFields = ["customerName", "service", "quantity", "status"];

  const updates = req.body;

  if (!updates || typeof updates !== "object" || !Array.isArray(updates)) {
    return res.status(400).json({
      success: false,
      message: "Request body must be an object",
    });
  }

  const fields = Object.keys(updates);

  if (
    fields.length === 0 ||
    fields.some((field) => !allowedFields.includes(field))
  ) {
    return res.status(404).json({
      success: false,
      message: "Provide valid order fields to update",
    });
  }

  for (const field of fields) {
    if(typeof updates[fields] !== "string" || !updates[fields].trim()) {
      return res.status(400).json({
        success: false,
        message: `Invalid value for ${field}`
      })
    }
  }

  Object.assign(order, updates)

  if (updates.customerName) order.customerName = updates.customerName.trim();
  if (updates.service) order.service = updates.service.trim();
  if (updates.quantity) order.quantity = updates.quantity.trim()
  if (updates.status) order.status = updates.status.trim();

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: order,
  });
});

// Delete Order
app.delete("/orders/:id", (req, res) => {
  const { id } = req.params

  const orderId = Number(id)

  if(!Number.isInteger(orderId) || orderId <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid order Id"
    })
  }

  const orderIndex = orders.findIndex((order) => order.id === orderId)

  if(orderIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Order not found"
    })
  }

  const [deletedOrder] = orders.splice(orderIndex, 1)
  
  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
    data: deletedOrder
  })
})

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
    customers,
  });
});

// app.post("/customers", (req, res) => {
//   console.log(req.body);
//   res.status(201).json({
//     success: true,
//     data: req.body,
//   });
// });

// app.get("/customers/:id", (req, res) => {
//   res.json({
//     message: "Single customer retrieved",
//     id: req.params.id,
//   });
// });

// app.patch("/customers/:id", (req, res) => {
//   res.json({
//     message: "Customer updated successfully",
//     id: req.params.id,
//   });
// });

// app.delete("/customers/:id", (req, res) => {
//   res.json({
//     message: "Customer deleted successfully",
//     id: req.params.id,
//   });
// });

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

  if (!user) {
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
