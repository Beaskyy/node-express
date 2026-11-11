import createOrder from "../services/order.service.js";

export const creatOrder = async (req, res) => {
  createOrder(req, res);

  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      status: false,
      message: "Request body must be an object",
    });
  }

  const { customerName, service, quantity} = req.body

  if(!customerName || typeof customerName !== "string") {
    return res.status(400).json({
      status: false,
      message: "Customer name is required"
    })
  }

  if(!service || typeof service !== "string") {
    return res.status(400).json({
      status: false,
      message: "Service is required"
    })
  }
};
