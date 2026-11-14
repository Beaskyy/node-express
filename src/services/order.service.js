import { randomUUID } from "node:crypto";

const orders = [];
const createOrder = ({ customerName, service, quantity }) => {
  if (typeof customerName !== "string" || !customerName.trim()) {
    const error = new Error("Customer name is required");
    error.statusCode(400);
    throw error;
  }

  if (typeof service !== "string" || !service.trim()) {
    const error = new Error("service is requires");
    error.statusCode(400);
    throw error;
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    const error = new Error("Quantity must be a postive integer");
    error.statusCode(400);
    throw error;
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

export default createOrder;
