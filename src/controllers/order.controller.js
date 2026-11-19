import createOrderService, {
  getOrdersService,
  getOrderService,
  updateOrderService,
  deleteOrderService,
} from "../services/order.service.js";

// Create orders
export const createOrder = (req, res) => {
  try {
    const newOrder = createOrderService(req.body);

    return res.status(201).json({
      success: true,
      message: "New order created successfully",
      data: newOrder,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Get orders
export const getOrders = (req, res) => {
  try {
    const orders = getOrdersService();

    return res.status(200).json({
      success: true,
      count: orders.length,
      message: "Order fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// get single order
export const getSingleOrder = (req, res) => {
  const order = getOrderService(req.params.id);

  return res.status(200).json({
    success: true,
    message: `Order with UUID ${order.id} fetched successfully`,
    data: order,
  });
};

// update order
export const updateOrder = (req, res) => {
  const order = updateOrderService(req.params.id, req.body);
  return res.status(200).json({
    success: true,
    message: `Order with id ${order.id} updated successfully`,
    data: order,
  });
};

// delete order
export const deleteOrder = (req, res) => {
  try {
    const order = deleteOrderService(req.params.id);

    return res.status(200).json({
      success: true,
      message: `Order ${order.id} deleted successfully`,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
