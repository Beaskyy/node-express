import { randomUUID } from "node:crypto";

const orders = [];
const VALID_STATUSES = ["pending", "processing", "ready", "completed"];

const throwError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};
const createOrder = ({ customerName, service, quantity }) => {
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
  return orders;
};

export const getOrderService = (id) => {
  console.log(id)
  if (!id || typeof id !== "string") {
    throwError("Invalid order uuid");
  }

  const order = orders.find((order) => order.id === id);

  if (!order) {
    throwError("Order not found", 404);
  }

  return order;
};

export const updateOrderService = (
  id,
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

  // Phase 2: Update only after all validation succeeds
  if (customerName !== undefined) {
    order.customerName = customerName.trim();
  }

  if (service !== undefined) {
    order.service = service.trim();
  }

  if (quantity !== undefined) {
    order.quantity = quantity;
  }

  if (status !== undefined) {
    order.status = status.trim().toLowerCase();
  }

  return order;
};

export const deleteOrderService = (id) => {
  if (!id || typeof id !== "string") {
    throwError("Invalid order id");
  }

  const orderIndex = orders.findIndex((order) => order.id === id);

  if (orderIndex === -1) {
    throwError("Order not found", 404);
  }

  const [deletedOrder] = orders.splice(orderIndex, 1);

  return deletedOrder;
};

export default createOrder;
