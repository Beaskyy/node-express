import createOrderService from "../services/order.service.js";

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
      message: error.message || "Internal server error"
    })
  }
};
