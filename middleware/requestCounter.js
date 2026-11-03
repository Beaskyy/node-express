const requestCounter = (req, res, next) =>{
  req.app.locals.requestCount++;
  console.log(`Total requests: ${req.app.locals.requestCount}`);
  
  next();
}

export default requestCounter;