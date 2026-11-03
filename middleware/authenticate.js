const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication token required",
    });
  }

  const token = authHeader.split(" ")[1];

  if (token !== "mysecrettoken") {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token",
    });
  }

  next();
};

export default authenticate;
