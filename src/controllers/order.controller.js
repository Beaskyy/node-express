import createOrderService, {
  getOrdersService,
  getOrderService,
  updateOrderService,
  deleteOrderService,
} from "../services/order.service.js";

// Create orders
export const createOrder = async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be a valid object",
      });
    }

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
export const getOrders = async (req, res) => {
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
export const getSingleOrder = async (req, res) => {
  try {
    const order = getOrderService(req.params);

    return res.status(200).json({
      success: true,
      message: `Order with UUID ${order.id} fetched successfully`,
      data: order,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// update order
export const updateOrder = async (req, res) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    res.status(400).json({
      success: false,
      message: "Request body must be a valid object",
    });
  }
  try {
    const order = updateOrderService(req.params, req.body);
    return res.status(200).json({
      success: true,
      message: `Order with id ${order.id} updated successfully`,
      data: order,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = deleteOrderService(req.params);

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
