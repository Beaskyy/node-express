const timestampMiddleware = (req, res, next) => {
  req.requestTime = new Date().toISOString();

  console.log(`Request received at: ${req.requestTime}`);

  next();

}

export default timestampMiddleware;