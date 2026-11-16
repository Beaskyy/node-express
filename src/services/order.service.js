import { randomUUID } from "node:crypto";

const orders = [];
const VALID_STATUSES = ["pending", "completed", "in-review"];

const throwError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};
const createOrder = ({ customerName, service, quantity }) => {
  if (typeof customerName !== "string" || !customerName.trim()) {
    throwError("Customer name is required");
  }

  if (typeof service !== "string" || !service.trim()) {
    throwError("service is requires");
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throwError("Quantity must be a postive integer");
  }

  const newOrder = {
    id: randomUUID(),
    customerName: customerName.trim(),
    service: service.trim(),
    quantity,
    status: "pending",
  };

  orders.push(newOrder);

  return newOrder;
};

export const getOrdersService = () => {
  if (!orders.length) {
    throwError("No orders found", 404);
  }
  return orders;
};

export const getOrderService = ({ id }) => {
  if (!id || typeof id !== "string") {
    throwError("Invalid order id");
  }

  const order = orders.find((order) => order.id === id);

  if (!order) {
    throwError("Order not found", 404);
  }

  return order;
};

export const updateOrderService = (
  { id },
  { customerName, quantity, service, status },
) => {
  if (!id || typeof id !== "string") {
    throwError("Invalid order id");
  }

  const order = orders.find((order) => order.id === id);

  if (!order) {
    throwError("Order not found", 404);
  }

  // Ensure at least on updateable field was provided
  if (
    customerName === undefined &&
    service === undefined &&
    quantity === undefined &&
    status === undefined
  ) {
    throwError("At least one field is required to update");
  }

  // only validate and update fields that were sent

  if (customerName !== undefined) {
    if (typeof customerName !== "string" || !customerName.trim()) {
      throwError("Customer name is required");
    }
    order.customerName = customerName.trim();
  }

  if (service !== undefined) {
    if (typeof service !== "string" || !service.trim()) {
      throwError("Service name is required");
    }
    order.service === service.trim();
  }

  if (quantity !== undefined) {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throwError("Quantity must be a positive integer");
    }
    order.quantity = quantity;
  }

  if (status !== undefined) {
    if (typeof status !== "string" || !status.trim()) {
      throwError("Status is required");
    }

    const normalizedStatus = status.trim().toLocaleLowerCase();
    if (!VALID_STATUSES.includes(normalizedStatus)) {
      throwError("Status should either be pending, in-review or completed");
    }
    order.status = status.trim();
  }

  return order;
};

export const deleteOrderService = ({ id }) => {
  if(!id || typeof id !== "string") {
    throwError("Invalid order id")
  }

  const orderIndex = orders.findIndex((order) => order.id = id)


  if(orderIndex === -1) {
    throwError("Order not found", 404)
  }


  const [deletedOrder] = orders.splice(orderIndex, 1)

  return deletedOrder
}

export default createOrder;
