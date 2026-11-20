import createOrderService, {
  getOrdersService,
  getOrderService,
  updateOrderService,
  deleteOrderService,
} from "../services/order.service.js";

// Create orders
export const createOrder = async (req, res) => {
  const newOrder = await createOrderService(req.body);

  return res.status(201).json({
    success: true,
    message: "New order created successfully",
    data: newOrder,
  });
};

// Get orders
export const getOrders = async (req, res) => {
  const orders = await getOrdersService();

  return res.status(200).json({
    success: true,
    count: orders.length,
    message: "Orders fetched successfully",
    data: orders,
  });
};

// get single order
export const getSingleOrder = async (req, res) => {
  const order = await getOrderService(req.params.id);

  return res.status(200).json({
    success: true,
    message: `Order fetched successfully`,
    data: order,
  });
};

// update order
export const updateOrder = async (req, res) => {
  const order = await updateOrderService(req.params.id, req.body);
  return res.status(200).json({
    success: true,
    message: `Order with id ${order.id} updated successfully`,
    data: order,
  });
};

// delete order
export const deleteOrder = async (req, res) => {
  const order = await deleteOrderService(req.params.id);

  return res.status(200).json({
    success: true,
    message: `Order ${order.id} deleted successfully`,
  });
};
