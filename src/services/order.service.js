import { randomUUID } from "node:crypto";
import AppError from "../utils/AppError.js";

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
  const order = orders.find((order) => order.id === id);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
};

export const updateOrderService = (
  id,
  { customerName, quantity, service, status },
) => {
  if (typeof id !== "string" || !id.trim()) {
    throw new AppError("Invalid order ID", 400);
  }

  const order = orders.find((order) => order.id === id);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  // Ensure at least on updateable field was provided
  if (
    customerName === undefined &&
    service === undefined &&
    quantity === undefined &&
    status === undefined
  ) {
    throw new AppError("At least one field is required to update", 400);
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
